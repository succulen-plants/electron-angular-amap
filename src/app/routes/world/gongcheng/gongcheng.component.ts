/**
 * app-bluetoothLabel-add
 * author: Luo Teng Zhan
 * time: 2021/1/13
 * modify: 罗腾展
 */
import {  Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { SFSchema, SFComponent } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CacheService} from "@delon/cache";
import {STColumn, STComponent, STData} from '@delon/abc/st';


@Component({
  selector: 'app-world-gongcheng',
  templateUrl: './gongcheng.component.html',
  styleUrls: ['./gongcheng.component.less'],
})
export class GongchengComponent implements OnInit, OnDestroy {
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
    zhongda:[],
    teshu:[],
    beizhu:''
  };

  /**
   * 页面渲染数据
   */
  renderData = {
    loading: false,
    maxDizhenDongCan:null
  };

  data: STData[] = [];
  @ViewChild('st', { static: false }) private st: STComponent;
  columns: STColumn[] = [
    { title: '超越概率', index: 'probability' },
    { title: 'Amax (gal)', index: 'gal' },
    { title: 'βm', index: 'βm' },
    { title: 'αmax', index: 'αmax' },
    { title: 'T1（秒）', index: 't1' },
    { title: 'Tg（秒）', index: 'tg' },
    { title: 'r', index: 'r' },
  ];

  @ViewChild('sf', { static: false }) sf: SFComponent;
  schema: SFSchema = {
    properties: {
      myCustom1: {
        type: 'string',
        title: '',
        ui: {
          grid: { span: 20 },
          widget: 'custom',
          spanLabelFixed: 10,
        },
      },
      zhongda: {
        type: 'string',
        title: '重大工程',
        enum: ['T=50年,P=63%', 'T=50年,P=10%', 'T=50年,P=2%', 'T=100年,P=63%','T=100年,P=10%', 'T=100年,P=2%'],
        ui: {
          widget: 'checkbox',
          checkAll: true,
        }
      },
      teshu: {
        type: 'string',
        title: '特殊工程',
        enum: ['幼儿园', '学校', '医院'],
        ui: {
          widget: 'checkbox',
          // span: 8, // 指定每一项 8 个单元的布局
          checkAll: true,
        }
      },
      myCustom2: {
        type: 'string',
        title: '',
        ui: {
          grid: { span: 20 },
          widget: 'custom',
          spanLabelFixed: 10,
        },
      },
      beizhu: {
        type: 'string',
        title: '备注',
      },
      st: {
        type: 'string',
        title: '',
        ui: {
          widget: 'custom',
        },
      },
    },
    required: [],
    ui: {
      spanLabelFixed: 100,
      grid: {
        offset: 2,
        span: 20,
      },
    },
  };

  ngOnInit() {
    const gongChengData = this.cache.getNone('gongChengData');
    console.log(gongChengData);
    if(gongChengData){
      this.formData = gongChengData;
    }

    const gongChengSt:any = this.cache.getNone('gongChengSt');
    if(gongChengSt){
      this.data = gongChengSt;
    }


    const maxDizhenDongCan = this.cache.getNone('maxDizhenDongCan');
    console.log('maxDizhenDongCan====', maxDizhenDongCan);
    if(maxDizhenDongCan){
      this.renderData.maxDizhenDongCan = maxDizhenDongCan;
    }
  }

  /**
   * Destroy
   */
  ngOnDestroy() {
    // this.data_emitter.unsubscribe();
  }

  forformValueChangemChange(e){
    // path: "/zhongda"
    // pathValue: ["50年63%"]
    console.log('gongcheng====',e.value);
    if(e.path === '/zhongda') {
      this.data = [];
      const pathValue = e.pathValue;
      pathValue.forEach(item => {
          this.data.push({'probability':item,...this.renderData.maxDizhenDongCan[item]});
      })
    }

    console.log('st====',this.data);


    this.cache.set('gongChengData', {...e.value, gongchengSt:this.data});
    this.cache.set('gongChengSt', this.data);


  }


}
