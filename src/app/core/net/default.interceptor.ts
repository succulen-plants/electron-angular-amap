/**
 * 系统基础服务
 * 功能： http 请求拦截器， 异常信息拦截， 异常抛出模块， 免密登录
 * author: Luo Teng Zhan
 * time: 2019/10/24
 */

import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase, HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError, map, filter } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector,
              public message: NzMessageService,
              @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {

    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401 || ev.status === 400) {

      return;
    }

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    // this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
    this.notification.error(`请求错误`, errortext);
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    if (ev.status > 0) {
      this.injector.get(_HttpClient).end();
    }
    this.checkStatus(ev);

    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        // if (event instanceof HttpResponse) {
        //     const body: any = event.body;
        //     if (body && body.status !== 0) {
        //         this.msg.error(body.msg);
        //         // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //         // this.http.get('/').subscribe() 并不会触发
        //         return throwError({});
        //     } else {
        //         // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
        //         return of(new HttpResponse(Object.assign(event, { body: body.response })));
        //         // 或者依然保持完整的格式
        //         return of(event);
        //     }
        // }
        break;
      case 400:
        const e: any = ev;
        switch (e.error.errCode) {
          case '0x0007':
            this.message.error('账号密码错误，请重新登录！');
            break;
          case '0x0010':
            this.message.error('账号不存在，请重新登录！');
            break;
          case '0x0011':
            this.message.error('账号已停用，请重新登录！');
            break;
          case '0x0023':
            this.message.error('客户端认证失败，请重新登录！');
            break;
          case '0x0030':
            this.message.error('账户检验失败，请重新登录！');
            break;
          default:
            this.message.error('发出的请求有错误，服务器没有进行新建或修改数据的操作。');
            break;
        }
        /*if (e.error.errCode === '0x0007' ) {
          this.message.error('账号密码错误，请重新登录！');
        }
        if (e.error.errCode === '0x0010' ) {
          this.message.error('账号不存在，请重新登录！');
        }
        if (e.error.errCode === '0x0011' ) {
          this.message.error('账号已停用，请重新登录！');
        }
        if (e.error.errCode === '0x0023' ) {
          this.message.error('客户端认证失败，请重新登录！');
        }
        if (e.error.errCode === '0x0030' ) {
          this.message.error('账户检验失败，请重新登录！');
        }*/
        break;
      case 401:
        this.message.error(`未登录或登录已过期，请重新登录。`);
        (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        let url = '/passport/login'
        this.goTo(url);
        break;
      case 403:
      case 404:
      case 500:
          this.goTo(`/default/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
          return throwError(ev);
        }
        break;
    }

    return of(ev);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 统一加上服务端前缀
    let url = req.url;
    let headers : HttpHeaders;
    const user = this.tokenService.get().user;

    // const newReq = req.clone({ url, headers });
    const newReq = req.clone({ url });
    // // 为其他项目加载dmp独立模块是提供登录机制
    // if(Cookie.get('access_token')){
    //   this.tokenService.set({token: Cookie.get('access_token')})
    // }
    // const newReq = req.clone({ url });

    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err);
      }),
    );

  }
}
