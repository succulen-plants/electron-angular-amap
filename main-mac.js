"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require("fs");
var docxtemplater_1 = require("docxtemplater");
var PizZip = require('pizzip');
var readTxtFile2_1 = require("./components-mac/readTxtFile2");
var menu_1 = require("./components-mac/menu");
var writeFile_1 = require("./components-mac/writeFile");
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
        directorys = menu_1.readDirectory();
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
// ipcMain.on('read-img-file', function(event, arg) {
//   console.log('read-img-file=====',arg);
//   // event.sender.send('img-file-reply', {imgFileObj, type:'img'});
//   event.sender.send('read-img-reply', {path:__dirname});
// });
electron_1.ipcMain.on('read-file-directorys', function (event, arg) {
    // console.log('ipcMain=====',directorys);
    event.sender.send('file-directorys-reply', { menu: directorys });
});
var openFileDialog = function (oldPath) {
    if (oldPath === void 0) { oldPath = electron_1.app.getPath('downloads'); }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, canceled, filePaths, newpath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!win)
                        return [2 /*return*/, oldPath];
                    return [4 /*yield*/, electron_1.dialog.showOpenDialog(win, {
                            title: '选择保存位置',
                            properties: ['openDirectory', 'createDirectory'],
                            defaultPath: oldPath,
                        })];
                case 1:
                    _a = _b.sent(), canceled = _a.canceled, filePaths = _a.filePaths;
                    newpath = !canceled ? filePaths[0] : oldPath;
                    console.log('===newpath===', newpath);
                    // const template = fs.readFileSync(`dist/assets/myTemplate.docx`);
                    downLoad(newpath);
                    return [2 /*return*/];
            }
        });
    });
};
electron_1.ipcMain.handle('openFileDialog', function (event, oldPath) { return openFileDialog(oldPath); });
var downLoad = function (newpath) {
    var content = fs.readFileSync(path.resolve(__dirname, 'src/assets/myTemplate.docx'), 'binary');
    var zip = new PizZip(content);
    var doc = new docxtemplater_1.default();
    doc.loadZip(zip);
    doc.setData({
        name: 'John',
        age: '11',
    });
    try {
        doc.render();
    }
    catch (e) {
    }
    var buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(path.resolve(newpath, 'output.docx'), buf);
};
// 异步读取txt文件内容
var recPath = '/Users/luotengzhan/work/huaNuo/study/electron-桌面应用/ses/ses/';
console.log('__dirname=====', __dirname);
// 异步读取txt文件内容
// const recPath = 'D:\\ll\\'
// asyncReadtxtFile(`${recPath}`);
// asyncWritetxtFile(`${recPath}txt\\`);
readTxtFile2_1.readTxtFile("" + recPath);
writeFile_1.asyncWritetxtFile(recPath + "txt/");
//# sourceMappingURL=main.js.map