import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {AmapComponent} from "./amap.component";
import {AmapRoutingModule} from "./amap-routing.module";



const COMPONENTS = [AmapComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, AmapRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class AmapModule {}
