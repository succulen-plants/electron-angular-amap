const fs = require('fs');

function readDirectory() {
  const directorys = [
    {name:'基岩时程', type:'txt', menu:{}},
    // {name:'地质纵剖面图', type:'img', menu:{}},
    // {name:'钻孔柱状图', type:'img', menu:{}},
    // {name:'Amax区划图', type:'img', menu:{}},
  ];
  directorys.forEach((item, index)=>{
    const path = `${__dirname}/src/assets/${item.type}/${item.name}`;
    const directorysObj = readFile(path, item.name, item.type);
    directorys[index].menu = directorysObj;
  });

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
  const menu= {
    "text": name,
    "i18n": name,
    // "group": true,
    // "hideInBreadcrumb": true,
    // icon: { type: 'iconfont', iconfont: 'iconquanping1'},
    // "icon": item.icon === '0' ? null : { type: 'img', value: `${baseUrl}/assets/img/idc/menu/${item.icon}`},
    "children":[],
    // "data":item,
  };
  const files = fs.readdirSync(path);
  menu.children = files.map(file=>{
    const fileType =  inspectAndDescribeFile(`${path}/${file}`);
    if(fileType !== 'file'){
      // relativePath = `${relativePath}/${file}`;
      return readFile(`${path}/${file}`, file, type);
    }else {
      let icon = '';
      let link = '';
      if(type === 'img'){
        icon = "anticon-picture";
        link = '/achievement/file';
      }else if(type==='txt') {
        icon = "anticon-file-text";
        link = '/txt';
      }
      const newfile = file.replace(/%/, "%25");
      const index = file.lastIndexOf('.');
      const fileName = file.substr(0, index);
      const relativePathindex = path.indexOf('txt');
     const  relativePath = path.substr(relativePathindex+4);
      const node = {
        "text": fileName,
        "link": `${link}?url=${type}/${relativePath}/${newfile}`,
        "i18n": fileName,
        icon,
      }
      return node;
    }
  })
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


readDirectory();
