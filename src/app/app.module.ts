// tslint:disable: no-duplicate-imports
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// #region default language
// 参考：https://ng-alain.com/docs/i18n
import { default as ngLang } from '@angular/common/locales/zh';
// import { DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
// import { zhCN as dateLang } from 'date-fns/locale';
// import { NZ_DATE_LOCALE, NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd/i18n';
// const LANG = {
//   abbr: 'zh',
//   ng: ngLang,
//   zorro: zorroLang,
//   date: dateLang,
//   delon: delonLang,
// };


import { NgxElectronModule } from 'ngx-electron';




// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES = [];

// #endregion
// #region JSON Schema form (using @delon/form)
import { JsonSchemaModule } from '@shared';
const FORM_MODULES = [JsonSchemaModule];
// #endregion
// #region Http Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '@core';
import { SimpleInterceptor } from '@delon/auth';
const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];
// #endregion
// #region Startup Service
import { StartupService } from '@core';
export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
// #endregion

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GlobalConfigModule } from './global-config.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
import { STWidgetModule } from './shared/st-widget/st-widget.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxElectronModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GlobalConfigModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    STWidgetModule,
    ...GLOBAL_THIRD_MODULES,
    ...FORM_MODULES,
  ],
  providers: [ ...INTERCEPTOR_PROVIDES, ...APPINIT_PROVIDES],
  bootstrap: [AppComponent],
})

export class AppModule {}
