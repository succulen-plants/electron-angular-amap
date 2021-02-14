"use strict";
/**
 * 需要根据文件夹内容自动生成菜单的部分
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDirectory = void 0;
var fs = require("fs");
var count = 0;
var open = false;
var level = 1;
function readDirectory(dirname) {
    var directorys = [
        { name: '基岩时程', type: 'txt', menu: {} },
        { name: '地质纵剖面图', type: 'img', menu: {} },
        { name: '钻孔柱状图', type: 'img', menu: {} },
        { name: 'Amax区划图', type: 'img', menu: {} },
    ];
    directorys.forEach(function (item, index) {
        count = 0;
        level = 1;
        var path = dirname + "/src/assets/" + item.type + "/" + item.name;
        var directorysObj = readFile(path, item.name, item.type);
        directorys[index].menu = directorysObj;
        console.log(directorysObj);
    });
    return directorys;
}
exports.readDirectory = readDirectory;
/**
 *
 * @param path： 文件路径
 * @param name： 文件名称
 * @param type： 文件类型
 * @param relativePath: 文件内的相对路径
 * @returns {{text: *, i18n: *, children: Array}}
 */
function readFile(path, name, type) {
    if (count === 0) {
        open = true;
    }
    else {
        open = false;
    }
    if (name === '100年' || name === '50年') {
        level = 3;
    }
    if (name.indexOf('孔') > 0) {
        level = 2;
    }
    var menu = {
        "title": name,
        "i18n": name,
        disabled: false,
        open: open,
        selected: open,
        level: level
    };
    var files = fs.readdirSync(path);
    menu.children = files.map(function (file, index) {
        if (count === 0 && index === 0) {
            count = 0;
        }
        else {
            count++;
            open = false;
        }
        var fileType = inspectAndDescribeFile(path + "/" + file);
        if (fileType !== 'file') {
            // relativePath = `${relativePath}/${file}`;
            return readFile(path + "/" + file, file, type);
        }
        else {
            var icon = '';
            var link = '';
            var relativePathindex = '';
            var relativePath = '';
            if (type === 'img') {
                icon = "picture";
                link = '/achievement/file';
                relativePathindex = path.indexOf('img/');
                relativePath = path.substr(relativePathindex + 4);
            }
            else if (type === 'txt') {
                icon = "file-text";
                link = '/txt';
                relativePathindex = path.indexOf('txt/');
                relativePath = path.substr(relativePathindex + 4);
            }
            var newfile = file.replace(/%/, "%25");
            var index_1 = file.lastIndexOf('.');
            var fileName = file.substr(0, index_1);
            var node = {
                "title": fileName,
                "link": link + "?url=" + type + "/" + relativePath + "/" + newfile,
                "i18n": fileName,
                icon: icon,
                selected: open,
                level: level + 1,
            };
            return node;
        }
    });
    console.log(menu);
    return menu;
}
/**
 * 判断路径是文件还是文件夹
 * @param filePath
 */
function inspectAndDescribeFile(filePath) {
    var type = 'file';
    // console.log(fs.statSync(filePath));
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
        // 判断是否是文件
        type = 'file';
    }
    if (stat.isDirectory()) { // 判断是否是目录
        type = 'directory';
    }
    return type;
}
// readDirectory();
//# sourceMappingURL=menu.js.map