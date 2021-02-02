import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
//
import { LayoutDefaultComponent } from './default/default.component';
import { HeaderUserComponent } from './default/header/components/user.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
// import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component';
import { SettingDrawerItemComponent } from './default/setting-drawer/setting-drawer-item.component';
import { SettingDrawerComponent } from './default/setting-drawer/setting-drawer.component';

const SETTINGDRAWER = [
  SettingDrawerComponent, SettingDrawerItemComponent
];
const COMPONENTS = [
  LayoutDefaultComponent,
  LayoutNomenuComponent,
  // LayoutFullScreenComponent,
  HeaderComponent,
  SidebarComponent,
  ...SETTINGDRAWER,
];

const HEADERCOMPONENTS = [
  HeaderUserComponent,
  HeaderLogoComponent
];

// passport
import {HeaderLogoComponent} from "./default/header/components/logo.component";
import {LayoutNomenuComponent} from "./noMenu/nomenu.component";
import {LayoutPassportComponent} from "./passport/passport.component";
const PASSPORT = [LayoutPassportComponent];

@NgModule({
  imports: [SharedModule, RouterModule],
  entryComponents: SETTINGDRAWER,
  declarations: [...COMPONENTS, ...HEADERCOMPONENTS, ...PASSPORT],
  exports: [...COMPONENTS, ...PASSPORT],
})
export class LayoutModule {}
