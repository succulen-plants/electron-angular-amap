import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// const ipcRenderer = require('electron').ipcRenderer;
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {STColumn, STComponent, STData, STPage} from "@delon/abc/st";
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-drill-tuceng',
  templateUrl: './tuceng.component.html',
  styleUrls: ['./tuceng.component.less'],
})
export class TucengComponent implements OnInit, OnDestroy {

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
      console.log('ipcRenderer====tuceng===',data);
      if(data){
        this.data = data.data;
        this.renderData.isSpinning = false;
      }
    });
  }
  data: STData[] = [];
  @ViewChild('st', { static: false }) private st: STComponent;

  columns: STColumn[] = [
    { title: '层序号', index: 'cenghao' },
    { title: '地层岩性', index: 'yanxing' },
    { title: '土类编号', index: 'bianhao' },
    { title: '层底深度(m)', index: 'shendu' },
    { title: '层厚(m)', index: 'houdu' },
    { title: '密度(t/m3)', index: 'midu' },
    { title: '剪切波速度(m/s)', index: 'sudu' },
    { title: '备注', index: 'beizhu' },
     ];

  ngOnInit(): void {
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
          this.renderData.isSpinning = true;
          this._electronService.ipcRenderer.send('read-txt-file',{type:'tuceng',path:newUrl});
        });
    });

  }


  ngOnDestroy() {
    console.log('ngOnDestroy====');
    this.columns = [];
    this.data = [];
    this._electronService.ipcRenderer.removeAllListeners('read-txt-reply');
  }

}
