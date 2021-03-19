const fs = require('fs');
const path = require('path');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');
var ImageModule = require('open-docxtemplater-image-module');

function read(){

  var opts = {}
  opts.centered = false; //Set to true to always center images
  opts.fileType = "docx"; //Or pptx

//Pass your image loader
  opts.getImage = function(tagValue, tagName) {
    //tagValue is 'examples/image.png'
    //tagName is 'image'
    return fs.readFileSync(tagValue);
  }

//Pass the function that return image size
  opts.getSize = function(img, tagValue, tagName) {
    console.log('====tagValue==',tagValue);
    //img is the image returned by opts.getImage()
    //tagValue is 'examples/image.png'
    //tagName is 'image'
    //tip: you can use node module 'image-size' here
    return [150, 150];
  }

  var imageModule = new ImageModule(opts);


  let content= fs.readFileSync(path.resolve(__dirname, 'myTemplate.docx'), 'binary');
  let zip = new JSZip(content);
  let doc = new Docxtemplater();
  doc.attachModule(imageModule);
  doc.loadZip(zip);
  doc.setData({
    name: 'John',
    age: '12',
    image:'核心板块位置图.png'
  })

  try {
    doc.render();
  }catch (e) {

  }

  let buf = doc.getZip().generate({type:'nodebuffer'});
  fs.writeFileSync(path.resolve(__dirname, '141.docx'), buf)
}


read();
