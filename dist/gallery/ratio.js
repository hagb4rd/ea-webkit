define(function(require, exports, module) {
    var rect = exports.rect = (target=document.body)=>[target.getBoundingClientRect().width, target.getBoundingClientRect().height]
    
    var fit = exports.fit = ([w,h],[parentWidth,parentHeight])=>(scale=1.0,origin=[0.5,0.5])=>{
        var aspectParent = (parentWidth / w) / (parentHeight / h);
        var aspect = (aspectParent < 1 ? parentWidth / w : parentHeight / h);
        var width = (w * aspect * scale) | 0;
        var height = (h * aspect * scale) | 0;
        return {
            position: "absolute",
            top: `${((parentHeight * 0.5) | 0) - ((height * origin[1]) | 0)}px`,
            left: `${((parentWidth * 0.5) | 0) - ((width * origin[0]) | 0)}px`,
            width: `${width}px`,
            height: `${height}px`
        };
    };
    var ratio = exports.ratio = (child,parent,zoom=1)=>{
        parent = parent || child.parentNode || document.body;
        child = rect(child);
        parent = rect(parent);

        var p = {
            w: parent[0],
            h: parent[1]
        }
          , c = {
            w: child[0],
            h: child[1]
        }
          , side = (~((p.w / p.h) - (c.w / c.h)) ? 'h' : 'w')
          , ratiofit = p[side] / c[side]
          , ratiow = p.w / c.w
          , ratioh = p.h / c.h;
        return {
            fitWidth: {
                ratio: ratiow,
                w: (zoom * ratiow * c.w) | 0,
                h: (zoom * ratiow * c.h) | 0
            },
            fitHeight: {
                ratio: ratioh,
                w: (zoom * ratioh * c.w) | 0,
                h: (zoom * ratioh * c.h) | 0
            },
            fit: {
                ratio: ratiofit,
                w: (zoom * ratiofit * c.w) | 0,
                h: (zoom * ratiofit * c.h) | 0
            }
        }
    }
})
