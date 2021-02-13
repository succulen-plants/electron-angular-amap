/**
 * 基础应用组件
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TxtComponent} from "./txt.component";
/**
 * 业务组件
 */

const routes: Routes = [
  { path: '', redirectTo: 'dgz', pathMatch: 'full' },
  {
    path: 'dgz',
    component: TxtComponent,
    data: {
      parent: '地震构造图',
      imgName:'区域地震构造图.png',
      title:'区域地震构造图'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TxtRoutingModule {}
