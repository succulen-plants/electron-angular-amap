import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from "ng-zorro-antd/message";
import {ElectronService} from "ngx-electron";
// import createReport from 'docx-templates';
// const fs = require('fs');
import {environment} from "@env/environment";
import {CacheService} from "@delon/cache";
import {NzModalService} from "ng-zorro-antd/modal";
import {LoadingService} from "@delon/abc/loading";





@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.less'],
})
export class WorldComponent implements OnInit, OnDestroy {

  renderData = {
    title:'安全评估报告',
    tabs:[
      {title:'基本信息', component:'base'},
      {title:'工程与场地类别', component:'gongcheng'},
      {title:'软土震陷', component:'ruantu'},
    ]
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    public message: NzMessageService,
    private router: Router,
    private _electronService: ElectronService,
    public cache: CacheService,
    private modalService: NzModalService,
    private loadingSrv: LoadingService
  ) {
    this._electronService.ipcRenderer.on('write-world-reply', (event, data)=>{
      console.log('ipcRenderer====write-world-reply===',data);
      if(data && data.status === 'success'){
        this.message.success('导出成功！');
        this.loadingSrv.close();
        this.modalService.closeAll();
      }
    });
  }

  ngOnInit(): void {
    // this.nzSelect('base');
  }



  ngOnDestroy() {
    // this.imgUrl = '';
  }

  nzSelect(nzValue){
    this.router.navigate([nzValue], {relativeTo: this.activatedRoute});
  }

  download(){
    const baseData:any = this.cache.getNone('baseData');
    const gongChengData:any = this.cache.getNone('gongChengData');
    const ruantuData:any = this.cache.getNone('ruantuData');
    const common:any = this.cache.getNone('common');
    const data = {...baseData, ...gongChengData, ...ruantuData, 'common':common}

    console.log('baseData===',baseData);
    console.log('gongChengData===',gongChengData);
    console.log('ruantuData==',ruantuData);

    if(!baseData ||  baseData=== null){
      this.message.info('请填写基本信息');
    } else  if(!gongChengData || gongChengData === null){
      this.message.info('请填写工程和场地信息');
    }else {

      const path =  this._electronService.ipcRenderer.invoke('openFileDialog',  data);
      this.loadingSrv.open({type: 'spin' ,text:'正在生成报告'});
    }



    // const path =  this._electronService.ipcRenderer.invoke('openFileDialog',  data);
    // this._electronService.ipcRenderer.send('write-world',{data});
  }


}
