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
    // const menuList = this.cache.getNone('menuList');
    // const menuName = this.cache.getNone('menuName');
    // console.log(menuName);
    this.activatedRoute.url.subscribe(url => {
      const menuName:any = this.cache.getNone('menuName');
      console.log('===menuName===',menuName);
      if(menuName){
        let menu:any;
        console.log(menu);
        try {
          menu = this.cache.getNone(menuName);
          console.log(menu);
          this.getDefaultRoute(menu[0]);
        }catch (e) {
          console.log(e);
        }


        // const currentMenu = menuList[menuName];

      }
    });
  }



  getDefaultRoute(currentMenu:any){
    console.log('currentMenu====',currentMenu);


    if(currentMenu.link){
      this.router.navigateByUrl(currentMenu.link)
    }else{
        this.getDefaultRoute(currentMenu.children[0])
    }
  }





}
