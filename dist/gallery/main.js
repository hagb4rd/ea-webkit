define(function(require, exports, module) {



    var webkit = require('webkit');

    var iter = require('iter')

    var resize = () =>{ require('display').resizeDisplay(); };


    Object.assign(window, w = webkit, lib = webkit.lib);
    EventTarget.prototype.on = EventTarget.prototype.addEventListener;

    var v,{Video,Img,Screen} = window.v = require('display');


    //load playlist
    var load=window.load=async(url='')=>{
      if(typeof(url)=='string') {
        var json=await fetch(url)
          .then(resp=>resp.json())
      } else {
        var json=url;
      }
      var li=await iter(json)
          .then(list=>(window.li=list,list))
          .then(li=>{
            var controls = {
              next: () => {
                try {
                  if(li && li.items && li.items.length) {
                    var src=li.next();
                    v = Screen(src);
                    console.log(src);
                  }
                } catch(e) {
                  console.log(e);
                  controls.next();
                }
              },
              prev: () => {
                try {
                  if(li && li.items && li.items.length) {
                    var src=li.prev();
                    v = Screen(src);
                    console.log(src);
                  }
                } catch(e) {
                  console.log(e);
                  controls.prev();
                }
              },
              random: () => {
                try {
                  if(li && li.items && li.items.length) {
                    var src=li.random();
                    v = Screen(src);
                    console.log(src);
                  }
                } catch(e) {
                  console.log(e);
                  controls.random();
                }
              },
              togglePlay: () => {
                if(v.play) {
                  if(v.paused) {
                    v.play();
                  } else {
                    v.pause();
                    console.log(v.currentTime);
                  }
                }
              },
              faster: () => {
                if(v.playbackRate) {
                  v.playbackRate += 0.05;
                  console.log(v.playbackRate);
                }
              },
              slower: () => {
                if(v.playbackRate) {
                  v.playbackRate -= 0.05;
                  console.log(v.playbackRate);
                }
              }
            };
            controls.random();
            return controls;
            })
            .then(controls => {
                window.document.addEventListener("keypress", (e)=>{
                  console.log(e);
                  with(controls) {
                      if (e.code == 'Period') {
                          next();
                      }
                      if (e.code == 'Comma') {
                          prev();
                      }
                      if (e.key == '/') {
                          random();
                      }
                      if (e.key == ' ') {
                          togglePlay();
                      }
                      if (e.key == '[') {
                          slower();
                      }
                      if (e.key == ']') {
                          faster();
                      }
                  }
                })
                window.onresize=resize;
            })
            .catch(e=>console.log(e));
    };

    var pls=window.pls=[
        'https://gist.githubusercontent.com/hagb4rd/9722842af242c7a7355a81d9d498f27a/raw/82ff42cf09c4dd54efe28c6741520b6758f551f0/test1.json'
    ];
    load(pls[0]);
});
