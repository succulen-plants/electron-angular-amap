/**
 * 基础应用组件
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BasementComponent} from "./basement/basement.component";
import {SurfaceComponent} from "./surface/surface.component";
/**
 * 业务组件
 */

const routes: Routes = [
  { path: '', redirectTo: 'basement', pathMatch: 'full' },
  {
    path: 'basement',
    component: BasementComponent,
  },
  {
    path: 'surface',
    component: SurfaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicRoutingModule {}
