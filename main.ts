import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

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
    readImgFile();
    readTxtFile();
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

/**
 * 读取图片
 */
function readImgFile(){
  // const rs = fs.createReadStream('./src/assets/img/地质剖面图');
  const fileNames = ['地质纵剖面图', '钻孔柱状图', 'Amax区划图'];
  fileNames.forEach(name=>{
    fs.readdir(`${__dirname}/src/assets/img/${name}`,function(err,files){
      if (err) {
        console.log(err)
      }
      // imgFileObj.set(name, files);
      imgFileObj[name]= files;
    })
  })
}

ipcMain.on('read-img-file', function(event, arg) {
  console.log('ipcMain=====',imgFileObj);
  event.sender.send('img-file-reply', {imgFileObj, type:'img'});
});

/**
 * 读取txt
 */

function readTxtFile() {
  const fileNames = ['基岩时程'];
  fileNames.forEach(name=>{
    const path = `${__dirname}/src/assets/txt/${name}`;
    // directory = {
    //   name,
    //   path,
    //   children:[]
    // }
    txtFileObj = readFile(path, name);
    console.log('====txtFileObj===',txtFileObj);
  });

}

function readFile(path, name){
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
    const type:any =  inspectAndDescribeFile(`${path}/${file}`);
    if(type !== 'file'){
      return readFile(`${path}/${file}`, file);
    }else {
      const node = {
        "text": file,
        // "link": `/achievement/file?url=${type}/${key}/${newfile}`,
        // "link": `/achievement/file?url=${type}/${key}`,
        "i18n": file,
      }
      return node;
    }
  })
  return menu;
}

ipcMain.on('read-txt-file', function(event, arg) {
  console.log('ipcMain=====',txtFileObj);
  event.sender.send('txt-file-reply', {txtFileObj, type:'txt'});
});


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
