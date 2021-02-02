import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {AchievementComponent} from "./achievement.component";
import {AchievementRoutingModule} from "./achievement-routing.module";


const COMPONENTS = [AchievementComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, AchievementRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [],
  entryComponents: [],
})
export class AchievementModule {}
