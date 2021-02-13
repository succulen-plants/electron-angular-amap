/**
 * 监听ipc， 读取txt文件内容， 并讲内容解析发送给渲染进程
 */
import {ipcMain} from "electron";
import * as fs from "fs";


export function asyncReadtxtFile(path){
  ipcMain.on('read-txt-file', (event, arg)=> {
    console.log('ipcMain=====',arg);
    asyncReadFile(`${path}/${arg}`).then(function (data) {
      let dataList = [];
      const dataString = data.toString();
      const dataArray = dataString.split(/[(\r\n)\r\n]+/);
      dataArray.forEach(item=>{
        // item.split(str.trim().split(/\s+/))
        // 解析每行内容， 以空格分割
        const array = item.trim().split(/\s+/);
        const node = {
          'time':array[0],
          'acceleration':array[1]
        }
        if(array[0]!=='0' && parseFloat(array[1])!== 0){
          dataList.push(node);
        }
      });
      event.sender.send('read-txt-reply', {data:dataList});
    });
    // event.sender.send('read-txt-reply', {data});
  });
}

async function asyncReadFile(url){
  console.log(url);
  var f1 = await readTxt(url);
  return f1;

};

function readTxt(path) {
  console.log(path);
  return new Promise(function (resolve, reject) {
    fs.readFile(path,'utf-8', (error, data)=> {
      if (error) reject(error);
      resolve(data);
    });
  });
};

