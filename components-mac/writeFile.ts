import {ipcMain} from "electron";
import * as fs from "fs";

export function asyncWritetxtFile(path){
  ipcMain.on('write-txt-file', (event, arg)=> {
    let argType = '';
    console.log('ipcMain=====',arg);

    // fs.writeFile(`${path}${arg.name}.txt`, arg.data,  (err)=> {
    fs.writeFile(`${path}${arg.name}.txt`, arg.data,  (err)=> {
      if (err) {
        // console.log(err);
        event.sender.send('write-txt-reply', {status:'error', message:err});
      }
      event.sender.send('write-txt-reply', {status:'success', message:'数据保存成功'});
      // console.log("数据写入成功！");
    });
  });
}

