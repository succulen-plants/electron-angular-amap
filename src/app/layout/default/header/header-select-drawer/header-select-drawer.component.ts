import {
  Component,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnInit, ChangeDetectorRef,
} from '@angular/core';
import { CacheService } from '@delon/cache';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuService } from '@delon/theme';
import { environment } from "@env/environment";
import { NzMessageService } from 'ng-zorro-antd/message';
import {  achievementList, parameterList, helpList } from './config';
import {ICONS_AUTO} from "../../../../../style-icons-auto";
import {ICONS} from "../../../../../style-icons";
import {NzIconService} from "ng-zorro-antd/icon";
import {ElectronService} from "ngx-electron";

@Component({
  selector: 'header-select-drawer',
  templateUrl: './header-select-drawer.component.html',
  styleUrls: ['./header-select-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSelectDrawerComponent implements OnInit,AfterViewInit {
  // baseUrl = environment.baseUrl;
  objectKeys = Object.keys;

  /**
   * pageAuthList 页面权限列表
   */
  renderData = {
    pageAuthList: [
      { title: '成果展示', color: 'green', list: achievementList, menu: 'menu.manage' },
      { title: '参数查询', color: 'yellow', list: parameterList, menu: 'menu.device' },
      { title: '帮助', color: 'green', list: helpList, menu: 'menu.3d' },
      // { title: '电子围栏', color: 'green', list: eleFenceList, menu: 'menu.eleFence' },
    ],
    pageRenderList:{}
  };

  constructor(private el: ElementRef,
              public cache: CacheService,
              private http: HttpClient,
              private menuService: MenuService,
              iconSrv: NzIconService,
              private router: Router) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);

    // this._electronService.ipcRenderer.on('read-file', (event, files)=>{
    //   console.log(files);
    // });
  }

  ngOnInit(){
    this.renderData.pageAuthList.forEach((item)=>{
       this.renderData.pageRenderList[item.menu] = {dropIconOption: false, visibleOption: false, ...item};
    })
  }
  open(type): void {
    this.renderData.pageRenderList[type].dropIconOption = true;
    this.renderData.pageRenderList[type].visibleOption = true;
  }
  close(type): void {
    if(type){
      this.renderData.pageRenderList[type].dropIconOption = false;
      this.renderData.pageRenderList[type].visibleOption = false;
    }
  }
  handleMouseChange(type) {
    this.close(type);
  }
  /**
   * 跳转
   * @param item 数据
   */
  handleJump(item: any) {
    // const menuList = this.cache.getNone('menuList');
    // link 没有自菜单， 直接跳转
    console.log(item);
    this.cache.set('menuName', item.title);
    if(item.link!==null && item.link){
      this.router.navigateByUrl(item.link);
    }else {
      // readFile 读取文件获取菜单
      if(item.readFile!==null && item.readFile){
        const menu:any[] = this.cache.getNone(item.title);
        console.log('=======readFile=',menu);
        this.menuService.add(menu);
        this.getDefaultRoute(menu[0]);
      }else{
        if(item.menu && item.children!==null){
          console.log(item);
          this.menuService.add(item.children);
          console.log(item.children[0].children[0].link);
          this.router.navigateByUrl(item.children[0].children[0].link);
        }else{
          // window.open( item.path,'_blank');
        }
      }
      // this.router.navigateByUrl('/');
    }

  }

  ngAfterViewInit() {
  }

  getDefaultRoute(currentMenu:any){
    console.log('currentMenu====',currentMenu);
    console.log(currentMenu.link);

    if(currentMenu.link){
      this.router.navigateByUrl(currentMenu.link)
    }else{
      this.getDefaultRoute(currentMenu.children[0])
    }
  }

}

interface Project {
  id?:number,
  name?:string,
}
