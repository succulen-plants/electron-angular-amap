import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {STColumn, STComponent, STData, STPage} from "@delon/abc/st";
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-drill-dongli',
  templateUrl: './dongli.component.html',
  styleUrls: ['./dongli.component.less'],
})
export class DongliComponent implements OnInit, OnDestroy {

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
    { title: '试样编号', index: 'bianhao' },
    { title: '施加围压(kPa)', index: 'weiya' },
    { title: '剪应变γ参数', index: 'y' },
    { title: '5×10-6', index: '5106' },
    { title: '1×10-5', index: '1105' },
    { title: '5×10-5', index: '5105' },
    { title: '1×10-4', index: '1104' },
    { title: '5×10-4', index: '5104' },
    { title: '1×10-3', index: '1103' },
    { title: '5×10-3', index: '5103' },
    { title: '1×10-2', index: '1102' },
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
          this._electronService.ipcRenderer.send('read-txt-file',{type:'dongli',path:newUrl});
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
