/**
 * 需要根据文件夹内容自动生成菜单的部分
 */

import * as fs from "fs";

let count = 0;
let open = false;
let level = 1;
const recPath = '/Users/luotengzhan/work/huaNuo/study/electron-桌面应用/ses/src';
// const recPath = 'D:\\ll\\';
export  function readDirectory(dirname) {
  let directorys = [
    {name:'基岩时程', type:'txt', menu:{}},
    {name:'地质纵剖面图', type:'img', menu:{}},
    {name:'钻孔柱状图', type:'img', menu:{}},
    {name:'Amax区划图', type:'img', menu:{}},
  ];
  directorys.forEach((item, index)=>{
    count = 0;
    level = 1;
    // const path = `${dirname}/src/assets/${item.type}/${item.name}`;
    const path = `${recPath}/assets/${item.type}/${item.name}`;
    // const path = `${recPath}${item.type}\\${item.name}`;
    // console.log('menu  path===',path);
    const directorysObj = readFile(path, item.name, item.type);
    directorys[index].menu = directorysObj;
    // console.log(directorysObj);
  });

  return directorys;



}

/**
 *
 * @param path： 文件路径
 * @param name： 文件名称
 * @param type： 文件类型
 * @param relativePath: 文件内的相对路径
 * @returns {{text: *, i18n: *, children: Array}}
 */

function readFile(path, name, type){
  if (count===0){open=true;}else {
    open = false;
  }
  if(name === '100年'|| name==='50年'){
    level = 3;
  }
  if(name.indexOf('孔')>0){
    level = 2;
  }
  const menu:any= {
    "title": name,
    "i18n": name,
     disabled: false,
    open: open,
    selected:open,
    level:level
  };
  const files = fs.readdirSync(path);
  menu.children = files.map((file, index)=>{
    if(count ===0&&index===0){
      count =0;
    }else {
      count++;
      open = false;
    }
    const fileType =  inspectAndDescribeFile(`${path}/${file}`);
    // const fileType =  inspectAndDescribeFile(`${path}\\${file}`);
    if(fileType !== 'file'){
      // relativePath = `${relativePath}/${file}`;
      return readFile(`${path}/${file}`, file, type);
      // return readFile(`${path}\\${file}`, file, type);
    }else {
      let icon = '';
      let link = '';
      let relativePathindex ='';
      let  relativePath = '';
      if(type === 'img'){
        icon = "picture";
        link = '/achievement/file';
        relativePathindex = path.indexOf('img/');
        relativePath = path.substr(relativePathindex+4);
      }else if(type==='txt') {
        icon = "file-text";
        link = '/txt';
        relativePathindex = path.indexOf('txt/');
        relativePath = path.substr(relativePathindex+4);
      }
      const newfile = file.replace(/%/, "%25");
      const index = file.lastIndexOf('.');
      const fileName = file.substr(0, index);

      const node = {
        "title": fileName,
        "link": `${link}?url=${type}/${relativePath}/${newfile}`,
        "i18n": fileName,
        icon,
        selected:open,
        level:level+1,
      }
      return node;
    }
  })
  // console.log(menu);
  return menu;
}

/**
 * 判断路径是文件还是文件夹
 * @param filePath
 */
function inspectAndDescribeFile(filePath) {
  let type ='file';
  // console.log(fs.statSync(filePath));
  const stat =  fs.statSync(filePath);
  if (stat.isFile()) {
    // 判断是否是文件
    type = 'file';
  }
  if (stat.isDirectory()) { // 判断是否是目录
    type = 'directory';
  }

  return type;
}


// readDirectory();
