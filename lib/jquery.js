var $ = module.exports = function $(container, selector) {
    const els =
      typeof selector === 'string'
        ? container.querySelectorAll(selector)
        : typeof container === 'string' ? document.querySelectorAll(container) : [container];
  
    const fns = {
      map(fn) {
        fn=(x=>x)
        return [...els].map(fn);
      },
      attr(...attributes) {
        els.forEach(el=>{
          var attribs=Object.assign.apply(null, [...{}, ...attributes]);
          Object.entries(attribs).forEach(([k,v])=>{
            if(v===null || v===false) {
              el.removeAttribute(k);
            } else if (v===true) {
              el.setAttribute(k,'');
            } else if (typeof(v)=='function') {
                el.setAttribute(k, v(el));
            } else {
              el.setAttribute(k,v);
            }
          })
        })
        return this;
      },
    
      removeClass(...cls) {
        els.forEach(el => {
          el.classList.remove(...cls);
        });
        return this;
      },
      addClass(...cls) {
        els.forEach(el => {
          el.classList.add(...cls);
        });
        return this;
      },
      toggleClass(cls, b) {
        els.forEach(el => {
          el.classList.toggle(cls, b);
        });
        return this;
      },
      on(type, cb, opts) {
        els.forEach(el => {
          el.addEventListener(type, cb, opts);
        });
        return this;
      },
      off(type, cb, opts) {
        els.forEach(el => {
          el.removeEventListener(type, cb, opts);
        });
        return this;
      },
      attr(attributes) {
        els.forEach(elem => {
          Object.entries(attributes).forEach(([k,v])=>{
            elem.setAttribute(k,v);
          })
        });
        return this;
      },
      css(...props) {
      var style = {};
      props.forEach(prop=>Object.assign(style, prop));
            els.forEach(el => {
              Object.assign(el.style, style);
            });
            return this;
      },
    };
    return new Proxy(els, {
      get(targ, k) {	
        return els[k] || fns[k];
      },
    });
  }