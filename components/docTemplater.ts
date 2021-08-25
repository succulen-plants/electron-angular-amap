/**
 * world 文件模版修改
 */

import {dialog, ipcMain} from "electron";

const fs = require('fs');
const path = require('path');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');
// var ImageModule = require('open-docxtemplater-image-module');
var ImageModule = require('docxtemplater-image-module-free');




function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  return `${year}年${month}月${day}日`
}

function downLoad(newpath, args, event, recPath){

  var opts:any = {}
  opts.centered = false; //Set to true to always center images
  opts.fileType = "docx"; //Or pptx

//Pass your image loader
  opts.getImage = function(tagValue, tagName) {
    //tagValue is 'examples/image.png'
    //tagName is 'image'
    return fs.readFileSync(tagValue);
  }

  const images = {
    "date": getDate(),
    'hexinImage':`${recPath}img/区域地震评价位置图.png`,
    'quyuImage':`${recPath}img/地震构造图/区域地震构造图.png`,
    'jinchangImage':`${recPath}img/地震构造图/近场区地震地质构造图.png`,
  }

//Pass the function that return image size
  opts.getSize = function(img, tagValue, tagName) {
    //img is the image returned by opts.getImage()
    //tagValue is 'examples/image.png'
    //tagName is 'image'
    //tip: you can use node module 'image-size' here
    if(tagValue.indexOf('区域地震评价位置图')!== -1){
      return [432, 382];
    }
    if(tagValue.indexOf('区域地震构造图')!== -1){
      return [538, 413];
    }
    if(tagValue.indexOf('近场区地震地质构造图')!== -1){
      return [485, 423];
    }else {
      return [432, 382];
    }

  }

  var imageModule = new ImageModule(opts);


  // let content= fs.readFileSync(path.resolve(__dirname, 'myTemplate.docx'), 'binary');
  // let content= fs.readFileSync('dist/assets/技术服务系统查询报告模板.docx', 'binary');
  let content= fs.readFileSync(`${recPath}技术服务系统查询报告模板.docx`, 'binary');
  let zip = new JSZip(content);
  let doc = new Docxtemplater();
  doc.attachModule(imageModule);
  doc.loadZip(zip);
  console.log('args=====',args);
  doc.setData(args)

  // doc.setData({
  //   name: 'John',
  //   age: '12',
  //   image:'核心板块位置图.png'
  // })

  try {
    doc.render();
  }catch (e) {

  }

  let buf = doc.getZip().generate({type:'nodebuffer'});



  fs.writeFile(path.resolve(newpath, `技术服务系统查询报告-${getDate()}.docx`), buf, (err)=>{
    if(err){
      event.sender.send('write-world-reply', {message:'导出失败！', status:'error'});
    }
    event.sender.send('write-world-reply', {message:'导出成功！', status:'success'});
  })

}

export function writeDocTemplater(win, recPath){



  const images = {
    "date": getDate(),
    'hexinImage':`${recPath}img/区域地震评价位置图.png`,
    'quyuImage':`${recPath}img/地震构造图/区域地震构造图.png`,
    'jinchangImage':`${recPath}img/地震构造图/近场区地震地质构造图.png`,
  }

  /**
   * 通过world 模版生成world文件
   * @param oldPath
   * worldData: 模版数据
   */
  let  worldData ={};
  let downLoadPath = '';
  const openFileDialog = async (event,args) => {
    // console.log('event========',event);
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: '选择保存位置',
      properties: ['openDirectory', 'createDirectory'],
      defaultPath: '',
    })
    if(!canceled){
      downLoadPath = !canceled ? filePaths[0] : '';
      console.log('===downLoadPath===',downLoadPath);
      args = {...args, ...images};
      downLoad(downLoadPath, args, event, recPath);
    }

    // return newpath;
  }

// 监听渲染器进程发起的通讯
  ipcMain.handle('openFileDialog', (event,args) => openFileDialog(event, args))


// 监听写world 事件，
  ipcMain.on('write-world', function(event, arg) {
    console.log('====',arg);
    worldData = arg.data;
    // console.log('ipcMain=====',directorys);
    // event.sender.send('write-world-reply', {menu:directorys});
  });

}

