import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {TxtComponent} from "./txt.component";
import {TxtRoutingModule} from "./txt-routing.module";
import {ChartsComponent} from "../components/charts/charts.component";


const COMPONENTS = [TxtComponent, ChartsComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, TxtRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class TxtModule {}
