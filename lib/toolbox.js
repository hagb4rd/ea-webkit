var loadScript=require('./loadscript');
var gist=require('./gist');
var toolbox=module.exports=async(url,file)=>{
    url=url||'https://gist.github.com/hagb4rd/6843803a6674fe1b9ead6f1e60f14f15';
    file=file||'toobox.js';
    var defaultCode = $.bookmarklet.defaultCode;

        try {
            var _gist=await gist.file(url,file); 
            defaultCode = _gist.content;
        } catch(e) {
            console.log(e);
        }  



    var cdn = {
        '$': 'https://unpkg.com/ea-webkit@latest/dist/webkit.min.js',
        'requirejs':'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js',
        'ace':'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js',
        'hyperhtml':'https://unpkg.com/hyperhtml'
    };
    await loadScript(cdn['$']);
    await loadScript(cdn['ace']);
    console.log(Object.getOwnPropertyNames($));
    
    var UI=window.UI=$.create('div',{id: '_UI', class: 'center toolbox'})
    UI.toggle=function() {
        if(UI.style.display=='none') {
            UI.style.display='block';
        } else {
            UI.style.display='none';
        }
    }
    UI.toggle();
    document.body.append(UI);
    
    
    
    var btnBookmarklet = $.create('button',{id:'_btnBookmarklet',class:"btnBookmarklet", value:'create bookmarklet'});
    btnBookmarklet.innerHTML='create bookmarklet';
    UI.append(btnBookmarklet);
    
    
    var f=async()=>{ 
        var uri=new URL(location.href); 
        var url=uri.searchParams.get('url')||'https://gist.github.com/hagb4rd/6843803a6674fe1b9ead6f1e60f14f15'; 
        url=decodeURIComponent(url); 
        var file=uri.searchParams.get('file')||'toolbox.js'; 
        return (await gist.file(url,file)).content; 
    }


    var div=$.create('div',{id:'__editor',class:"editor"});
    div.innerHTML=$.escapeHTML(defaultCode);
    UI.append(div);
    
    var editor = window.editor = ace.edit("__editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    
    var btn=$.create('button',{id:'bToolbox',value:'toolbox',class:"btnToolbox"});
    btn.innerHTML='toolbox';
    document.body.append(btn);
    btn.addEventListener('click', e=>{
        UI.toggle()
    });

    btnBookmarklet.addEventListener('click', function () {
        debugger;
        var span = document.querySelector('#dragme') || document.createElement('span');
        span.id = 'dragme';
        var style = {
            display: "inline-block",
			border: "2px red solid",
			overflow: "hidden",
			height: "50px",
			width: "100%",
			margin: "auto",
			fontSize: "40px",
			lineHeight: "50px",
			verticalAlign: "middle"
        }
        Object.assign(span.style, style);
        var link = document.querySelector("#dragme a") || document.createElement("a");
        var code=editor.session.toString();
        console.log('code:\n',code)
        var href=$.bookmarklet(code);
        console.log('minified:\n',href);
        link.href = href;
        link.innerHTML = "drag-me-to-your-toolbar";
        span.appendChild(link);
        UI.appendChild(span);
        link.animate([{ left: '1500px', color: 'rgba(230,0,0,0)' }, { left: '40px', color: 'rgba(230,0,0,1)' }], { fill: 'forwards', duration: 500, iterations: 1, easing: 'ease-out' });
    });
};