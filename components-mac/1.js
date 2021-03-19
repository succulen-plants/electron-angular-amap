const readline = require('readline');
//Readline是Node.js里实现标准输入输出的封装好的模块，通过这个模块我们可以以逐行的方式读取数据流。使用require(“readline”)可以引用模块。
const fs = require('fs');
const recPath = '/Users/luotengzhan/work/huaNuo/study/electron-桌面应用/ses/ses/txt/钻孔资料/岩土分层信息.txt';
const { once } = require('events');

const r1 = readline.createInterface({
  input: fs.createReadStream(recPath)
});
var i = 1; //txt中的行数
r1.on('line', function(line){ //事件监听
  console.log('Line from file:' + i + ":" + line);
  if(i == 1){
    console.log(line)
  }
  i+=1;
})


  try {
    const r1 = readline.createInterface({
      input: fs.createReadStream(recPath)
    });
    var i = 1; //txt中的行数
    r1.on('line', function(line){ //事件监听
      console.log('Line from file:' + i + ":" + line);
      if(i == 1){
        console.log(line)
      }
      i+=1;
    }).on('close', () => {
      console.log('Have a great day!');
    });

  } catch (err) {
    console.error(err);
  }
