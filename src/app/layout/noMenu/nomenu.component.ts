import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  Inject, ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationError, NavigationCancel } from '@angular/router';
import { updateHostClass } from '@delon/util';
import { SettingsService } from '@delon/theme';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'layout-nomenu',
  templateUrl: './nomenu.component.html',
  styleUrls: ['./nomenu.component.less'],
})
export class LayoutNomenuComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChild('settingHost', { read: ViewContainerRef, static: true })
  private settingHost: ViewContainerRef;
  isFetching = false;
  sidebarClass = 'alain-default__aside';

  constructor(
    router: Router,
    _message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    private settings: SettingsService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
  ) {
    // scroll to top in change page
    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
          if(environment.routerErrorReload){

            console.log('======routerErrorReload');
            window.location.reload();
          } else {
            _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
          }
        }
        return;
      }
      if (!(evt instanceof NavigationEnd || evt instanceof RouteConfigLoadEnd)) {
        return;
      }
      if (this.isFetching) {
        setTimeout(() => {
          this.isFetching = false;
        }, 100);
      }
      console.log('====evt.url====',evt);
      // if(evt instanceof NavigationEnd){
      //   console.log('====evt.url====',evt.url);
      //   if(evt.url === '/amap'){
      //     this.sidebarClass = 'alain-default__aside noSidebar';
      //   }else {
      //     this.sidebarClass = 'alain-default__aside';
      //   }
      //   // this.cdr.markForCheck();
      //   console.log(this.sidebarClass);
      //   this.cdr.detectChanges();
      //
      // }
    });
  }



  private setClass() {
    const { el, doc, renderer, settings } = this;
    const layout = settings.layout;
    updateHostClass(el.nativeElement, renderer, {
      ['alain-default']: true,
      [`alain-default__fixed`]: layout.fixed,
      [`alain-default__collapsed`]: layout.collapsed,
    });

    doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
  }

  ngAfterViewInit(): void {
    // Setting componet for only developer
    if (true) {
      setTimeout(() => {
        // const settingFactory = this.resolver.resolveComponentFactory(SettingDrawerComponent);
        // this.settingHost.createComponent(settingFactory);
      }, 22);
    }
  }

  ngOnInit() {
    const { settings, unsubscribe$ } = this;
    // settings.notify.pipe(takeUntil(unsubscribe$)).subscribe(() => this.setClass());
    // this.setClass();
  }

  ngOnDestroy() {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
