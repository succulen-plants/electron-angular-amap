import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

import {asyncReadtxtFile} from './components/readTxtFile';
import {readDirectory} from './components/menu';
import {asyncWritetxtFile} from './components/writeFile';

// 窗口
let win: BrowserWindow = null;
// 文件目录map
const imgFileObj ={};
let txtFileObj:any;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');
// 目录菜单
let directorys:any;
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
    directorys = readDirectory(__dirname);
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





// 异步读取txt文件内容
// const recPath = '/Users/luotengzhan/work/huaNuo/study/electron-桌面应用/ses/src'


// 异步读取txt文件内容
const recPath = 'D:\\ll\\'
asyncReadtxtFile(`${recPath}`);
asyncWritetxtFile(`${recPath}txt\\`);
// asyncReadtxtFile(`${__dirname}/src/assets/`);
// asyncWritetxtFile(`${__dirname}/src/assets/txt/`);




