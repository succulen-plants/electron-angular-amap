import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {DrillListComponent} from "./drill-list/drill-list.component";
import {DrillRoutingModule} from "./drill-routing.module";
import {SoilComponent} from "./soil/soil.component";
import {LiquidationComponent} from "./liquidation/liquidation.component";


const COMPONENTS = [DrillListComponent, SoilComponent, LiquidationComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, DrillRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class DrillModule {}
