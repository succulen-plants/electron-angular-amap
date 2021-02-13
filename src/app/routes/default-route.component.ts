/**
 * author: luotengzhan
 * 各个模块默认路由通过该方法获取 路由列表的第一个页面跳转
 * 避免配置的默认页面，没有权限
 * time: 2020/7/15
 */
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {  ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { CacheService } from '@delon/cache';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-default-route',
  template: ``,
})
export class DefaultRouteComponent   implements OnInit {

  // moduleName 模块名称
  moduleName = '';
  haveGetModule = false;
  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    public http: HttpClient,
    public cache: CacheService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    const menuList = this.cache.getNone('menuList');
    this.activatedRoute.url.subscribe(url => {
      const menuName:any = this.cache.getNone('menuName');
      this.moduleName = this.cache.getNone('moduleName');
      console.log('=====moduleName===',this.moduleName);
      console.log('===menuName===',menuName);
      if(menuName){
        const currentMenu = menuList[menuName];
        this.getDefaultRoute(currentMenu[0]);
      }
    });
  }

  // 递归获取默认路由
  // getDefaultRoute(currentMenu){
  //   console.log('currentMenu====',currentMenu);
  //   if(currentMenu && currentMenu.length>0){
  //     if(currentMenu[0].children && currentMenu[0].children.length>0){
  //       this.getDefaultRoute(currentMenu[0].children);
  //     }else {
  //       console.log(currentMenu[0].link);
  //       this.router.navigateByUrl(currentMenu[0].link)
  //       return;
  //     }
  //   }
  // }

  // getDefaultRoute(currentMenu, moduleName){
  //   console.log('currentMenu====',currentMenu);
  //   console.log('moduleName====',moduleName);
  //   if(currentMenu && currentMenu.length>0){
  //     if(currentMenu[0].children && currentMenu[0].children.length>0){
  //       const list:any  = currentMenu[0].children;
  //       console.log(list);
  //       const tage:any = list.find((item:any)=>{
  //           if(item.i18n === moduleName){
  //            return item;
  //         }
  //       })
  //       console.log(tage);
  //       if(tage && tage.children && tage.children.length>0){
  //         this.router.navigateByUrl(tage.children[0].link)
  //       }
  //     }
  //   }
  //   return '';
  // }

  getDefaultRoute(currentMenu){
    console.log('currentMenu====',currentMenu);
    console.log('moduleName====',this.moduleName);
    // if(currentMenu && currentMenu.length>0){
    //   if(currentMenu[0].children && currentMenu[0].children.length>0){
    //     const list:any  = currentMenu[0].children;
    //     console.log(list);
    //     const tage:any = list.find((item:any)=>{
    //         if(item.i18n === moduleName){
    //          return item;
    //       }
    //     })
    //     console.log(tage);
    //     if(tage && tage.children && tage.children.length>0){
    //       this.router.navigateByUrl(tage.children[0].link)
    //     }
    //   }
    // }
    // return '';
    let tage:any;
    if(currentMenu instanceof Array){
      tage = currentMenu.find((item:any)=>{
        if(item.i18n === this.moduleName){
          this.haveGetModule =true;
          return item;
        }
      })
      if(tage){
        if(!tage.link){
          currentMenu = tage.children[0];
        }else {
          currentMenu = tage;
        }
      }else{
        if(this.haveGetModule){
          currentMenu = currentMenu[0];
        }
      }
    }

    if(currentMenu.link){
      this.router.navigateByUrl(currentMenu.link)
    }else{
        this.getDefaultRoute(currentMenu.children)
    }
  }





}
