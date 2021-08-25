import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, AfterViewInit} from '@angular/core';
import {DataCommunicateService} from "../../../service/data-communicate.service";
import {Router} from "@angular/router";
import {CacheService} from "@delon/cache";


@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NzDemoMenuRecursiveComponent implements AfterViewInit {
  mode = false;
  menus = [];
  data_emitter;

  constructor(    private dataCommunicateService: DataCommunicateService,
                  private router: Router,
                  private cdr: ChangeDetectorRef,
                  public cache: CacheService,
  ){
    console.log('===layout-menu===');
    this.data_emitter = this.dataCommunicateService.getData().subscribe(data =>{
      console.log(`menu收到数据更新`);
      console.log('NzDemoMenuRecursiveComponent ==== data',data);
      if(data.target === 'NzDemoMenuRecursiveComponent'){
        this.menus = data.value;
        console.log(this.menus);
        const oldmenu = this.cache.getNone('menu');
        console.log('oldmenu====', !oldmenu);
        if(!oldmenu){
          this.cache.set('menu', this.menus);
        }else if( oldmenu[0].title !== this.menus[0].title){
          this.cache.set('menu', this.menus);
        }
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit() {
    console.log('===菜单初始化');
    if(this.menus.length === 0){
      this.menus = this.cache.getNone('menu');
      console.log(this.menus);
      this.cdr.detectChanges();
    }
  }

  click(menu){
    console.log(menu);
    this.router.navigateByUrl(menu.link);
  }
}
