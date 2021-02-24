import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import { SFSchema, SFComponent } from '@delon/form';
import {environment} from "@env/environment";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {CacheService} from "@delon/cache";
import {ElectronService} from "ngx-electron";
declare var AMap: any



@Component({
  selector: 'app-amap',
  templateUrl: './amap.component.html',
  styleUrls: ['./amap.component.less'],
})
export class AmapComponent implements OnInit, OnDestroy , AfterViewInit{


  renderData ={
    isSpinning:false,
    title:'地图',
    // 高德地图
    amap:null,
    // 地图控件
    sacle:null,
    toolBar: null,
    mapType: null,
    // 工具类展示
    mouseTool:null,
    openRangingStatus: false,
    // overlayGroups 钻孔组
    overlayGroups:null,
    overlayGroupStatus:false,
    // 选点功能开启状态
    clickShow: false,
    // 参数计算状态
    calculateShow:false,
    // 场地选点抽屉
    modalVisible: false,
    // 选点信息
    selectedPoint: null,
    // 选择区域
    selectPolyStatus: false,
    // 鼠标工具，区域选区
    overlays:null,
    polygonPath:null,
    // 钻孔列表
    drills:[],

  }

  startIconBlue = new AMap.Icon({
    // 图标尺寸
    size: new AMap.Size(30, 30),
    // 图标的取图地址
    image: `./assets/icons/钻孔2.png`,
    // 图标所用图片大小
    imageSize: new AMap.Size(30, 30),
    // 图标取图偏移量
    // imageOffset: new AMap.Pixel(-9, -3)
  });
  startIconGreen = new AMap.Icon({
    // 图标尺寸
    size: new AMap.Size(30, 30),
    // 图标的取图地址
    image: `./assets/icons/钻孔3.png`,
    // 图标所用图片大小
    imageSize: new AMap.Size(30, 30),
    // 图标取图偏移量
    // imageOffset: new AMap.Pixel(-9, -3)
  });


  @ViewChild('sf', { static: false }) sf: SFComponent;
  schema: SFSchema = {
    properties: {
      x: {
        type: 'string',
        title: '经度',
        maxLength: 32,
      },
      y: {
        type: 'string',
        title: '纬度',
        maxLength: 32,
      },
    },
    required: ['x', 'y'],
    ui: {
      spanLabelFixed: 60,
    },
  };
  // 表单默认数据
  formData: any = {};

  constructor(    private cdr: ChangeDetectorRef,
                  public message: NzMessageService,
                  private modal: NzModalService,
                  public cache: CacheService,
                  private _electronService: ElectronService,
  ){
    this._electronService.ipcRenderer.on('write-txt-reply', (event, data)=>{
      if(data.status === 'success'){
        this.message.info('选区保存成功！')
      }else {
        // this.message.error('选区保存失败\n'+ data.message);
        this.modal.error({
          nzTitle: '',
          nzContent: '选区保存失败\n'+ data.message
        });
      }
      this.renderData.isSpinning = false;
    });
    this._electronService.ipcRenderer.on('read-txt-reply', (event, data)=>{
      console.log('====read-txt-reply====', data);
      if(data.status === 'success'){
        if(data.type==='ploy'){
          if(data.data.length>0){
            this.addPolygon(data.data)
          }else {
            this.modal.info({
              nzTitle: '',
              nzContent: '还没有初始化选区，请开启选区功能进行选区。'
            });
          }
        }else if(data.type === 'drill'){
          this.renderData.drills = data.data;
          this.cache.set('drill-list', data.data)
          this.changeOverlayGroup();
        }
        // this.message.info('选区保存成功！')
      }else {
        // this.message.error('读取数据失败\n'+ data.message);
        this.modal.error({
          nzTitle: '',
          nzContent: '读取数据失败\n'+ data.message
        });
      }
      this.renderData.isSpinning = false;
    });
  }

