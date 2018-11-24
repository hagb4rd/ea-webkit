global.window=global;
//var request = require("request");
//var rp = require("request-promise");
var $ = module.exports = require('./lib/jquery');
var lib = $.lib = require("ea-lib");
Object.assign($,lib);

var minify = $.minify = require('./lib/uglify').minify;

var StyleSheet=$.StyleSheet=require('./lib/stylesheet');
var dom = $.dom = require('./lib/dom');

var css = $.css = require('./lib/css');

var loadScript=$.loadScript=require('./lib/loadscript');

var toolbox=$.toolbox=require('./lib/toolbox');
var gist=$.gist=require('./lib/gist');

var url = $.url = require("url");
var path = require("path");
//var querystring = $.querystring = require("querystring");
var util = require("util");
//var xhr = require("./lib/xhr");

var escapeHTML=$.escapeHTML=(html)=>html.replace(/>/g, '&gt;').replace(/</g,'&lt;')

//var string = exports.string = require('./lib/string');

var bookmarklet = $.bookmarklet = require("./lib/bookmarklet");
var favicon =   $.favicon = require('./lib/favicon');

//var gist = $.gist = require('./lib/gist');


//$.querystring = querystring;
//$.path = path;
//$.util = util;
//$.Buffer = Buffer;





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


(function(document, window, $) {
  var qs = $.qs = (s,elem) => { elem=elem||document; return elem.querySelector(s); };
  var qsa = $.qsa = (s,elem) => { elem=elem||document; return elem.querySelectorAll(s); };
  Object.defineProperty($, "head", { get() { return document.head || document.getElementsByName('head')[0] || document.documentElement; }});
  var importStyleSheet = $.importStyleSheet = url => $.create('link', {rel:"stylesheet", href: url})


  var parse = $.parse = html => (new DOMParser()).parseFromString(html, "text/html");
  var create = $.create = (tagName, attributes={}, data) => {
    var elem = document.createElement(tagName);
    elem.updateStyle = function(css={}) {
      css=Object.assign({}, $.css, css)
      try {
        var classList=[...this.classList].map(className=>css[className]).filter(x=>!!x);
        if(!this.rawStyle) {
          rawStyle=Object.assign({},this.style);
        }
        //reset style first
        Object.assign(this.style, this.rawStyle);

        classList.forEach(style=>Object.assign(this.style, style));
        
      } catch(e) {
        console.log(e);
      }
    }

    /*
    Object.defineProperty(elem,"_classList",Object.getOwnPropertyDescriptor(elem, "classList"));
    Object.defineProperty(elem,"classList",{ get: () => {
      var proxy = {
        removeClass: (...args) => {
          elem._classList.removeClass.apply(elem.classList, args);
          elem.updateStyle();
        },
        addClass: (...args) => {
          elem._classList.addClass.apply(elem.classList, args);
          elem.updateStyle();
        },
        toggle: (...args) => {
          elem._classList.toggle.apply(elem.classList, args);
          elem.updateStyle();
        }
      };
    */
   /*
    var _classList = elem.classList;
    elem.classList = new Proxy(_classList, {
      get(targs, k) {
        if(["addClass", "removeClass", "toggle"].includes(k)) {
          requestAnimationFrame(()=>elem.updateStyle());
        }
        return _classList[k];
      }
    });
    */
    Object.entries(attributes).forEach(([k,v])=>{
      elem.setAttribute(k,v);
    });
    
    
   
    try {
      if(data) {
        Object.entries(data).forEach(([k,v])=>{
          elem.dataset.set(k,v);
        })
      }
    } catch (e) {
      console.log(e);
    }
    elem.updateStyle();

    if(!elem.appendTo) {
      elem.appendTo = function(target) {
        (target || document.getElementsByTagName('body')[0]).append(elem);
      }
    }

    return elem;
  };
})(window.document, window, $);

