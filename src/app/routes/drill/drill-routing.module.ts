/**
 * 基础应用组件
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DrillListComponent} from "./drill-list/drill-list.component";
import {SoilComponent} from "./soil/soil.component";
import {LiquidationComponent} from "./liquidation/liquidation.component";
import {DengxiaoComponent} from "./dengxiao/dengxiao.component";
import {CengtuComponent} from "./cengtu/cengtu.component";
import {DongliComponent} from "./dongli/dongli.component";
import {TucengComponent} from "./tuceng/tuceng.component";
/**
 * 业务组件
 */

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: DrillListComponent,
  },
  {
    path: 'soil',
    component: SoilComponent,
  },
  {
    path: 'liquidation',
    component: LiquidationComponent,
  },
  {
    path: 'dengxiao',
    component: DengxiaoComponent,
  },
  {
    path: 'cengtu',
    component: CengtuComponent,
  },
  {
    path: 'dongli',
    component: DongliComponent,
  },
  {
    path: 'tuceng',
    component: TucengComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrillRoutingModule {}
