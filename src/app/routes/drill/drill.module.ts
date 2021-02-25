import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {DrillListComponent} from "./drill-list/drill-list.component";
import {DrillRoutingModule} from "./drill-routing.module";
import {SoilComponent} from "./soil/soil.component";


const COMPONENTS = [DrillListComponent, SoilComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, DrillRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class DrillModule {}
