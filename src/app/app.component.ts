import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TitleService, VERSION as VERSION_ALAIN } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';
import { filter } from 'rxjs/operators';
import { environment } from '@env/environment';
import {ElectronService} from "ngx-electron";

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private _electronService: ElectronService
  ) {
    renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    console.log('this._electronService.isElectronApp',this._electronService.isElectronApp);
    if(this._electronService.isElectronApp) {
      let pong: string = this._electronService.ipcRenderer.sendSync('my-event');
      console.log(pong);
    }

    let pong: string = this._electronService.ipcRenderer.sendSync('my-event');
    console.log(pong);
  }

  // baseUrl = environment.baseUrl;

  ngOnInit() {
    this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd)).subscribe(() => {
      this.titleSrv.setTitle();
      this.modalSrv.closeAll();
    });
    this.setMobileMode();
  }

  setMobileMode() {
    // if (Utils.handleMobile()) {
    //   const script = document.createElement('script');
    //   script.src = `${environment.baseUrl}/assets/js/flexible/index.js`;
    //   script.id = 'flexible';
    //   document.body.appendChild(script);
    // }
  }
}
