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
    // private aclService: ACLService,
    // private titleService: TitleService,
    private httpClient: HttpClient,
    public cache: CacheService,
    private _electronService: ElectronService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
    iconSrv.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1472314_c904nlprpj.js',
    });

    this._electronService.ipcRenderer.on('img-file-reply', (event, data)=>{
      console.log('ipcRenderer=======',data);
      // this.cache.set(data.name, data.fileList)
      const {fileObj, type} = data;
      console.log(fileObj);

      for (let key in fileObj) {
        console.log('=========fileMap1',key);
        const fileList = fileObj[key];
        this.getMenu(key, fileList, type);

      }

    });

    this._electronService.ipcRenderer.send('read-img-file','read-img');

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
            this.menuService.add(res.menu);
            //
            // // 设置页面标题的后缀
            // this.titleService.default = '';
            // this.titleService.suffix = res.app.name;
          },
          () => {},
          () => {
            resolve(null);
          },
        );
    });
  }

  /**
   *
   * @param key ：文件夹名字
   * @param fileList ： 文件列表
   * @param type： 文件类型
   */
  getMenu(key, fileList, type){
    // const fileList:any[] = this.cache.getNone(item.title);
    console.log(key, fileList, type);

    const children = [];
    let icon = '';
    if(type === 'img'){
      icon = "anticon-picture"
    }

    fileList.forEach(file=>{
      // console.log('file===',file.toString());
      console.log('file===',file);
      const newfile = file.replace(/%/, "%25");
      console.log('newfile===',newfile);
      const node = {
        "text": file,
        "link": `/achievement/file?url=${type}/${key}/${newfile}`,
        // "link": `/achievement/file?url=${type}/${key}`,
        "i18n": file,
        "icon": icon,
      }
      children.push(node);
    });
    const menu = [{
      "text": key,
      "i18n": key,
      "group": true,
      "hideInBreadcrumb": true,
      "children":children
    }]

    this.cache.set(key, menu)

  }

}



interface MenuIn {
  "text"?: string,
  "objName"?: string,
  "i18n"?:string,
  "icon"?: {},
  "children"?:any,
  "data"?:{},
  "link"?:string,
  "externalLink"?:string,
  "target"?:string,
  "group"?: boolean,
  "hideInBreadcrumb"?: boolean,
  "pageAutherList"?:any,
  "urlType"?:number
}


