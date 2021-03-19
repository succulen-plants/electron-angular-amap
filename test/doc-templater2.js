const {createReport} = require('docx-templates');
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync('模版2.docx');

const buffer =  createReport({
  template,
  data: {
    name1: '直接访问',
    value1: '11111',
    name2: '邮件营销',
    value2: '2222',
    name3: '联盟广告',
    value3: '3333',
    name4: '视频广告',
    value4: '4444',
    name5: '搜索引擎',
    value5: '5555',
    // image1: {
    //   width: 150,
    //   height: 150,
    //   path: path.join(__dirname, './核心板块位置图.png'),
    //   extension: '.png'
    // }
    // image1:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIJBywfp3IOswAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAkUlEQVQY052PMQqDQBREZ1f/d1kUm3SxkeAF/FdIjpOcw2vpKcRWCwsRPMFPsaIQSIoMr5pXDGNUFd9j8TOn7kRW71fvO5HTq6qqtnWtzh20IqE3YXtL0zyKwAROQLQ5l/c9gHjfKK6wMZjADE6s49Dver4/smEAc2CuqgwAYI5jU9NcxhHEy60sni986H9+vwG1yDHfK1jitgAAAABJRU5ErkJggg=="

},
});

fs.writeFileSync('report.docx', buffer)
