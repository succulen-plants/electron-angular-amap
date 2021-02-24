"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWritetxtFile = void 0;
var electron_1 = require("electron");
var fs = require("fs");
function asyncWritetxtFile(path) {
    electron_1.ipcMain.on('write-txt-file', function (event, arg) {
        var argType = '';
        console.log('ipcMain=====', arg);
        // fs.writeFile(`${path}${arg.name}.txt`, arg.data,  (err)=> {
        fs.writeFile("" + path + arg.name + ".txt", arg.data, function (err) {
            if (err) {
                console.log(err);
                event.sender.send('write-txt-reply', { status: 'error', message: err });
            }
            event.sender.send('write-txt-reply', { status: 'success', message: '数据保存成功' });
            console.log("数据写入成功！");
        });
    });
}
exports.asyncWritetxtFile = asyncWritetxtFile;
//# sourceMappingURL=writeFile.js.map