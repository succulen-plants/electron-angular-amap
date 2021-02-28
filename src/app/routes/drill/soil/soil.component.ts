import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// const ipcRenderer = require('electron').ipcRenderer;
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {STColumn, STComponent, STData, STPage} from "@delon/abc/st";
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-dynamic-soil',
  templateUrl: './soil.component.html',
  styleUrls: ['./soil.component.less'],
})
export class SoilComponent implements OnInit, OnDestroy {


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
        // this.cache.set('basement-list', data.data)
        this.renderData.isSpinning = false;
      }
    });
  }
  data: STData[] = [];
  @ViewChild('st', { static: false }) private st: STComponent;


  columns: STColumn[] = [
    { title: '土样编号', index: 'soilNum' },
    { title: '土样定名', index: 'name' },
    { title: '取样深度（m）', index: 'height' },
    { title: '含水率(%)', index: 'rate' },
    { title: '湿密度(g/cm3)', index: 'wetDensity' },
    { title: '干密度(g/cm3)', index: 'Drydensity' },
    { title: '液限(%）', index: 'liquid' },
    { title: '塑限(%)', index: 'plastic' },
    { title: '塑性指数', index: 'index' },
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
          // this.data = this.cache.getNone('basement-list');
          // console.log('basement-list=====',this.data);
          this._electronService.ipcRenderer.send('read-txt-file',{type:'drillSoil',path:newUrl});

          // if(this.data&& this.data.length>0){
          // }else {
          //   this.renderData.isSpinning = true;
          // }

        });
    });

  }


  ngOnDestroy() {
    console.log('ngOnDestroy====');
    // this.imgUrl = '';
    this._electronService.ipcRenderer.removeAllListeners('read-txt-reply');
  }

}
