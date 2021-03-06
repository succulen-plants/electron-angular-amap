import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// const ipcRenderer = require('electron').ipcRenderer;
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {STColumn, STComponent, STData, STPage} from "@delon/abc/st";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-achievement',
  templateUrl: './txt.component.html',
  styleUrls: ['./txt.component.less'],
})
export class TxtComponent implements OnInit, OnDestroy {


  renderData = {
    fileUrl:'',
    parent:'',
    imgName:'',
    title:'',
    isSpinning: false
  }
  page: STPage = {
    front: false,
    show: false,
  };
  constructor(
    private _electronService: ElectronService,
    private activatedRoute: ActivatedRoute,
    public message: NzMessageService,
    private modal: NzModalService,
  ) {
    this._electronService.ipcRenderer.on('read-txt-reply', (event, data)=>{
      console.log('ipcRenderer===txt====',data);
      // if(data){
      //   this.data = data.data;
      //   this.renderData.isSpinning = false;
      // }
      if(data.status === 'success'){
        this.data = data.data;
        // this.message.info('选区保存成功！')
      }else {
        this.modal.error({
          nzTitle: '',
          nzContent: '读取数据失败\n'+ data.message
        });
        // this.message.error('文件读取失败\n'+ data.message);
      }
      this.renderData.isSpinning = false;
    });
  }

  data: STData[] = [];
  @ViewChild('st', { static: false }) private st: STComponent;
  columns: STColumn[] = [
    { title: '时间', index: 'time' },
    { title: '加速度', index: 'acceleration' },
     ];


  ngOnInit(): void {
    console.log('AchievementComponent====');
    this.renderData.isSpinning = true;
    this.activatedRoute.url.subscribe(url => {
      console.log('url====',url);
        this.activatedRoute.queryParams.subscribe(queryParams => {
          console.log('queryParams====',queryParams);
          const newUrl = queryParams.url.replace(/%/, "%25");
          // this.renderData.fileUrl = `${environment.baseUrl}/assets/${newUrl}`;
          const index1 = queryParams.url.indexOf('/');
          const index2 = queryParams.url.lastIndexOf('.');
          this.renderData.title = queryParams.url.substring(index1+1, index2);

          this._electronService.ipcRenderer.send('read-txt-file',{type:'acceleration',path:newUrl});

        });
    });

  }



  ngOnDestroy() {
    // this.imgUrl = '';
  }

}
