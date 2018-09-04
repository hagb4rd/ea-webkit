var $ = module.exports = function $(container, selector) {
    const els =
      typeof selector === 'string'
        ? container.querySelectorAll(selector)
        : typeof container === 'string' ? document.querySelectorAll(container) : [container];
  
    const fns = {
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