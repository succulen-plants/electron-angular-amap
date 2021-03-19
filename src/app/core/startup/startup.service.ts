/**
 * 系统基础服务
 * 功能： 应用启动时，获取整个系统模块菜单结构， 使用'@delon/theme' 的 MenuService， 构建菜单系统。
 * 从租户管理平台获取租户模块、菜单、 页面颗粒权限列表 。
 * author: Luo Teng Zhan
 * time: 2019/11/1
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { CacheService } from '@delon/cache';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

// import { UserAuthData } from '@shared/utils/interfaces';
// import { environment } from '../../../environments/environment';
import { NzIconService } from 'ng-zorro-antd/icon';
import {ACLService} from "@delon/acl";
import {MenuService, SettingsService} from "@delon/theme";
import {ElectronService} from "ngx-electron";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {Router} from "@angular/router";
// const { baseUrl } = environment;
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    public cache: CacheService,
    private router: Router,
    private _electronService: ElectronService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
    iconSrv.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1472314_c904nlprpj.js',
    });

    this._electronService.ipcRenderer.on('file-directorys-reply', (event, data)=>{
      console.log('ipcRenderer=======',data);
      // this.cache.set(data.name, data.fileList)
      const {menu} = data;
      console.log(menu);
      menu.forEach(item=>{
        this.cache.set(item.name, [item.menu])
      })
    });


    this._electronService.ipcRenderer.send('read-file-directorys','read-file');
    // this._electronService.ipcRenderer.send('read-txt-file','read-txt');

  }

  // userId:number;
  menuMap = new Map();
  // 页面权限
  opts = {};

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise(resolve => {
      zip(
        this.httpClient.get('assets/tmp/app-data.json'),
      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([appData]) => {
            resolve(null);
            return [appData];
          }),
        )
        .subscribe(
          ([appData]) => {
            // setting language data
            // application data
            const res: any = appData;
            const user = this.cache.getNone('userInfo');
            // // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app);
            // // 用户信息：包括姓名、头像、邮箱地址
            // this.settingService.setUser(user);
            // // ACL：设置权限为全量
            // this.aclService.setFull(true);
            // // 初始化菜单
            // this.menuService.add(res.menu);
            //
            // // 设置页面标题的后缀
            // this.titleService.default = '';
            // this.titleService.suffix = res.app.name;
            const token = this.tokenService.get();
            console.log('=====token',token);
            if(JSON.stringify(token)==='{}'){
              this.router.navigateByUrl('/passport/login');
            }
          },
          () => {},
          () => {
            resolve(null);
          },
        );
    });
  }


}





