import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {DrillListComponent} from "./drill-list/drill-list.component";
import {DrillRoutingModule} from "./drill-routing.module";
import {SoilComponent} from "./soil/soil.component";
import {LiquidationComponent} from "./liquidation/liquidation.component";
import {DengxiaoComponent} from "./dengxiao/dengxiao.component";
import {CengtuComponent} from "./cengtu/cengtu.component";
import {DongliComponent} from "./dongli/dongli.component";
import {TucengComponent} from "./tuceng/tuceng.component";


const COMPONENTS = [
  DrillListComponent,
  SoilComponent,
  LiquidationComponent,
  DengxiaoComponent,
  CengtuComponent,
  DongliComponent,
  TucengComponent
];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, DrillRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class DrillModule {}
