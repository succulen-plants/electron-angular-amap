import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {DynamicRoutingModule} from "./dynamic-routing.module";
import {BasementComponent} from "./basement/basement.component";
import {SurfaceComponent} from "./surface/surface.component";



const COMPONENTS = [BasementComponent, SurfaceComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, DynamicRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class DynamicModule {}
