/**
 * 基础应用组件
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AchievementComponent} from "./achievement.component";
/**
 * 业务组件
 */

const routes: Routes = [
  { path: '', redirectTo: 'dgz', pathMatch: 'full' },
  {
    path: 'dgz',
    component: AchievementComponent,
    data: {
      parent: '地震构造图',
      imgName:'区域地震构造图.png',
      title:'区域地震构造图'
    },
  },
  {
    path: 'qdgz',
    component: AchievementComponent,
    data: {
      parent: '地震构造图',
      imgName:'区域大地构造分区图.png',
      title:'区域大地构造分区图'
    },
  },
  {
    path: 'jqdgz',
    component: AchievementComponent,
    data: {
      parent: '地震构造图',
      imgName:'近场区地震地质构造图.png',
      title:'近场区地震地质构造图'
    },
  },
  {
    path: 'jqxdh',
    component: AchievementComponent,
    data: {
      parent: '地震构造图',
      imgName:'近场区新构造单元划分图.png',
      title:'近场区新构造单元划分图'
    },
  },
  {
    path: 'qxgz',
    component: AchievementComponent,
    data: {
      parent: '地震构造图',
      imgName:'区域新单元构造分区图.png',
      title:'区域新单元构造分区图'
    },
  },

  {
    path: 'qlzzf',
    component: AchievementComponent,
    data: {
      parent: '震中分布图',
      imgName:'区域历史地震震中分布图.png',
      title:'区域历史地震震中分布图'
    },
  },
  {
    path: 'qxzzf',
    component: AchievementComponent,
    data: {
      parent: '震中分布图',
      imgName:'区域现代地震震中分布图.png',
      title:'区域现代地震震中分布图'
    },
  },
  {
    path: 'jzzf',
    component: AchievementComponent,
    data: {
      parent: '震中分布图',
      imgName:'近场区地震震中分布图.png',
      title:'近场区地震震中分布图'
    },
  },
  {
    path: 'file',
    component: AchievementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchievementRoutingModule {}
