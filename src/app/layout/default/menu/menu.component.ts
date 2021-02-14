import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {DataCommunicateService} from "../../../service/data-communicate.service";
import {Router} from "@angular/router";


@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NzDemoMenuRecursiveComponent {
  mode = false;
  menus = [];
  data_emitter;

  constructor(    private dataCommunicateService: DataCommunicateService,
                  private router: Router,
                  private cdr: ChangeDetectorRef,
  ){
    this.data_emitter = this.dataCommunicateService.getData().subscribe(data =>{
      if(data.target === 'NzDemoMenuRecursiveComponent'){
        console.log(data);
        this.menus = data.value;
        this.cdr.detectChanges();
      }
    });
  }

  click(menu){
    console.log(menu);
    this.router.navigateByUrl(menu.link);
  }
}
