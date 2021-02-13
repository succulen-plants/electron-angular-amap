/**
 * 读取文件， 并获取目录
 */
const fs = require('fs');

let directorysObj;
function readDirectory() {
  // console.log(`${__dirname}`);
  const directorys = [
    {name:'基岩时程', type:'txt'},
    {name:'地质纵剖面图', type:'img'},
  ];
  directorys.forEach(item=>{
    const path = `${__dirname}/src/assets/${item.type}/${item.name}`;
    directorysObj = readFile(path, item.name, item.type, item.name);
    console.log('====directorysObj===',directorysObj);
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
function readFile(path, name, type, relativePath){

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
      relativePath = `${relativePath}/${file}`;
      return readFile(`${path}/${file}`, file, type);
    }else {
      let icon = '';
      if(type === 'img'){
        icon = "anticon-picture";
      }else if(type==='txt') {
        icon = "anticon-file-text";
      }
      const newfile = file.replace(/%/, "%25");
      const index = file.lastIndexOf('.');
      const fileName = file.substr(0, index);
      const node = {
        "text": fileName,
        "link": `/achievement/file?url=${type}/${relativePath}/${newfile}`,
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
