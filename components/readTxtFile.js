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
exports.asyncReadtxtFile = void 0;
/**
 * 监听ipc， 读取txt文件内容， 并讲内容解析发送给渲染进程
 */
var electron_1 = require("electron");
var fs = require("fs");
function asyncReadtxtFile(path) {
    console.log('=====asyncReadtxtFile', path);
    electron_1.ipcMain.on('read-txt-file', function (event, arg) {
        var argType = '';
        console.log('asyncReadtxtFile=====', arg);
        // if(arg.indexOf('钻孔坐标')!==-1){
        //   argType = 'drill';
        // }else {
        //   argType = '';
        // }
        console.log('asyncReadtxtFile======', "" + path + arg.path);
        var newPath = "" + path + arg.path;
        console.log('newPath======', newPath);
        asyncReadFile(newPath).then(function (data) {
            var dataList = [];
            var dataString = data.toString();
            console.log(dataString);
            var dataArray = dataString.split(/[(\r\n)\r\n]+/);
            // dataArray.forEach((item, index)=>{
            //   // item.split(str.trim().split(/\s+/))
            //   // 解析每行内容， 以空格分割
            //   const array = item.trim().split(/\s+/);
            //   if(array){
            //     if(arg.type === 'drill'){
            //       if(Number(array[0])){
            //         const node = {
            //           'num':array[2],
            //           'longitude':array[0],
            //           'latitude':array[1]
            //         }
            //         dataList.push(node);
            //       }
            //     }else if(arg.type=== 'acceleration'){
            //       const node = {
            //         'time':array[0],
            //         'acceleration':array[1]
            //       }
            //       if(array[0]!=='0' && parseFloat(array[1])!== 0){
            //         dataList.push(node);
            //       }
            //     }else if(arg.type ==='ploy'){
            //       if(array[0]!==''){
            //         dataList.push(array)
            //       }
            //     }else {
            //       dataList.push(array)
            //     }
            //   }
            // });
            dataArray.forEach(function (item, index) {
                // item.split(str.trim().split(/\s+/))
                // 解析每行内容， 以空格分割
                var array = item.trim().split(/\s+/);
                if (array) {
                    if (arg.type === 'drill') {
                        if (Number(array[0])) {
                            var node = {
                                'num': array[2],
                                'longitude': array[0],
                                'latitude': array[1]
                            };
                            dataList.push(node);
                        }
                    }
                    else if (arg.type === 'basement') {
                        if (Number(array[1])) {
                            var node = {
                                'num': array[0],
                                '5063': array[1],
                                '5010': array[2],
                                '502': array[3],
                                '10063': array[4],
                                '10010': array[5],
                                '1002': array[6],
                            };
                            dataList.push(node);
                        }
                        console.log('array=====', array);
                    }
                    else if (arg.type === 'surface') {
                        if (Number(array[3])) {
                            var node = {
                                'num': array[0],
                                'probability': array[1],
                                'gal': array[2],
                                'βm': array[3],
                                'αmax': array[4],
                                't1': array[5],
                                'tg': array[6],
                                'r': array[7],
                            };
                            dataList.push(node);
                        }
                        // console.log('array=====',array);
                    }
                    else if (arg.type === 'drillSoil') {
                        if (Number(array[3])) {
                            var node = {
                                'soilNum': array[0],
                                'name': array[1],
                                'height': array[2],
                                'rate': array[3],
                                'wetDensity': array[4],
                                'Drydensity': array[5],
                                'liquid': array[6],
                                'plastic': array[7],
                                'index': array[8],
                            };
                            dataList.push(node);
                        }
                        // console.log('array=====',array);
                    }
                    // 液化钻孔成功表
                    else if (arg.type === 'liquidation') {
                        if (Number(array[1])) {
                            var node = {
                                'num': array[0],
                                'layer': array[1],
                                'dsm': array[2],
                                'name': array[3],
                                'pc': array[4],
                                'ni': array[5],
                                'ncri': array[6],
                                'XdiWi': array[7],
                                'result': array[8],
                                'αmax': array[9],
                            };
                            dataList.push(node);
                        }
                        // console.log('array=====',array);
                    }
                    // 等效剪切波速和场地类别
                    else if (arg.type === 'dengxiao') {
                        if (Number(array[1])) {
                            var node = {
                                'num': array[0],
                                'm': array[1],
                                'ms': array[2],
                                'siteType': array[3],
                            };
                            dataList.push(node);
                        }
                    }
                    else if (arg.type === 'acceleration') {
                        var node = {
                            'time': array[0],
                            'acceleration': array[1]
                        };
                        if (array[0] !== '0' && parseFloat(array[1]) !== 0) {
                            dataList.push(node);
                        }
                    }
                    else if (arg.type === 'ploy') {
                        if (array[0] !== '') {
                            dataList.push(array);
                        }
                    }
                    else {
                        dataList.push(array);
                    }
                }
            });
            console.log('datalist====', dataList);
            event.sender.send('read-txt-reply', { status: 'success', data: dataList, type: arg.type });
        }).catch(function (error) {
            console.log(error);
            event.sender.send('read-txt-reply', { status: 'error', message: error });
        });
        // event.sender.send('read-txt-reply', {data});
    });
}
exports.asyncReadtxtFile = asyncReadtxtFile;
function asyncReadFile(url) {
    return __awaiter(this, void 0, void 0, function () {
        var f1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('asyncReadFile=====', url);
                    return [4 /*yield*/, readTxt(url)];
                case 1:
                    f1 = _a.sent();
                    return [2 /*return*/, f1];
            }
        });
    });
}
;
function readTxt(path) {
    console.log('readTxt===', path);
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf-8', function (error, data) {
            // console.log('readTxt===',data);
            if (error)
                reject(error);
            resolve(data);
        });
    });
}
;
// asyncReadtxtFile(`${__dirname}/src/assets/`);
//# sourceMappingURL=readTxtFile.js.map