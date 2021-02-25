import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// const ipcRenderer = require('electron').ipcRenderer;
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {STColumn, STComponent, STData, STPage} from "@delon/abc/st";
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-drill-liquidation',
  templateUrl: './liquidation.component.html',
  styleUrls: ['./liquidation.component.less'],
})
export class LiquidationComponent implements OnInit, OnDestroy {


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
    { title: '钻孔编号', index: 'num' },
    { title: '层号', index: 'layer' },
    { title: 'ds(m)', index: 'dsm' },
    { title: '土名', index: 'name' },
    { title: 'ρc(%)', index: 'pc' },
    { title: 'Ni(击)', index: 'ni' },
    { title: 'Ncri(击)', index: 'ncri' },
    { title: '(1-Ni/Ncri)XdiWi', index: 'XdiWi' },
    { title: '判别结果', index: 'result' },
    { title: 'αmax', index: 'αmax' },
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
          this._electronService.ipcRenderer.send('read-txt-file',{type:'liquidation',path:newUrl});

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
