"use strict";
/**
 * world 文件模版修改
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.writeDocTemplater = void 0;
var electron_1 = require("electron");
var fs = require('fs');
var path = require('path');
var Docxtemplater = require('docxtemplater');
var JSZip = require('jszip');
// const Docxtemplater = require(`${__dirname}/node_modules/docxtemplater`)
// const JSZip = require(`${__dirname}/node_modules/jszip`);
// var ImageModule = require('open-docxtemplater-image-module');
var ImageModule = require('docxtemplater-image-module-free');
function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    return year + "\u5E74" + month + "\u6708" + day + "\u65E5";
}
function downLoad(newpath, args, event, recPath) {
    var opts = {};
    opts.centered = false; //Set to true to always center images
    opts.fileType = "docx"; //Or pptx
    //Pass your image loader
    opts.getImage = function (tagValue, tagName) {
        //tagValue is 'examples/image.png'
        //tagName is 'image'
        return fs.readFileSync(tagValue);
    };
    var images = {
        "date": getDate(),
        'hexinImage': recPath + "img/\u533A\u57DF\u5730\u9707\u8BC4\u4EF7\u4F4D\u7F6E\u56FE.png",
        'quyuImage': recPath + "img/\u5730\u9707\u6784\u9020\u56FE/\u533A\u57DF\u5730\u9707\u6784\u9020\u56FE.png",
        'jinchangImage': recPath + "img/\u5730\u9707\u6784\u9020\u56FE/\u8FD1\u573A\u533A\u5730\u9707\u5730\u8D28\u6784\u9020\u56FE.png",
    };
    //Pass the function that return image size
    opts.getSize = function (img, tagValue, tagName) {
        //img is the image returned by opts.getImage()
        //tagValue is 'examples/image.png'
        //tagName is 'image'
        //tip: you can use node module 'image-size' here
        if (tagValue.indexOf('区域地震评价位置图') !== -1) {
            return [518, 428];
        }
        if (tagValue.indexOf('区域地震构造图') !== -1) {
            return [552, 432];
        }
        if (tagValue.indexOf('近场区地震地质构造图') !== -1) {
            return [552, 432];
        }
        return [432, 382];
    };
    var imageModule = new ImageModule(opts);
    // let content= fs.readFileSync(path.resolve(__dirname, 'myTemplate.docx'), 'binary');
    var content = fs.readFileSync(recPath + "\u6280\u672F\u670D\u52A1\u7CFB\u7EDF\u67E5\u8BE2\u62A5\u544A\u6A21\u677F.docx", 'binary');
    var zip = new JSZip(content);
    var doc = new Docxtemplater();
    doc.attachModule(imageModule);
    doc.loadZip(zip);
    console.log('args=====', args);
    doc.setData(args);
    // doc.setData({
    //   name: 'John',
    //   age: '12',
    //   image:'核心板块位置图.png'
    // })
    try {
        doc.render();
    }
    catch (e) {
    }
    var buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFile(path.resolve(newpath, "\u6280\u672F\u670D\u52A1\u7CFB\u7EDF\u67E5\u8BE2\u62A5\u544A-" + getDate() + ".docx"), buf, function (err) {
        if (err) {
            event.sender.send('write-world-reply', { message: '导出失败！', status: 'error' });
        }
        event.sender.send('write-world-reply', { message: '导出成功！', status: 'success' });
    });
}
function writeDocTemplater(win, recPath) {
    var _this = this;
    var images = {
        "date": getDate(),
        'hexinImage': recPath + "img/\u533A\u57DF\u5730\u9707\u8BC4\u4EF7\u4F4D\u7F6E\u56FE.png",
        'quyuImage': recPath + "img/\u5730\u9707\u6784\u9020\u56FE/\u533A\u57DF\u5730\u9707\u6784\u9020\u56FE.png",
        'jinchangImage': recPath + "img/\u5730\u9707\u6784\u9020\u56FE/\u8FD1\u573A\u533A\u5730\u9707\u5730\u8D28\u6784\u9020\u56FE.png",
    };
    /**
     * 通过world 模版生成world文件
     * @param oldPath
     * worldData: 模版数据
     */
    var worldData = {};
    var downLoadPath = '';
    var openFileDialog = function (event, args) { return __awaiter(_this, void 0, void 0, function () {
        var _a, canceled, filePaths;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog(win, {
                        title: '选择保存位置',
                        properties: ['openDirectory', 'createDirectory'],
                        defaultPath: '',
                    })];
                case 1:
                    _a = _b.sent(), canceled = _a.canceled, filePaths = _a.filePaths;
                    if (!canceled) {
                        // downLoadPath = !canceled ? filePaths[0] : '';
                        downLoadPath = filePaths[0];
                        console.log('===downLoadPath===', downLoadPath);
                        args = __assign(__assign({}, args), images);
                        downLoad(downLoadPath, args, event, recPath);
                        // downLoad(downLoadPath, images, event, recPath);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // 监听渲染器进程发起的通讯
    electron_1.ipcMain.handle('openFileDialog', function (event, args) { return openFileDialog(event, args); });
    // 监听写world 事件，
    electron_1.ipcMain.on('write-world', function (event, arg) {
        console.log('====', arg);
        worldData = arg.data;
        // console.log('ipcMain=====',directorys);
        // event.sender.send('write-world-reply', {menu:directorys});
    });
}
exports.writeDocTemplater = writeDocTemplater;
//# sourceMappingURL=docTemplater.js.map