import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {DrillListComponent} from "./drill-list/drill-list.component";
import {DrillRoutingModule} from "./drill-routing.module";


const COMPONENTS = [DrillListComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, DrillRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class DrillModule {}
