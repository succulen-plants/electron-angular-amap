import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

import {asyncReadtxtFile} from './components/readTxtFile';

// 窗口
let win: BrowserWindow = null;
// 文件目录map
const imgFileObj ={};
let txtFileObj:any;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  console.log('=========createWindow');

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule : true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
    icon: '/Users/luotengzhan/Pictures/多肉/WechatIMG10.jpeg',
});

  if (serve) {

    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}




try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => {
    readDirectory();
    setTimeout(createWindow, 400);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });


} catch (e) {
  // Catch Error
  // throw e;

}


ipcMain.on('read-img-file', function(event, arg) {
  console.log('ipcMain=====',imgFileObj);
  event.sender.send('img-file-reply', {imgFileObj, type:'img'});
});


ipcMain.on('read-file-directorys', function(event, arg) {
  console.log('ipcMain=====',directorys);
  event.sender.send('file-directorys-reply', {menu:directorys});
});

/**
 * 获取文件目录， 并创建服务菜单
 */
let   directorys = [
  {name:'基岩时程', type:'txt', menu:{}},
  {name:'地质纵剖面图', type:'img', menu:{}},
  {name:'钻孔柱状图', type:'img', menu:{}},
  {name:'Amax区划图', type:'img', menu:{}},
];
function readDirectory() {
  directorys = [
    {name:'基岩时程', type:'txt', menu:{}},
    {name:'地质纵剖面图', type:'img', menu:{}},
    {name:'钻孔柱状图', type:'img', menu:{}},
    {name:'Amax区划图', type:'img', menu:{}},
  ];
  directorys.forEach((item, index)=>{
    const path = `${__dirname}/src/assets/${item.type}/${item.name}`;
    const directorysObj = readFile(path, item.name, item.type, );
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

// 异步读取txt文件内容
asyncReadtxtFile(`${__dirname}/src/assets/`);



