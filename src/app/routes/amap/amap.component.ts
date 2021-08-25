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
    // 计算范围区域
    circle200: null,
    circle700: null,
    clearShow: false,
    // distances 距离选定点距离200或700 的点
    distancs:[],
    common:null,
    surface:null,
    setinterval: null,
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
      // console.log('====read-txt-reply====', data);
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
        }
        else if(data.type === 'drill'){
          this.renderData.drills = data.data;
          this.cache.set('drill-list', data.data)
          this.changeOverlayGroup();
        }
        // common 一般参数
        else if(data.type === 'common'){
          this.renderData.common = data.data;
          // console.log('common==========',this.renderData.common);
          this.cache.set('common', this.renderData.common);
        }
        else if(data.type === 'surface'){
          this.renderData.surface = data.data;
          this.cache.set('surface', this.renderData.surface);
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

    this._electronService.ipcRenderer.send('read-txt-file',{type:'common',path:'txt/一般工程设计地震动参数工作表.txt'});
    this._electronService.ipcRenderer.send('read-txt-file',{type:'surface',path:'txt/地震动参数成果表/地表地震动参数成果表.txt'});


    // this._electronService.ipcRenderer.send('read-txt-file',{type:'surface',path:newUrl});

    // if(!this.renderData.drills ){
    //   // 钻孔不存在时要去读取文件
    // }



    this.map();


  }

  ngOnDestroy() {
  }

  ngAfterViewInit(){}

  map() {

     this.renderData.amap = new AMap.Map('map',{
       // center: [116.400274, 39.905812],
       center: [113.7177,34.6867],
       zoom: 14,
       mapStyle: 'amap://styles/28401ee6adcafe9e91827e599428632a'
       // pitch: 70,
       // viewMode: '3D',
     });
    console.log(this.renderData.amap);
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
    if(this.renderData.overlays!== null){
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
  }

  // 添加多边形区域
  addPolygon(path){
    // const path = [
    //   [116.403322, 39.920255],
    //   [116.410703, 39.897555],
    //   [116.402292, 39.892353],
    //   [116.389846, 39.891365]
    // ]
    if(this.renderData.amap){
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

  }

  /**
   *
   */
  _addRound(center:any, radius){
    console.log(center, radius);
    // if(this.renderData.circle!==null){
    //   this.renderData.amap.remove(this.renderData.circle);
    // }
    // 构造矢量圆形
    const circle = new AMap.Circle({
      center: new AMap.LngLat( center.lng, center.lat), // 圆心位置
      radius: radius,  //半径
      strokeColor: "#F33",  //线颜色
      strokeOpacity: 1,  //线透明度
      strokeWeight: 3,  //线粗细度
      fillColor: "#ee2200",  //填充颜色
      fillOpacity: 0 //填充透明度
    });
    if(radius ===200){
      this.renderData.circle200 = circle;
    }else {
      this.renderData.circle700 = circle;
    }
    this.renderData.amap.add(circle);
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
      // this.renderData.amap.add(this.renderData.selectedPoint);
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

    console.log('drills==',this.renderData.drills);
    const distance200=[];
    const distance700=[];
    // let distancs=[];
    this.renderData.drills.forEach(item=>{
      // {num: "K1", longitude: "34.6824", latitude: "113.7310"}
      const distance = AMap.GeometryUtil.distance([item.latitude, item.longitude],[lng, lat])
      console.log('distance===', distance);
      if(distance<200){
        distance200.push(item);
      }else if(distance<700){
        distance700.push(item);
      }
    });


    let radius = 0;
    if(distance200.length>0){
      this.renderData.distancs = distance200;
      radius = 200;
    }else {
      this.renderData.distancs = distance700;
      radius = 700;
    }
    if(this.renderData.circle200 !==null){
      this.renderData.amap.remove(this.renderData.circle200);
    }
    if(this.renderData.circle700 !==null){
      this.renderData.amap.remove(this.renderData.circle700);
    }

    this._addRound(point, radius);
    if(radius===700){
      this._addRound(point, 200);
    }

    const markers = this.renderData.amap.getAllOverlays('marker');
    markers.forEach(item=>{
      if(item.w.title){
        item.setIcon(this.startIconBlue);
      }
    });
    console.log('distancs=====',this.renderData.distancs);
    this.calculateBasementSurface(this.renderData.distancs);
    // if(distancs.length>0){
    //   markers.forEach(marker=>{
    //     distancs.forEach(item=>{
    //       if(marker.w.title){
    //         if(item.num === marker.w.title){
    //           marker.setIcon(this.startIconGreen);
    //         }
    //       }
    //     })
    //   })
    // }
  }


  calculateBasementSurface(distancs){
    console.log('定时再次加载');
    const basementList:any = this.cache.getNone('basement-list');
    let surfaceList:any = this.cache.getNone('surface-list');
    if(surfaceList){
      clearInterval(this.renderData.setinterval);
      console.log('basementList===',basementList);
      console.log('surfaceList===',surfaceList);
      let newBase = [], newSurface = [], maxBase:any={}, maxSurface = [];
      distancs.forEach(dis=>{
        basementList.forEach(bas=>{
          if(dis.num === bas.num){
            newBase.push(bas);
          }
        })

        surfaceList.forEach(sur=>{
          if(dis.num === sur.num){
            newSurface.push(sur);
          }
        })
      })

      console.log('newBase===',newBase);
      console.log('newSurface===',newSurface);


      //  用于存储最终最大值的计算结果
      const probabilityList = {
        "T=50年,P=63%":{'gal':0, 'βm':0,'αmax':0,'t1':0, 'tg':0, 'r':0},
        "T=50年,P=10%":{'gal':0, 'βm':0,'αmax':0,'t1':0, 'tg':0, 'r':0},
        "T=50年,P=2%":{'gal':0, 'βm':0,'αmax':0,'t1':0, 'tg':0, 'r':0},
        "T=100年,P=63%":{'gal':0, 'βm':0,'αmax':0,'t1':0, 'tg':0, 'r':0},
        "T=100年,P=10%":{'gal':0, 'βm':0,'αmax':0,'t1':0, 'tg':0, 'r':0},
        "T=100年,P=2%":{'gal':0, 'βm':0,'αmax':0,'t1':0, 'tg':0, 'r':0},
      }
      // 用于临时存储有相同probability的点
      const probabilityPoints = {
        "T=50年,P=63%":[],
        "T=50年,P=10%":[],
        "T=50年,P=2%":[],
        "T=100年,P=63%":[],
        "T=100年,P=10%":[],
        "T=100年,P=2%":[],
      }

      for(let key in newSurface[0]){
        if(key !== 'num' && key!== 'probability'){
          let max = newSurface[0];
          for(let i=0; i< newSurface.length; i++){
            if(newSurface[i+1] && Number(max[key])<Number(newSurface[i+1][key])){
              max = newSurface[i+1];
            }
          }
          maxSurface[key] = max;
        }
      }

      // 遍历， 获取有相同probability属性的点， 在相同属性的点中比较最大值
      for(let key in probabilityList){
        newSurface.forEach((item:any)=>{
          if(item.probability === key){
            probabilityPoints[key].push(item);
          }
        })
      }

      for(let key in probabilityPoints){
        if(probabilityPoints[key].length === 1){
          probabilityList[key] = probabilityPoints[key][0];
        }else if(probabilityPoints[key].length>1){
          for(let i=0; i<probabilityPoints[key].length; i++){
            if(probabilityList[key]['gal']< probabilityPoints[key][i]['gal'])
            {
              probabilityList[key]['gal'] = probabilityPoints[key][i]['gal'];
            }
            if(probabilityList[key]['βm']< probabilityPoints[key][i]['βm'])
            {
              probabilityList[key]['βm'] = probabilityPoints[key][i]['βm'];
            }
            if(probabilityList[key]['αmax']< probabilityPoints[key][i]['αmax'])
            {
              probabilityList[key]['αmax'] = probabilityPoints[key][i]['αmax'];
            }
            if(probabilityList[key]['t1']< probabilityPoints[key][i]['t1'])
            {
              probabilityList[key]['t1'] = probabilityPoints[key][i]['t1'];
            }
            if(probabilityList[key]['tg']< probabilityPoints[key][i]['tg'])
            {
              probabilityList[key]['tg'] = probabilityPoints[key][i]['tg'];
            }
            if(probabilityList[key]['r']< probabilityPoints[key][i]['r'])
            {
              probabilityList[key]['r'] = probabilityPoints[key][i]['r'];
            }
          }
        }else if (probabilityPoints[key] ===0){

        }
      }



      const commonObj = {
        "T=50年,P=63%":{},
        "T=50年,P=10%":{},
        "T=50年,P=2%":{}
      };
      if(this.renderData.common){
        this.renderData.common.forEach(item=>{
          console.log(item.probability);
          commonObj[item.probability] = item;
        })
      }

      for(let key in commonObj){
        for(let comKey in  commonObj[key]){
          if(commonObj[key][comKey] > probabilityList[key][comKey]){
            probabilityList[key][comKey] = commonObj[key][comKey];
          }
        }
      }

      // console.log('maxBase===',maxBase);
      console.log('commonObj===',commonObj);
      console.log('probabilityList===',probabilityList);
      console.log('maxDizhenDongCan===',probabilityList);
      // 计算结果， 通过判断该字段， 知道系统是否进行过计算
      this.cache.set('maxDizhenDongCan', probabilityList);
    }else {
      this.renderData.setinterval = setInterval(()=>{this.calculateBasementSurface(distancs)}, 1000)
        this.message.error('数据加载中， 请稍后==')
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
      nzOnOk: () => {
        if(this.renderData.circle200 !==null){
          this.renderData.amap.remove(this.renderData.circle200);
        }
        if(this.renderData.circle700 !==null){
          this.renderData.amap.remove(this.renderData.circle700);
        }
        this.renderData.amap.remove(this.renderData.selectedPoint);
        this.renderData.clickShow = false;
        this.renderData.calculateShow = false;
        this.renderData.distancs = [];
        this.renderData.selectedPoint = null;

        // 清除掉表单填写的内容
        this.cache.remove('baseData');
        this.cache.remove('gongChengData');
        this.cache.remove('ruantuData');
        this.cache.remove('maxDizhenDongCan');
        this.cache.remove('gongChengSt');
      },
      nzOnCancel: () => console.log('Cancel')
    });
  }

  // 提交表单， 通过坐标设置选点
  pointSubmit(formValue:any){
    console.log(formValue);
    this._addMarker(formValue.x, formValue.y);

  }

}
