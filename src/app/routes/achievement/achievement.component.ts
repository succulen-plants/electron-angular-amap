import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// const ipcRenderer = require('electron').ipcRenderer;
import { ElectronService} from 'ngx-electron';
import {environment} from "@env/environment";
import {LoadingService} from "@delon/abc/loading";

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.less'],
})
export class AchievementComponent implements OnInit, OnDestroy {
  imgUrl:any;
  isVisible =  false;

  renderData = {
    imgUrl:'',
    parent:'',
    imgName:'',
    title:''
  }
  constructor(
    private _electronService: ElectronService,
    private activatedRoute: ActivatedRoute,
    private loadingSrv: LoadingService
  ) {
  }

  form: FormGroup;
  error = '';

  // #endregion

  ngOnInit(): void {
    console.log('AchievementComponent====');
    this.activatedRoute.url.subscribe(url => {
      console.log('url====',url);
      // 文件读取的，还是页面配置的
      if(url[0].path === 'file'){
        this.activatedRoute.queryParams.subscribe(queryParams => {
          console.log('queryParams====',queryParams);
          const newUrl = queryParams.url.replace(/%/, "%25");
          // this.imgUrl = `./assets/${newUrl}`;
          const index1 = queryParams.url.lastIndexOf('/');
          const index2 = queryParams.url.lastIndexOf('.');
          this.renderData.title = queryParams.url.substring(index1+1, index2);
          this.nativeimgae(newUrl);
        });
      }else {
        this.activatedRoute.data
          .subscribe(v => {
            // this.imgUrl = `${environment.baseUrl}/assets/img/${v.parent}/${v.url}`;
            this.renderData.parent = v.parent;
              this.renderData.imgName = v.imgName;
              this.renderData.title = v.title;
            // this.imgUrl = `img/${v.parent}/${v.imgName}`;
            this.nativeimgae(`img/${v.parent}/${v.imgName}`);
            // this.imgUrl = `./assets/img/地震构造图/区域地震构造图.png`;
          });
      }
    });
    //
  }


  // 暂时保留， 待用

  ipc(){
    console.log('this._electronService.isElectronApp',this._electronService.isElectronApp);
    if(this._electronService.isElectronApp) {
      let pong: string = this._electronService.ipcRenderer.sendSync('read-img', {});
      console.log('======icp===',pong);
      this._electronService.ipcRenderer.on('my-event', (err, payload)=>{
        const {data, picPath} = payload;


        let file =  new File([data],picPath.split('/').reverse()[0],{type:'image/'+picPath.split('.').reverse()[0]})
        console.log(file);

        // let file = new File([data],'test.jpeg',{type:'image/jpeg'})
        // console.log(file);
        // let render = new FileReader();
        // render.readAsDataURL(file);
        // render.onload = (e)=> {
        //   console.log(render.result);
        //   this.imgUrl = render.result;
        //   // console.log(this.imgUrl);
        //   // document.getElementById('img').src = newUrl;
        // };
      })


    }
  }


  nativeimgae(nativeimgaeUrl){
    // this._electronService.ipcRenderer.send('read-img-file',{});
    const path = `${environment.imgUrl}${nativeimgaeUrl}`;
    console.log('====path===',path);
    this.loadingSrv.open({type: 'spin' });
    var image = this._electronService.nativeImage.createFromPath(path);
    console.log('image===',image);
    setTimeout(()=>this.loadingSrv.close(),500)
    this.imgUrl = image.toDataURL();
  }

  // showImage(){
  //   this.isVisible = true;
  // }

  ngOnDestroy() {
    console.log('ngOnDestroy==========');
    // this.imgUrl = '';
  }

}
