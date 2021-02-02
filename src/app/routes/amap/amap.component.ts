import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {environment} from "@env/environment";
declare var AMap: any


@Component({
  selector: 'app-amap',
  templateUrl: './amap.component.html',
  styleUrls: ['./amap.component.less'],
})
export class AmapComponent implements OnInit, OnDestroy , AfterViewInit{


  renderData ={
    title:'地图',
    // 高德地图
    amap:null,
    // 地图控件
    sacle:null,
    toolBar: null,
    mapType: null,
    // 工具类展示
    rangingTool:null,
    openRangingStatus:'开启测距',
    rangingClass: "item active",
    mapTypeClass: "item active",
  }
  constructor(    private cdr: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    // window.onload  = function(){
    //   var map = new AMap.Map('map');
    // }
    // var url = 'https://webapi.amap.com/maps?v=1.4.15&key=9c2739aacf153b32a4773d373d6c0bee';
    // var jsapi = document.createElement('script');
    // jsapi.charset = 'utf-8';
    // jsapi.src = url;
    // document.head.appendChild(jsapi);

    // this.renderData.amap = new AMap.Map('map', {
    //   resizeEnable: true,
    //   zoom : 15,
    //   zooms:[5,20],
    //   pitch: 52,
    //   viewMode: '3D',
    //   center:  [95.594839,35.695244],
    //   // mapStyle:this.renderData.mapStyle
    //   //前往创建自定义地图样式：https://lbs.amap.com/dev/mapstyle/index
    // });
  }


  ngOnDestroy() {
  }

  ngAfterViewInit() {
    this.renderData.amap = new AMap.Map('map',{
      // pitch: 70,
      // viewMode: '3D',
    });

    this.renderData.sacle = new AMap.Scale({  visible: true});
    this.renderData.toolBar = new AMap.ToolBar({  visible: true});
    this.renderData.mapType = new AMap.MapType({
      defaultType: 0,  //0代表默认，1代表卫星
      showRoad: false,
      showTraffic: false,
    });
    // this.renderData.mapType.hide();
    this.renderData.rangingTool = new AMap.MouseTool(this.renderData.amap);
    this.renderData.amap.addControl(this.renderData.sacle);
    this.renderData.amap.addControl(this.renderData.toolBar);
    this.renderData.amap.addControl(this.renderData.mapType);
    console.log('=====amap=====',this.renderData.mapType);

  }

  openRanging(){
    console.log(this.renderData.rangingTool);
    if(this.renderData.openRangingStatus ==='开启测距'){
      this.renderData.rangingTool.rule({
        //同 RangingTool 的 自定义 设置，缺省为默认样式
      });
      this.renderData.rangingClass = "item active";
      this.renderData.openRangingStatus = '关闭测距'
    }else {
      this.renderData.rangingTool.close(true);
      this.renderData.rangingClass = "item";
      this.renderData.openRangingStatus = '开启测距'
    }

    this.cdr.detectChanges();
  }
  changeMayType(){
    // if(this.renderData.openRangingStatus ==='开启测距'){
    //
    //   this.renderData.rangingClass = "item active";
    //
    // }else {
    //   this.renderData.rangingClass = "item";
    // }
    // this.cdr.detectChanges();
    this.renderData.mapType = new AMap.MapType({
      defaultType: 0,  //0代表默认，1代表卫星
      showRoad: false,
      showTraffic: false,
    });
    this.renderData.amap.addControl(this.renderData.mapType);

    this.cdr.detectChanges();
  }

}
