//var request = require("request");
//var rp = require("request-promise");
var $ = module.exports = require('./lib/jquery');


var url = $.url = require("url");
var path = require("path");
var querystring = $.querystring = require("querystring");
var util = require("util");
//var xhr = require("./lib/xhr");
var lib = require("ea-lib");
Object.assign($,lib);
var bookmarklet = $.bookmarklet = require("./lib/bookmarklet");
//var WRGenerator = require("./lib/WRGenerator");

/*
var window=window||{};

var module = module||{exports:{}};
var exports = exports||module.exports;


window.webkit=module.exports;
*/

//Object.assign(exports, lib);

//$.EventEmitter = require("events").EventEmitter;
$.querystring = querystring;
$.url = url;
$.path = path;
$.util = util;
$.Buffer = Buffer;

var qs = $.qs = (s,elem) => { elem=elem||document; return elem.querySelector(s); };
var qsa = $.qsa = (s,elem) => { elem=elem||document; return Array.from(elem.querySelectorAll(s)); };

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

var main = async() => {
  
};
var xorString = s => [...String(s)].reduce((prev, next) => prev ^= next.charCodeAt(0), 0xFF);
var loadScript=$.loadScript=(url)=>{
    return new Promise((resolve,reject)=>{
        var scriptId='mk'+xorString(url);
        var elem=document.querySelector('#'+scriptId);
        if(elem) {
            resolve();
        } else {
            elem = document.createElement('script');
            elem.id=scriptId;
            elem.setAttribute('async','');
            elem.addEventListener('load',(e)=>resolve());
            elem.addEventListener('error',(e)=>reject());
            elem.src=url;
            (document.body || document.rootElement || document).appendChild(elem);             
        }
    });
};
$.download = () => async(text, filename="text") => {
  filename=filename||lib.UUID()
  var element = document.createElement('a');
  
  if(typeof(text)=='object'){
    if(!filename.endsWith('json'))
      filename+=".json";
    text=lib.json.stringify(text);
  }
  
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
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
