/**
 * 监听ipc， 读取txt文件内容， 并讲内容解析发送给渲染进程
 */
// import {ipcMain} from "electron";
import * as fs from "fs";


export function readTxtFile(path){
  // console.log('=====asyncReadtxtFile',path);
  // ipcMain.on('read-txt-file', (event, arg)=> {
    let argType = '';
    // console.log('asyncReadtxtFile=====',arg);
    // if(arg.indexOf('钻孔坐标')!==-1){
    //   argType = 'drill';
    // }else {
    //   argType = '';
    // }
    // console.log('asyncReadtxtFile======',`${path}${arg.path}`);
    const newPath = `${path}${arg.path}`;
    // console.log('newPath======',newPath);
    asyncReadFile(newPath).then(function (data) {
      let dataList = [];
      const dataString = data.toString();
      // console.log(dataString);
      const dataArray = dataString.split(/[(\r\n)\r\n]+/);
      // console.log(dataArray);
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
          }else if(arg.type === 'basement'){
            if(Number(array[1])){
              const node = {
                'num':array[0],
                '5063':array[1],
                '5010':array[2],
                '502':array[3],
                '10063':array[4],
                '10010':array[5],
                '1002':array[6],
              };
              dataList.push(node);
            }
            // console.log('array=====',array);
          }
          else if(arg.type === 'surface'){
            if(Number(array[3])){
              const node = {
                'num':array[0],
                'probability':array[1],
                'gal':array[2],
                'βm':array[3],
                'αmax':array[4],
                't1':array[5],
                'tg':array[6],
                'r':array[7],
              };
              dataList.push(node);
            }
            // console.log('array=====',array);
          }
          else if(arg.type === 'drillSoil'){
            if(Number(array[3])){
              const node = {
                'soilNum':array[0],
                'name':array[1],
                'height':array[2],
                'rate':array[3],
                'wetDensity':array[4],
                'Drydensity':array[5],
                'liquid':array[6],
                'plastic':array[7],
                'index':array[8],
              };
              dataList.push(node);
            }
            // console.log('array=====',array);
          }
          else if(arg.type === 'common'){
            if(array[0]!=='超越概率'){
              const node = {
                'probability':array[0],
                't1':array[1],
                'tg':array[2],
                'βm':array[3],
                'r':array[4],
                'gal':array[5],
                'αmax':array[6],
                'zuni':array[7]
              };
              dataList.push(node);
            }
            console.log('array=====',array);
          }
          // 液化钻孔成功表
          else if(arg.type === 'liquidation'){
            if(Number(array[1])){
              const node = {
                'num':array[0],
                'layer':array[1],
                'dsm':array[2],
                'name':array[3],
                'pc':array[4],
                'ni':array[5],
                'ncri':array[6],
                'XdiWi':array[7],
                'result':array[8],
                'αmax':array[9],
              };
              dataList.push(node);
            }
            // console.log('array=====',array);
          }

          // 岩土分层信息
          else if(arg.type === 'cengtu'){
            if(array[0]!=='层号'){
              const node = {
                'cenghao':array[0],
                'name':array[1],
                'ms':array[2],
                'cenghou':array[3],
                'pingjun':array[4],
                'cengdi':array[5],
                'maishen':array[6],
                'cengdibiaogao':array[7],
                'pingjunbiaogao':array[8]
              };
              dataList.push(node);
            }
            // console.log('array=====',array);
          }
          // 等效剪切波速和场地类别
          else if(arg.type === 'dengxiao'){
            if(Number(array[1])){
              const node = {
                'num':array[0],
                'm':array[1],
                'ms':array[2],
                'siteType':array[3],
              };
              dataList.push(node);
            }
          }
          else if(arg.type === 'acceleration'){
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
      if(arg.type === 'common'){
        console.log('datalist====',dataList);
      }
      event.sender.send('read-txt-reply', {status:'success',data:dataList, type:arg.type});
    }).catch(error=>{
      // console.log(error);
      event.sender.send('read-txt-reply', {status:'error',message:error});
    })
    // event.sender.send('read-txt-reply', {data});
  // });
}

async function asyncReadFile(url){
  // console.log('asyncReadFile=====',url);
  var f1 = await readTxt(url);
  return f1;

};

function readTxt(path) {
  // console.log('readTxt===',path);
  return new Promise(function (resolve, reject) {
    fs.readFile(path,'utf-8', (error, data)=> {
      // console.log('readTxt===',data);
      if (error) reject(error);
      resolve(data);
    });
  });
};

// asyncReadtxtFile(`${__dirname}/src/assets/`);

const recPath = '/Users/luotengzhan/work/huaNuo/study/electron-桌面应用/ses/ses/';
readTxtFile(`${recPath}txt/钻孔资料/岩土分层信息.txt`);
