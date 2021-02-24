/**
 * 监听ipc， 读取txt文件内容， 并讲内容解析发送给渲染进程
 */
import {ipcMain} from "electron";
import * as fs from "fs";


export function asyncReadtxtFile(path){
  console.log('=====asyncReadtxtFile',path);
  ipcMain.on('read-txt-file', (event, arg)=> {
    let argType = '';
    console.log('asyncReadtxtFile=====',arg);
    // if(arg.indexOf('钻孔坐标')!==-1){
    //   argType = 'drill';
    // }else {
    //   argType = '';
    // }
    console.log('asyncReadtxtFile======',`${path}${arg.path}`);
    const newPath = `${path}${arg.path}`;
    console.log('newPath======',newPath);
    asyncReadFile(newPath).then(function (data) {
      let dataList = [];
      const dataString = data.toString();
      console.log(dataString);
      const dataArray = dataString.split(/[(\r\n)\r\n]+/);
      dataArray.forEach((item, index)=>{
        // item.split(str.trim().split(/\s+/))
        // 解析每行内容， 以空格分割
        const array = item.trim().split(/\s+/);
        if(array){
          if(arg.type === 'drill'){
            if(Number(array[0])){
              const node = {
                'num':array[2],
                'longitude':array[0],
                'latitude':array[1]
              }
              dataList.push(node);
            }
          }else if(arg.type=== 'acceleration'){
            const node = {
              'time':array[0],
              'acceleration':array[1]
            }
            if(array[0]!=='0' && parseFloat(array[1])!== 0){
              dataList.push(node);
            }
          }else if(arg.type ==='ploy'){
            if(array[0]!==''){
              dataList.push(array)
            }
          }else {
            dataList.push(array)
          }
        }
      });
      console.log('datalist====',dataList);
      event.sender.send('read-txt-reply', {status:'success',data:dataList, type:arg.type});
    }).catch(error=>{
      console.log(error);
      event.sender.send('read-txt-reply', {status:'error',message:error});
    })
    // event.sender.send('read-txt-reply', {data});
  });
}

async function asyncReadFile(url){
  console.log('asyncReadFile=====',url);
  var f1 = await readTxt(url);
  return f1;

};

function readTxt(path) {
  console.log('readTxt===',path);
  return new Promise(function (resolve, reject) {
    fs.readFile(path,'utf-8', (error, data)=> {
      // console.log('readTxt===',data);
      if (error) reject(error);
      resolve(data);
    });
  });
};

// asyncReadtxtFile(`${__dirname}/src/assets/`);

