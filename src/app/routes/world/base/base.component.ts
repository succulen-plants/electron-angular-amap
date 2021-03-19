/**
 * app-bluetoothLabel-add
 * author: Luo Teng Zhan
 * time: 2021/1/13
 * modify: 罗腾展
 */
import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { SFSchema, SFComponent, SFTextareaWidgetSchema } from '@delon/form';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-world-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
})
export class BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * 父组件传递过来的
   * operationType: add, edit
   */
  @Input() operationType = 'add';
  @Input() id = 0;
  constructor(
    public message: NzMessageService,
    public cache: CacheService,
  ) {}

  // 表单默认数据
  formData: any= {
    projectName:'',
    sqDanwei:'',
    remark:''
  };

  fileList: NzUploadFile[] = [];

  /**
   * 页面渲染数据
   */
  renderData = {
    loading: false,
    textareaValue:'',
    file:null,
  };

  @ViewChild('sf', { static: false }) sf: SFComponent;
  schema: SFSchema = {
    properties: {
      myCustomWidget1: {
        type: 'string',
        title: '',
        ui: {
          grid: { span: 20 },
          widget: 'custom',
          spanLabelFixed: 10,
        },
      },
      projectName: {
        type: 'string',
        title: '项目名称',
        maxLength: 32,
        ui: {
          grid: { span: 10 },
        },
      },
      sqDanwei: {
        type: 'string',
        title: '申请单位',
        maxLength: 32,
        ui: {
          grid: { span: 10 },
        },
      },
      myCustomWidget2: {
        type: 'string',
        title: '',
        ui: {
          grid: { span: 20 },
          widget: 'custom',
          spanLabelFixed: 10,
        },
      },
      remark: {
        type: 'string',
        title: '',
        ui: {
          grid: { span: 20 },
          widget: 'textarea',
          autosize: { minRows: 3, maxRows: 6 },
        } as SFTextareaWidgetSchema,
      },
      file: {
        type: 'string',
        title: '上传文件',
        ui: {
          widget: 'custom',
          class: 'file',
        },
      },
    },
    required: [],
    ui: {
      spanLabelFixed: 180,
      grid: {
        offset: 2,
        span: 20,
      },
    },
  };

  ngOnInit() {
    const baseData = this.cache.getNone('baseData');
    if(baseData){
      this.formData = baseData;
    }
  }

  ngAfterViewInit(){
  }
  /**
   * Destroy
   */
  ngOnDestroy() {
    // this.data_emitter.unsubscribe();
  }
  /**
   * 获取详情
   */
  getDetail(id) {

  }
  /**
   * 提交编辑内容
   */
  submit(formValue: any) {

    // let url = ADDRESS_LIST.VISITOR_GROUP_ADD;
    //
    // this.http.post(url, { ...formValue }).subscribe((res: any) => {
    //   if (res.code === 'SUCCESS') {
    //     // this.isSpinning = false;
    //     // this.message.create('success', message);
    //
    //   } else {
    //     // this.isSpinning = false;
    //     this.modalService.error({
    //       nzTitle: '操作失败,' + res.message,
    //     });
    //   }
    // });
    // this.modalService.closeAll();
  }

  fileChange(e){
    const input = (document.getElementById('input_file') as HTMLInputElement);
      const reader = new FileReader()
      reader.readAsText(input.files[0],'utf8')
      reader.onload = ()=>{
        console.log(this.sf.value);
        this.formData  = {...this.sf.value,remark:reader.result};
        this.cache.set('baseData', e.value)
      }
  }

  forformValueChangemChange(e){
    this.cache.set('baseData', e.value)
  }

}
