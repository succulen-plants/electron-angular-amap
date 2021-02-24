"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var readTxtFile_1 = require("./components/readTxtFile");
var menu_1 = require("./components/menu");
var writeFile_1 = require("./components/writeFile");
// 窗口
var win = null;
// 文件目录map
var imgFileObj = {};
var txtFileObj;
var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });
// 目录菜单
var directorys;
function createWindow() {
    console.log('=========createWindow');
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            allowRunningInsecureContent: (serve) ? true : false,
            contextIsolation: false,
            enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
        },
        icon: '/Users/luotengzhan/Pictures/多肉/WechatIMG10.jpeg',
    });
    if (serve) {
        win.webContents.openDevTools();
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    // Emitted when the window is closed.
    win.on('closed', function () {
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
    electron_1.app.on('ready', function () {
        directorys = menu_1.readDirectory(__dirname);
        setTimeout(createWindow, 400);
    });
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
electron_1.ipcMain.on('read-img-file', function (event, arg) {
    console.log('ipcMain=====', imgFileObj);
    event.sender.send('img-file-reply', { imgFileObj: imgFileObj, type: 'img' });
});
electron_1.ipcMain.on('read-file-directorys', function (event, arg) {
    console.log('ipcMain=====', directorys);
    event.sender.send('file-directorys-reply', { menu: directorys });
});
// 异步读取txt文件内容
// const recPath = '/Users/luotengzhan/work/huaNuo/study/electron-桌面应用/ses/src'
// 异步读取txt文件内容
var recPath = 'D:\\ll\\';
readTxtFile_1.asyncReadtxtFile("" + recPath);
writeFile_1.asyncWritetxtFile(recPath + "txt\\");
// asyncReadtxtFile(`${__dirname}/src/assets/`);
// asyncWritetxtFile(`${__dirname}/src/assets/txt/`);
//# sourceMappingURL=main.js.map