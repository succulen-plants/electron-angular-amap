import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";


@Component({
  selector: 'header-storage',
  template: `
    <i nz-icon nzType="tool"></i>
    清理缓存
  `,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.d-block]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderStorageComponent {
  constructor(private modalSrv: NzModalService, private messageSrv: NzMessageService) {}

  @HostListener('click')
  _click() {
    this.modalSrv.confirm({
      nzTitle: '确认清理本地缓存?',
      nzOnOk: () => {
        localStorage.clear();
        this.messageSrv.success('已清理本地缓存!');
      },
    });
  }
}
