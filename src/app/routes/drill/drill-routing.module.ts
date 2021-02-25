/**
 * 基础应用组件
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DrillListComponent} from "./drill-list/drill-list.component";
import {SoilComponent} from "./soil/soil.component";
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrillRoutingModule {}
