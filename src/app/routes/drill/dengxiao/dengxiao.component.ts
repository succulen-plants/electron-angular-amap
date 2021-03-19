import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// const ipcRenderer = require('electron').ipcRenderer;
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {STColumn, STComponent, STData, STPage} from "@delon/abc/st";
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-drill-dengxiao',
  templateUrl: './dengxiao.component.html',
  styleUrls: ['./dengxiao.component.less'],
})
export class DengxiaoComponent implements OnInit, OnDestroy {

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
        this.renderData.isSpinning = false;
      }
    });
  }
  data: STData[] = [];
  @ViewChild('st', { static: false }) private st: STComponent;

  columns: STColumn[] = [
    { title: '孔号', index: 'num' },
    { title: '覆盖层厚度(m)', index: 'm' },
    { title: '等效剪切波速(m/s)', index: 'ms' },
    { title: '场地类别', index: 'siteType' },
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
          this._electronService.ipcRenderer.send('read-txt-file',{type:'dengxiao',path:newUrl});
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
