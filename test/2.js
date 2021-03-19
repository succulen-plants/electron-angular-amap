var ImageModule = require('open-docxtemplater-image-module');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

//Below the options that will be passed to ImageModule instance
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
  //img is the image returned by opts.getImage()
  //tagValue is 'examples/image.png'
  //tagName is 'image'
  //tip: you can use node module 'image-size' here
  return [150, 150];
}

var imageModule = new ImageModule(opts);
let content= fs.readFileSync(path.resolve(__dirname, 'myTemplate.docx'), 'binary');
var zip = new JSZip(content);
var doc = new Docxtemplater()
  // .attachModule(imageModule)
  .loadZip(zip)
  .setData({image: '核心板块位置图.png'})
  .render();

var buffer = doc
  .getZip()
  .generate({type:"nodebuffer"});

fs.writeFile("test.docx",buffer);
