import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import {LoginComponent} from "./routes/login/login.component";
import {LayoutPassportComponent} from "./layout/passport/passport.component";
// import {LayoutDefaultComponent} from "./layout/default/default.component";
import {SimpleGuard} from "@delon/auth";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  // {
  //   path: '',
  //   component: LayoutDefaultComponent,
  //   canActivate: [SimpleGuard],
  //   canActivateChild: [SimpleGuard],
  //   children: [
  //     { path: '', redirectTo: 'home', pathMatch: 'full' },
  //     { path: 'home', component: HomeComponent },
  //     // Exception
  //     { path: 'exception', loadChildren: () => import('./routes/exception/exception.module').then(m => m.ExceptionModule) },
  //   ],
  // },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: '登录',
          titleI18n: 'app.login.login',
        },
      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash:true,
      scrollPositionRestoration: 'top',
      // relativeLinkResolution: 'legacy'
    }),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
