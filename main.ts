import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

// 窗口
let win: BrowserWindow = null;
// 文件目录map
const fileObj ={};
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
    readImgFile();
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

function readImgFile(){
  // const rs = fs.createReadStream('./src/assets/img/地质剖面图');
  const fileNames = ['地质纵剖面图', '钻孔柱状图', 'Amax区划图'];
  fileNames.forEach(name=>{
    fs.readdir(`${__dirname}/src/assets/img/${name}`,function(err,files){
      if (err) {
        console.log(err)
      }
      // fileObj.set(name, files);
      fileObj[name]= files;
    })
  })

}


ipcMain.on('read-img-file', function(event, arg) {
  console.log('ipcMain=====',fileObj);
  event.sender.send('img-file-reply', {fileObj, type:'img'});
});

ipcMain.on('my-event', function(event, arg) {

  // readFile();
  // const picPath = '/Users/luotengzhan/Pictures/多肉/WechatIMG10.jpeg'
  //
  // fs.readFile(picPath, (err, data)=>{
  //   event.sender.send('my-event', {data, picPath});
  // })
});

ipcMain.on('my-event', function(event, arg) {
  console.log(arg);  // prints "ping"
  event.returnValue = 'pong';
});
