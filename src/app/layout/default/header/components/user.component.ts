import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CacheService } from '@delon/cache';


@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{ settings.user.name }}
    </div>
    <nz-dropdown-menu class="nz-dropdown-menu" #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <!--<div nz-menu-item routerLink="/pro/account/center">-->
          <!--<i nz-icon nzType="user" class="mr-sm"></i>-->
          <!--{{ 'menu.account.center' | translate }}-->
        <!--</div>-->
        <!--<div nz-menu-item routerLink="/pro/account/settings">-->
          <!--<i nz-icon nzType="setting" class="mr-sm"></i>-->
          <!--{{ 'menu.account.settings' | translate }}-->
        <!--</div>-->
        <!--<div nz-menu-item routerLink="/exception/trigger">-->
          <!--<i nz-icon nzType="close-circle" class="mr-sm"></i>-->
          <!--{{ 'menu.account.trigger' | translate }}-->
        <!--</div>-->
        <!--<li nz-menu-divider></li>-->
        <!--<div nz-menu-item (click)="rePassword()">-->
          <!--<i nz-icon nzType="lock" class="mr-sm"></i>-->
          <!--{{ 'menu.account.reset-password' | translate }}-->
        <!--</div>-->
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          退出登录
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  styles:[`
        .width-sm{z-index: 1003}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    public cache: CacheService,
  ) {
  }

  logout() {
    // this.tokenService.clear();
    this.cache.clear();
    this.router.navigateByUrl('/passport/login');
  }

  rePassword() {
    this.router.navigateByUrl('nomenu/setting/resetPassword');
  }
}
