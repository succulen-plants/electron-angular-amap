/**
 * 基础应用组件
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AmapComponent} from "./amap.component";
/**
 * 业务组件
 */

const routes: Routes = [


  {
    path: '',
    component: AmapComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmapRoutingModule {}
