/**
 * app-bluetoothLabel-add
 * author: Luo Teng Zhan
 * time: 2021/1/13
 * modify: 罗腾展
 */
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { SFSchema, SFComponent, SFTextareaWidgetSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {CacheService} from "@delon/cache";

@Component({
  selector: 'app-world-ruantu',
  templateUrl: './ruantu.component.html',
  styleUrls: ['./ruantu.component.less'],
})
export class RuantuComponent implements OnInit, OnDestroy {
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
  formData: any;

  fileList: NzUploadFile[] = [];

  /**
   * 页面渲染数据
   */
  renderData = {
    loading: false,
  };

  @ViewChild('sf', { static: false }) sf: SFComponent;
  schema: SFSchema = {
    properties: {
      ruantu: {
        type: 'number',
        title: '是否考虑软土震陷问题',
        enum: [
          {label: '考虑', value: '考虑'},
          {label: '不考虑', value: '不考虑'}
        ],
        ui: {
          widget: 'radio',
          grid: { span: 10 },
        },
        default: '2',
      }
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
    const baseData = this.cache.getNone('ruantuData');
    if(baseData){
      this.formData = baseData;
    }
  }

  /**
   * Destroy
   */
  ngOnDestroy() {
    // this.data_emitter.unsubscribe();
  }

  forformValueChangemChange(e){
    this.cache.set('ruantuData', e.value);
  }



}
