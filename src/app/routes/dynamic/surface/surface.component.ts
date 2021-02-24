import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// const ipcRenderer = require('electron').ipcRenderer;
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {STColumn, STComponent, STData, STPage} from "@delon/abc/st";
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-dynamic-surface',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.less'],
})
export class SurfaceComponent implements OnInit, OnDestroy {


  renderData = {
    fileUrl:'',
    parent:'',
    imgName:'',
    title:'',
    isSpinning: false,
    basements:[]
  }
  page: STPage = {
    front: false,
    show: false,
  };
  constructor(
    private _electronService: ElectronService,
    public cache: CacheService,
    private activatedRoute: ActivatedRoute
  ) {
    this._electronService.ipcRenderer.on('read-txt-reply', (event, data)=>{
      console.log('ipcRenderer====basement===',data);
      if(data){
        this.data = data.data;
        this.cache.set('basement-list', data.data)
        this.renderData.isSpinning = false;
      }
    });
  }
  data: STData[] = [];
  @ViewChild('st', { static: false }) private st: STComponent;
  columns: STColumn[] = [
    { title: '控制点', index: 'num' },
    { title: '超越概率', index: 'probability' },
    { title: 'Amax (gal)', index: 'gal' },
    { title: 'βm', index: 'βm' },
    { title: 'αmax', index: 'αmax' },
    { title: 'T1（秒）', index: 't1' },
    { title: 'Tg（秒）', index: 'tg' },
    { title: 'r', index: 'r' },
     ];
  ngOnInit(): void {
    console.log('AchievementComponent====');
    this.activatedRoute.url.subscribe(url => {
        this.activatedRoute.queryParams.subscribe(queryParams => {
          console.log('queryParams====',queryParams);
          const newUrl = queryParams.url.replace(/%/, "%25");
          console.log('newUrl====',newUrl);
          const index1 = queryParams.url.indexOf('/');
          const index2 = queryParams.url.lastIndexOf('.');
          this.renderData.title = queryParams.url.substring(index1+1, index2);
          this.data = this.cache.getNone('basement-list');
          // console.log('basement-list=====',this.data);
          this._electronService.ipcRenderer.send('read-txt-file',{type:'surface',path:newUrl});

          // if(this.data&& this.data.length>0){
          // }else {
          //   this.renderData.isSpinning = true;
          // }

        });
    });

  }



  ngOnDestroy() {
    // this.imgUrl = '';
  }

}