  ngOnInit(): void {
    this._electronService.ipcRenderer.send('read-txt-file',{type:'ploy',path:'txt/poly.txt'});
    // this.renderData.drills = this.cache.getNone('drill-list');
    this._electronService.ipcRenderer.send('read-txt-file',{type:'drill',path:'txt/钻孔资料/钻孔坐标.txt'});

    // if(!this.renderData.drills ){
    //   // 钻孔不存在时要去读取文件
    // }

  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    this.renderData.amap = new AMap.Map('map',{
      // center: [116.400274, 39.905812],
      center: [113.7177,34.6867],
      zoom: 14,
      mapStyle: 'amap://styles/28401ee6adcafe9e91827e599428632a'
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
    this.renderData.mouseTool = new AMap.MouseTool(this.renderData.amap);
    this.renderData.amap.addControl(this.renderData.sacle);
    this.renderData.amap.addControl(this.renderData.toolBar);
    this.renderData.amap.addControl(this.renderData.mapType);
    console.log('=====amap=====',this.renderData.mapType);


    // 添加覆盖区域
    // this.addPolygon();

    if(this.renderData.drills.length>0) {
      this.changeOverlayGroup();
    }
  }

  // 开启测距功能
  openRanging(){
    // console.log(this.renderData.openRangingStatus);
    // if(!this.renderData.openRangingStatus){
    //   this.renderData.rangingTool.rule({
    //     //同 RangingTool 的 自定义 设置，缺省为默认样式
    //   });
    // }else {
    //   this.renderData.rangingTool.close(true);
    // }
    // this.renderData.openRangingStatus = !this.renderData.openRangingStatus;
    //
    // this.cdr.detectChanges();
  }

  //开启选择区功能
  openSelectPoly(){
    // let mouseTool = new AMap.MouseTool(this.renderData.amap);
    if(!this.renderData.selectPolyStatus){
      //监听draw事件可获取画好的覆盖物
      this.renderData.mouseTool.on('draw',(e)=>{
        console.log(e.obj.w.path);
        // this.renderData.overlays.push(e.obj);
        this.renderData.overlays = e.obj;;
        // this.renderData.polygon = e.obj.w.path;;
      })
      this.renderData.mouseTool.polygon({
        fillColor:'#00b0ff',
        strokeColor:'#80d8ff'
        //同Polygon的Option设置
      });
    }else {
      // this.renderData.rangingTool.close(true);
      this.renderData.mouseTool.close(true)
    }
    this.renderData.selectPolyStatus = !this.renderData.selectPolyStatus;

    this.cdr.detectChanges();
  }
  // 保存选区
  saveSelectPoly(){
    const path = this.renderData.overlays.w.path;
    const paths =[];
    let pathString = '';
    path.forEach((item:any)=>{
      paths.push([item.lng, item.lat]);
      pathString = pathString+`${item.lng} ${item.lat}\r\n`;
    })


    this.renderData.selectPolyStatus = !this.renderData.selectPolyStatus;
    this.renderData.mouseTool.close(true);
    this.addPolygon(paths);

    this._electronService.ipcRenderer.send('write-txt-file',{name:'poly',data:pathString});
    this.renderData.isSpinning = true;


  }

  // 添加多边形区域
  addPolygon(path){
    // const path = [
    //   [116.403322, 39.920255],
    //   [116.410703, 39.897555],
    //   [116.402292, 39.892353],
    //   [116.389846, 39.891365]
    // ]
    if(this.renderData.polygonPath!== null){
      this.renderData.amap.remove(this.renderData.polygonPath)
    }


    // this.renderData.amap.remove(this.renderData)
    const polygon = new AMap.Polygon({
      path: path,
      strokeColor: "#4438fd",
      strokeWeight: 2,
      strokeOpacity: 1,
      fillOpacity: 0,
      zIndex: 50,
    });
    this.renderData.polygonPath = polygon;
    this.renderData.amap.add(polygon)


  }

  // 显示钻孔
  _addOverlayGroup(){
    // text.setMap(map);
    // var lnglats = [[116.39, 39.92], [116.41, 39.93], [116.43, 39.91], [116.46, 39.93]];
    var markers = [];
    this.renderData.drills.forEach(item=>{
        // 创建点实例
        var marker = new AMap.Marker({
          position: new AMap.LngLat(item.latitude, item.longitude),
          // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
          extData: {
            // id: i + 1
          },
          icon: this.startIconBlue,
          title: item.num
        });

        var text = new AMap.Text({
          text:item.num,
          anchor:'center', // 设置文本标记锚点
          draggable:true,
          cursor:'pointer',
          // angle:10,
          style:{
            // 'padding': '.75rem 1.25rem',
            // 'margin-bottom': '1rem',
            // 'border-radius': '.25rem',
            'background-color': 'rgba(0,0,0,0)',
            // 'width': '15rem',
            'border-width': 0,
            // 'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '10px',
            'color': '#000'
          },
          position: [item.latitude, item.longitude],
          // offset:new AMap.Pixel(8, -15),
          zIndex:110
        });
        text.setMap(this.renderData.amap);
        markers.push(marker);
        markers.push(text);
      })

    console.log(this.renderData.drills);

    // 创建覆盖物群组，并将 marker 传给 OverlayGroup
    this.renderData.overlayGroups = new AMap.OverlayGroup(markers);
    this.renderData.amap.add(this.renderData.overlayGroups);
  }
  // 不显示钻孔
  _removeOverlayGroup(){
    this.renderData.amap.remove(this.renderData.overlayGroups);
  }
  // 改变钻孔显示隐藏
  changeOverlayGroup(){
    if(this.renderData.overlayGroupStatus){
      this._removeOverlayGroup();
    }else {
      this._addOverlayGroup();
    }
    this.renderData.overlayGroupStatus = !this.renderData.overlayGroupStatus;
  }

  _addClickMarker = (e)=>{
    console.log(e.lnglat.getLng());
    this._addMarker(e.lnglat.getLng(), e.lnglat.getLat());
  }

  _addMarker = (x,y)=>{
    if(this.renderData.selectedPoint !== null){
      this.renderData.selectedPoint.setPosition([x, y]);
    }else {
      this.renderData.selectedPoint = new AMap.Marker({
        map: this.renderData.amap,
        image: `./assets/icons/选点.png`,
        position: [x, y],
        draggable: true,
        // title:'我是选点， 请点击参数计算获取周边钻孔信息'
      });
      this.renderData.selectedPoint.setMap(this.renderData.amap);
      this.renderData.selectedPoint.on('dragging');
      // // this.renderData.amap.add(this.renderData.selectedPoint);
      // this.renderData.selectedPoint.setTitle('我是选点， 请点击参数计算获取周边钻孔信息');
      this.renderData.calculateShow = true;
    }

    this.formData = {x, y};
  }

  // 参数计算
  calculate() {
    console.log('======selectedPoint====', this.renderData.selectedPoint.getPosition());
    const point = this.renderData.selectedPoint.getPosition();
    // lat: 34.693016
    // lng: 113.712893
    const {lat, lng} = point;
    console.log(this.renderData.drills);
    const distance200=[];
    const distance1000=[];
    let distancs=[];
    this.renderData.drills.forEach(item=>{
      // {num: "K1", longitude: "34.6824", latitude: "113.7310"}
      const distance = AMap.GeometryUtil.distance([item.latitude, item.longitude],[lng, lat])
      console.log('distance===', distance);
      if(distance<200){
        distance200.push(item);
      }else if(distance<1000){
        distance1000.push(item);
      }
    });
    if(distance200.length>0){
      distancs = distance200;
    }else {
      distancs = distance1000;
    }
    const markers = this.renderData.amap.getAllOverlays('marker');
    markers.forEach(item=>{
      if(item.w.title){
        item.setIcon(this.startIconBlue);
      }
    });
    console.log('distancs=====',distancs);
    if(distancs.length>0){

      markers.forEach(marker=>{
        distancs.forEach(item=>{
          if(marker.w.title){
            if(item.num === marker.w.title){
              marker.setIcon(this.startIconGreen);
            }
          }
        })
      })
    }


  }

  // 改变图上选点开启关闭
  changeClickShow(){
    if(this.renderData.clickShow){
      // this._removeOverlayGroup();
      this.renderData.modalVisible = false;
      // this._addOverlayGroup();
      this.renderData.amap.off('click', this._addClickMarker);
      this.renderData.polygonPath.off('click', this._addClickMarker)
    }else {
      this.renderData.modalVisible = true;
      this.message.info('请点击地图选点或右侧输入框选点。');
      this.renderData.amap.on('click', this._addClickMarker);
      this.renderData.polygonPath.on('click', this._addClickMarker)
    }
    this.renderData.clickShow = !this.renderData.clickShow;
    console.log("====changeClickShow==", this.renderData.modalVisible);
  }

  // 清除计算结果
  clearResult(){
    this.modal.confirm({
      nzTitle: '确认清除计算结果?',
      nzContent: '<b style="color: red;">清除后无法恢复</b>',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzOnCancel: () => console.log('Cancel')
    });
  }

  // 提交表单， 通过坐标设置选点
  pointSubmit(formValue:any){
    console.log(formValue);
    this._addMarker(formValue.x, formValue.y);

  }

}
