define(function(require,exports,module) {

  var position = exports.position = ([left,top,right,bottom]) => {
    var pos={ position: "absolute" };
    if(typeof(top) != 'undefined' && top != null) {
      pos.top = top;
    }
    if(typeof(right) != 'undefined' && right != null) {
      pos.right = right;
    }
    if(typeof(left) != 'undefined' && left != null) {
      pos.left = left;
    }
    if(typeof(top) != 'bottom' && bottom != null) {
      pos.bottom = bottom
    }
    return pos;
  }

  var translate = ([x,y]) => {
    return `translate(${x}%,${y}%)`
  }

  var transform = exports.translate = (opts) => {
    return ({ transform: Object.entries(opts).map(([fn, param])=>transform[fn](param)).join(' ') });
  }
  transform.translate = ([x,y]) => {
    return `translate(${x}%,${y}%)`
  }
  transform.scale = (z) => {
    return `scale(${z})`
  }

  var css = exports.css = (xss=[],obj={}) => {
    [...xss].forEach(style=>Object.assign(obj, style));
    return obj;
  }
  var rect = exports.rect = (target=document.body)=>[target.getBoundingClientRect().width, target.getBoundingClientRect().height]

  var fit = exports.fit = ([w,h],[parentWidth,parentHeight]) => (scale=1.0,origin=[0.5,0.5]) => { var aspectParent=(parentWidth/w)/(parentHeight/h); var aspect=(aspectParent<1?parentWidth/w:parentHeight/h); var width=(w*aspect*scale)|0; var height=(h*aspect*scale)|0; return { position:"absolute", top:`${((parentHeight*0.5)|0)-((height*origin[1])|0)}px`,left:`${((parentWidth*0.5)|0)-((width*origin[0])|0)}px`, width:`${width}px`, height:`${height}px`}; };

  var screen = exports.screen = (target,parent) => {
    target=target||document.querySelector("#Display");
    parent=parent||target.parentNode||document.querySelector("#Frame");
    return fit(rect(Display),rect(Frame));
    /*
    return css([
      {width: '100%'},
      position([`${x}%`,`${y}%`]),
      transform({
        translate:[-50,-50],
        scale: 1
      })
    ])
    /* */
  }
})
