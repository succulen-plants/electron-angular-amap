import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

import * as echarts from 'echarts/core';
// import * as echarts from 'echarts';
import {
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  ToolboxComponent,
  ToolboxComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  DataZoomInsideComponent,
} from 'echarts/components';
import {
  CanvasRenderer
} from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<LineSeriesOption | TitleComponentOption | GridComponentOption|ToolboxComponentOption|DataZoomComponentOption>;

// 注册必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, DataZoomComponent,DataZoomInsideComponent, ToolboxComponent]
);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.less'],
})
export class ChartsComponent implements OnChanges, OnDestroy,OnInit,AfterViewInit {

  // @Input() data: {xData, yData}={xData:[], yData:[]};
  @Input() data: any= [];
  myChart=null;
  constructor(
  ) {
  }


  ngOnInit(): void {
    console.log('=====ngOnInit=');
    // this.myChart = echarts.init(document.getElementById('echarts'));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('=====ngOnChanges=');
    let xData= [], yData=[];
    console.log(this.myChart);
    if(changes.data.currentValue && changes.data.currentValue.length>0 ){
      changes.data.currentValue.forEach((item,index)=>{
        xData[index] = item.time;
        yData[index] = item.acceleration;
      })
    }


    if(this.myChart!==null){
      this.myChart.setOption({
        title: {
          text: '基岩地震动加速度时程曲线图',
          left:'center'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: [{
          startValue: xData[0],
        },
          {
            type: 'inside'
          }
        //   {
        //   start: 0,
        //   end: 20
        // }
        ],
        xAxis: {
          type: 'category',
          name:'时间（s）',
          data: xData
        },
        yAxis: {
          type: 'value',
          name:'加速度（gal）',
          // axisLine:{
          //   show:true
          // },
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        series: [{
          // data: changes.data.currentValue,
          data: yData,
          type: 'line'
        }]
      });
    }


  }


  ngOnDestroy() {
  }

  ngAfterViewInit(){
    this.myChart = echarts.init(document.getElementById('echarts'));
  }

}
