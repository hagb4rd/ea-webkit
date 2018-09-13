/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

var require = (function() {

    var map = {
        webkit: 'http://unpkg.com/ea-webkit@latest/dist/webkit.min.js',
        github: 'https://unpkg.com/github-api/dist/GitHub.bundle.min.js',
        runkit: 'https://embed.runkit.com',
        moment: 'http://momentjs.com/downloads/moment.min.js',
        ace: 'http://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js',
        requirejs: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js',
        highlight: {
            url: 'cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js',
            shim: (exports, module) => {
                module.exports = window.highlight;
                module.exports.stylesheet='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai.min.css';
                var link=document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', module.exports.stylesheet);
                if(document && document.head) {
                    document.head.appendChild(link);
                }
            }
        }
    }

    var path=new Map(Object.entries(map));
    var modules=new Map();
    var fetchMap=new Map();
    var fetchCode=(moduleName)=> {
        if(path.has(moduleName)) {
            var mapped=path.get(moduleName);
            if(typeof(mapped)=="object") {
                module.url = mapped.url;
                module.shim = mapped.shim;
            } else {
                module.url=mapped;
            } 
        } else {
            module.url=moduleName;
            if(typeof(shim)=='function') {
                module.shim=shim;
            };
        }
        if(!fetchMap.has(moduleName)) {
            var promisedModuleCode = fetch(module.url).then(resp=>resp.text());
            fetchMap.set(moduleName, promisedModuleCode);
        }
        var code = await fetchMap.get(moduleName);
        return `(async function(require, exports, module, window, document, console) {
            ${code}
          })`;
    }
    
    var require = async(moduleName,shim) => {
    
        if(!modules.has(moduleName)) {
            var module={ exports:{}, shim: null, url: {} };
            var code  = await fetchCode(moduleName);
            var iife=eval();
            var window=window || {document:{}};
            iife(require,module.exports,module,window,window.document,console);
            
            if(module.shim) {
                
                if(typeof(module.shim)=='function') {
                    var window=window || {};
                    module.shim(module,module.exports);
                } else if(typeof(module.shim)=='string') {
                    module.exports=window[module.shim];
                }
            }
            modules.set(moduleName, module);
        } 
        return modules.get(moduleName).exports;
    };
    require.path = path;
    require.modules = modules;
    require.fetchMap = fetchMap;
    return require;
})();
