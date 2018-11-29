define(function(require,exports, module) {
var Frame = document.querySelector("#Frame");
var Display = document.querySelector("#Display");


var w = window.webkit = require('webkit');
var round = (number, precision)=>{precision=precision||0; var factor = Math.pow(10,precision); return Math.round(parseFloat(number)*factor)/factor; };


var options = {
zoom: 3,
animation: {
  duration: 20000,
  easing: "ease-out",
  iterations: 1
},
restTime: 20000
};








  var frame;
  var imageQueue, list=[];



var fetchImage = (src) => {
return new Promise((resolve, reject) => {
  if (src && src instanceof Image) {
    resolve(src);
  } else if (src) {
    var img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (e) => reject(e));
    img.src = src;
  } else {
    reject(new TypeError("missing Argument"));
  };
});
};
var rand = (...v) => { if(v.length==1) v.push(0); var min=Math.min.apply(null,v); var max=Math.max.apply(null,v);  return Math.floor(Math.random()*(max-min) + min) };

var startAnimation = (url) => {
return new Promise((resolve, reject) => {
  fetchImage(url || Display.src).then((img) => {
    Display.src = img.src;
    var scale = Frame.clientWidth / Display.naturalWidth;
    var keyframeB = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(' + String((scale).toFixed(2)) + ')'
    };
    var keyframeA = {
      position: 'absolute',
      top: rand(30,70) +'%',
      left: rand(30,70) +'%',
      transform: 'translate(-50%, -50%) scale(' + String((options.zoom * scale).toFixed(2)) + ')'
    };
    Display.style.transform = keyframeB.transform;
    var animation = Display.animate([keyframeA, keyframeB], options.animation);
    animation.onfinish = () => {
      var timeout = setTimeout(() => {
        resolve();
      }, options.restTime);
    };
  });
});
};
var add = (urls) => {
  if (urls && urls.length) {
    urls.forEach(url=>list.push(url));
  };
};
var enqueue = (imageList) => {
  if(Array.isArray(imageList)) {
    var p = imageList.reduce((prev, next) => prev.then(() => startAnimation(next)), imageQueue || Promise.resolve())
    imageQueue = p;
    return p;
  } else {
    throw TypeError("Argument imageList must be of type Array");
  };
};




class Gallery extends w.EventEmitter {

  constructor(display=Display, frame=Frame) {
      super();
      this.album = {};
      this.albums = [];
      this.image = {};
      this.images = [];
      this.prefetch=true;
      this.display = display;
      this.frame = frame;
      this.current = 0;
      this.animation = null;
      this.delayTimeout = null;
      this.list = ["https://i.imgur.com/CaMyslC.gif"];
      this.on("change", this.onchange);
      this.on("timeout", this.zoomOut);
      this.next();
  }
  async findAlbum(...xs) {
    var includes=(album)=>xs.some(q=>(String(album.title).includes(q) || String(album.description).includes(q)));
    var albums = (localStorage.getItem("imgurAlbums")?JSON.parse(localStorage.getItem("imgurAlbums")):undefined);  ;
    if(!albums) {
      albums = await imgur.getAlbums();
      if(albums && albums.length) {
        localStorage.setItem("imgurAlbums", JSON.stringify(albums))
      }
    }
    var match=albums.filter(includes);
    match.forEach(a=>{
      a.loadImages=async function(){
        this.images=await imgur.getImages(this.id);
        return this.images
      };
      if(this.prefetch) {
        a.loadImages();
      }
      this.album[a.id] = a;
    });

    this.albums = this.albums.concat(match);
    return match;
  }
  onchange(e) {
      this.display.src = e.image.src;
      this.scale = this.frame.clientWidth / this.display.naturalWidth;
      this.keyframeB = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(' + String((this.scale).toFixed(2)) + ')'
      };
      this.keyframeA = {
        position: 'absolute',
        top: rand(30,70) +'%',
        left: rand(30,70) +'%',
        transform: 'translate(-50%, -50%) scale(' + String((options.zoom * this.scale).toFixed(2)) + ')'
      };
      this.display.style.transform = this.keyframeB.transform;
      this.zoomOut();

  }
  next() {
    if(this.list.length != 0) {
      this.current++;
      if(this.current>=this.list.length)
        this.current=0;
      fetchImage(this.list[this.current]).then(img=>this.emit("change", {pos: this.current,url:this.list[this.current],image: img}));
    }

  }
  previous() {
    if(this.list.length != 0) {
      this.current--;
      if(this.current<0)
        this.current=this.list.length-1;
      fetchImage(this.list[this.current]).then(img=>this.emit("change", {pos: this.current,url:this.list[this.current],image: img}));
    }
  }
  add(xs) {
    xs.forEach(x=>this.list.push(x));
  }
  zoomOut() {
    this.delayTimeout = null;
    this.scale = this.frame.clientWidth / this.display.naturalWidth;
    this.keyframeB = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(' + String((this.scale).toFixed(2)) + ')'
    };
    this.keyframeA = {
      position: 'absolute',
      top: rand(30,70) +'%',
      left: rand(30,70) +'%',
      transform: 'translate(-50%, -50%) scale(' + String((options.zoom * this.scale).toFixed(2)) + ')'
    };
    this.display.style.transform = this.keyframeB.transform;
    this.animation = this.display.animate([this.keyframeA, this.keyframeB], options.animation);
    this.animation.onfinish = () => {
      this.delayTimeout = setTimeout(()=>{ this.emit("timeout") }, options.restTime);
    };

  }


};
window.Gallery = Gallery;


return module.exports =  Gallery;
});
