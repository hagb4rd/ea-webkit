global.window=global;
//var request = require("request");
//var rp = require("request-promise");
var $ = module.exports = require('./lib/jquery');
var lib = $.lib = require("ea-lib");
Object.assign($,lib);

var StyleSheet=$.StyleSheet=require('./lib/stylesheet');
var loadScript=$.loadScript=require('./lib/loadscript');
var toolbox=$.toolbox=require('./lib/toolbox');
var gist=$.gist=require('./lib/gist');

var url = $.url = require("url");
var path = require("path");
var querystring = $.querystring = require("querystring");
var util = require("util");
//var xhr = require("./lib/xhr");

//var string = exports.string = require('./lib/string');

var bookmarklet = $.bookmarklet = require("./lib/bookmarklet");
//var gist = $.gist = require('./lib/gist');


$.querystring = querystring;
//$.path = path;
$.util = util;
$.Buffer = Buffer;

var qs = $.qs = (s,elem) => { elem=elem||document; return elem.querySelector(s); };
var qsa = $.qsa = (s,elem) => { elem=elem||document; return Array.from(elem.querySelectorAll(s)); };

var create = $.create = (tagName, attributes, data) => {
  var elem = document.createElement(tagName);

  Object.entries(attributes).forEach(([k,v])=>{
    elem.setAttribute(k,v);
  })

  Object.entries(data).forEach(([k,v])=>{
    elem.dataset.set(k,v);
  })
  
  return elem;
}





$.tags = function tags(...taglist) {
  var selectors = taglist.map(tag => `a[tags*=${tag}]`);
  var xs = qsa(selectors.join(","));
  return xs;
}

var isIterable=$.isIterable=obj=>obj[Symbol.iterator]=="function"||Array.isArray(obj)||typeof obj.length!="undefined"; 
var each=$.each = (iterable,f,m={})=>(f&&f.bind&&(f=f.bind(m)),(isIterable(iterable)?[...iterable]:Object.entries(iterable)).forEach(f), m); each([1,2,3],function(x){this.result+=x},{result:0}); 
var map = $.map = (iterable, f) => (isIterable(iterable)?[...iterable]:Object.entries(iterable)).map(f);

//$.lib = require("./functions");
//$.keywords = require("./keywords");



      

var download = $.download = require('./lib/download');
$.base64 = {
  fromImage: function fromImage(image, outputFormat) {

    var outputFormat = outputFormat || "image/jpeg";

    var canvas = document.createElement('CANVAS');
    canvas.height = image.height || 16;
    canvas.width = image.width || 16;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat);

    if (dataURL) {
      return dataURL;
    } else {
      return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    }
  },
  fromUrl: function fromUrl(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    })
  }
};
