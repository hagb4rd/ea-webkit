
//var request = require("request");
//var rp = require("request-promise");
var url = require("url");
var path = require("path");
var querystring = require("querystring");
var $ = require("jquery");
var util = require("util");
//var xhr = require("./lib/xhr");
var lib = require("ea-lib");
//var WRGenerator = require("./lib/WRGenerator");



exports.lib = lib;
Object.assign(exports, lib);

exports.EventEmitter = require("events").EventEmitter;
exports.$ = $;
exports.querystring = querystring;
exports.url = url;
exports.path = path;
exports.util = util;

var window = window || { document:{ querySelector: (s)=>undefined, querySelectorAll: (s)=>[]  }};

var qs = exports.qs = (s, document=window.document) => document.querySelector(s)
var qsa = exports.qsa = (s, document=window.document) => document.querySelectorAll(s)

exports.tags = function tags(...taglist) {
  var selectors = taglist.map(tag => `a[tags*=${tag}]`);
  var xs = exports.qsa(selectors.join(","));
  return xs;
}

var isIterable=exports.isIterable=obj=>obj[Symbol.iterator]=="function"||Array.isArray(obj)||typeof obj.length!="undefined"; 
var each=exports.each = (iterable,f,m={})=>(f&&f.bind&&(f=f.bind(m)),(isIterable(iterable)?[...iterable]:Object.entries(iterable)).forEach(f), m); each([1,2,3],function(x){this.result+=x},{result:0}); 
var map = exports.map = (iterable, f) => (isIterable(iterable)?[...iterable]:Object.entries(iterable)).map(f);

//exports.lib = require("./functions");
//exports.keywords = require("./keywords");
exports.base64 = {
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

if(typeof(window)!='undefined') {
  Object.assign(window, lib, exports);
}