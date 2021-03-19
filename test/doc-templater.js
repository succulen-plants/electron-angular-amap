const {createReport} = require('docx-templates');
// import createReport from 'docx-templates';
const path = require('path');

     createReport({
         template: path.join(__dirname, './模板2.docx'),
         output: path.join(__dirname, './结果2.docx'),
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
             image1: {
               width: 6,
                 height: 6,
                 path: path.join(__dirname, './核心板块位置图.png'),
                 extension: '.png'
             }
         }
     });
