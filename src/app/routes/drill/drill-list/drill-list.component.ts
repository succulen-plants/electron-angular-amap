import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// const ipcRenderer = require('electron').ipcRenderer;
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {STColumn, STComponent, STData, STPage} from "@delon/abc/st";
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-drill-list',
  templateUrl: './drill-list.component.html',
  styleUrls: ['./drill-list.component.less'],
})
export class DrillListComponent implements OnInit, OnDestroy {


  renderData = {
    fileUrl:'',
    parent:'',
    imgName:'',
    title:'',
    isSpinning: false,
    drills:[]
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
      console.log('ipcRenderer====drill===',data);
      if(data){
        this.data = data.data;
        this.cache.set('drill-list', data.data)
        this.renderData.isSpinning = false;
      }
    });
  }
  data: STData[] = [];
  @ViewChild('st', { static: false }) private st: STComponent;
  columns: STColumn[] = [
    { title: '钻孔编号', index: 'num' },
    { title: '纬度(°)', index: 'longitude' },
    { title: '经度(°)', index: 'latitude' },
     ];


  ngOnInit(): void {

    console.log('AchievementComponent====');
    this.activatedRoute.url.subscribe(url => {
      console.log('url====',url);
        this.activatedRoute.queryParams.subscribe(queryParams => {
          console.log('queryParams====',queryParams);
          const newUrl = queryParams.url.replace(/%/, "%25");
          console.log('newUrl====',newUrl);
          // this.renderData.fileUrl = `${environment.baseUrl}/assets/${newUrl}`;
          const index1 = queryParams.url.indexOf('/');
          const index2 = queryParams.url.lastIndexOf('.');
          this.renderData.title = queryParams.url.substring(index1+1, index2);
          this.data = this.cache.getNone('drill-list');
          // console.log('drill-list=====',this.data);
          this._electronService.ipcRenderer.send('read-txt-file',{type:'drill',path:newUrl});

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
