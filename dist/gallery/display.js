define(function(require,exports, module) {
  //Common Display Screen Initiator function
  var ratio=require('ratio');
  var css=require('style');
  var resizeDisplay = exports.resizeDisplay = (scale=1.0,origin=[0.5,0.5]) => { 
      var display=document.querySelector("#Display"); 
      var frame=document.querySelector("#Frame");
      var style=css.fit(css.rect(display),css.rect(frame)); 
      var styleSheet = style(scale,origin); 
      console.log(styleSheet); 
      Object.assign(display.style, styleSheet); 
  };
  var createDisplay = (tagName='video',src) => {

    var frame = document.querySelector('#Frame');
    var display = document.querySelector('#Display');

    //Clear #Frame
    if(display && display.remove) {
      display.remove();
    }
    display = document.createElement(tagName);
    display.id = "Display";


    //Append in DOM #Frame Element
    frame.appendChild(display);


    display.addEventListener("load", (e)=>{
      resizeDisplay()
      display.addEventListener("wheel",e=>{
        if(e.wheelDelta > 0) {
          var src=li.next();
        } else {
          var src=li.prev();
        }
        Screen(src);
      })
    });

    display.src=src;

    return display;
  }

  

  //New Video Display
  var Video = exports.Video = (src) => {
    var v=createDisplay('video',src);
    v.loop=true;
    v.playbackRate=0.65;
    v.volume=0.5
    v.autoplay=true;

    v.keyFrames = [[10.0, ()=>{ console.log('DONG!'); }]];

    var currentTime = function(e) {
      var time=v.currentTime;
      v.keyFrames.forEach(([keyTime,keyAction])=>{
        if(Math.abs(time-keyTime) <= 0.06)
          keyAction();
      });
      return setTimeout(currentTime, 50);
    }

    v.addEventListener('loadeddata', function(e){ console.log('loadeddata', e);  })
    v.addEventListener("seeked", function() { v.play(); }, true);
    v.addEventListener('loadedmetadata', function(e){
      console.log('loadedmetadata', e);
      resizeDisplay();
      //console.log("css.screen(v)", require('style').fit([e.target.naturalWith,e.target.naturalHeight], require('style').rect(Frame))());

    })
    //v.addEventListener("timeupdate",function(){ v.pause(); });
    v.addEventListener("playing", function(e) { v.timeout = currentTime(e); });
    v.addEventListener("pause", function(e){ if(v.timeout) { clearTimeout(v.timeout); } });
    return v;
  }
  var Img = exports.Img = async(src) => {
    var img=createDisplay('img',src);
    return img;
  }

  var Screen = exports.Screen = async(src) => {

    var url=new URL(src);

    var regex=/\.(w+)$/gi;
    //var ext=||'.jpg';
    var MapExt = {
      Video: ['.wbem','.mp4'],
      Image: ['.jpg','.jpeg','.gif','.png','.tif','.bmp','.ico']
    };

    if(MapExt.Video.some(ext=>url.pathname.toLowerString().endsWith(ext))) {
      var type='Video';
    } else {
      var type='Image';
    }
    
    var display=await create[type](src);
    
    return display;
  }

})
