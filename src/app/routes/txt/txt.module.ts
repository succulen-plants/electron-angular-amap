import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {ChartsComponent} from "./charts.component";
import {ChartsRoutingModule} from "./charts-routing.module";



const COMPONENTS = [ChartsComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, ChartsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class ChartsModule {}
