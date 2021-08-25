/**
 * 监听ipc， 读取txt文件内容， 并讲内容解析发送给渲染进程
 */
import {ipcMain} from "electron";
import * as fs from "fs";
const readline = require('readline');



export function readTxtFile(path){
  ipcMain.on('read-txt-file', (event, arg)=> {
    const newPath = `${path}${arg.path}`;
    try {
      const r1 = readline.createInterface({
        input: fs.createReadStream(newPath)
      });

      var i = 1; //txt中的行数
      const dataArray = [];
      const dataList = [];
      // 对于岩土文档的特殊处理， 括号旁边会出现空格， 导致被分成两个字段
      const objRegExp= /\($/;
      r1.on('line', function(line){ //事件监听
        const array = line.trim().split(/\s+/);
        array.forEach((item, index)=>{
          if(objRegExp.test(item)){
            array[index] = array[index]+array[index+1];
            array.splice(index+1,1);
          }
        })

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
            console.log('array=====',array);
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
            console.log('array=====',array);
          }
          // 动力学参数
          else if(arg.type === 'dongli'){
            if(array[0]!=='试样编号'){
              const node = {
                'bianhao':array[0],
                'weiya':array[1],
                'y':array[2],
                '5106':array[3],
                '1105':array[4],
                '5105':array[5],
                '1104':array[6],
                '5104':array[7],
                '1103':array[8],
                '5103':array[9],
                '1102':array[10],
              };
              dataList.push(node);
            }
            console.log('array=====',array);
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
          // 土层计算模型
          else if(arg.type === 'tuceng'){
            if(Number(array[0])){
              const node = {
                'cenghao':array[0],
                'yanxing':array[1],
                'bianhao':array[2],
                'shendu':array[3],
                'houdu':array[4],
                'midu':array[5],
                'sudu':array[6],
                'beizhu':array[7],
              };
              dataList.push(node);
            }
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
        i+=1;
      }).on('close', () => {
        event.sender.send('read-txt-reply', {status:'success',data:dataList, type:arg.type});
        console.log('Have a great day!');
      });
    }catch (e) {
      event.sender.send('read-txt-reply', {status:'error',message:e});
    }
  });
}


// asyncReadtxtFile(`${__dirname}/src/assets/`);

// const recPath = '/Users/luotengzhan/work/huaNuo/study/electron-桌面应用/ses/ses/';
// readTxtFile(`${recPath}txt/钻孔资料/岩土分层信息.txt`);
