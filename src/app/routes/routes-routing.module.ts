import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// passport pages

// single pages

import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "../home/home.component";
import {AchievementComponent} from "./achievement/achievement.component";
import {AmapComponent} from "./amap/amap.component";
import {LayoutNomenuComponent} from "../layout/noMenu/nomenu.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'nomenu', pathMatch: 'full' },
      // { path: 'home', component: HomeComponent },
      // { path: 'amap', component: AmapComponent },
      { path: 'achievement', loadChildren: () => import('./achievement/achievement.module').then(m => m.AchievementModule) },
      { path: 'txt', loadChildren: () => import('./txt/txt.module').then(m => m.TxtModule) },
      { path: 'drill', loadChildren: () => import('./drill/drill.module').then(m => m.DrillModule) },
      { path: 'dynamic', loadChildren: () => import('./dynamic/dynamic.module').then(m => m.DynamicModule) },
      // { path: 'world', loadChildren: () => import('./world/world.module').then(m => m.WorldModule) },
      // { path: 'echarts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
      // Exception
      // { path: 'exception', loadChildren: () => import('./routes/exception/exception.module').then(m => m.ExceptionModule) },
    ],
  },
  {
    path: 'nomenu',
    component: LayoutNomenuComponent,
    children: [
      { path: '', redirectTo: 'amap', pathMatch: 'full' },
      { path: 'amap', loadChildren: () => import('./amap/amap.module').then(m => m.AmapModule) },
      // Exception
      // { path: 'exception', loadChildren: () => import('./routes/exception/exception.module').then(m => m.ExceptionModule) },
    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: '登录',
          titleI18n: 'app.login.login',
        },
      },

    ],
  },

  // 单页不包裹Layout
  // {
  //   path: 'callback/:type',
  //   component: CallbackComponent,
  // },
  // { path: '**', redirectTo: 'dmp/exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
