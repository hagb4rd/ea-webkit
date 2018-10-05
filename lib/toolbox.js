var loadScript=require('./loadscript');
var gist=require('./gist');
var {prettify}=require('ea-lib');
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
    
    
    
    var btnBookmarklet = document.querySelector('#_btnBookmarklet')||$.create('button',{id:'_btnBookmarklet',class:"btnBookmarklet", value:'create bookmarklet'});
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

    // add command to lazy-load keybinding_menu extension
    editor.commands.addCommand({
        name: "help",
        bindKey: {win: "Ctrl-Shift-h", mac: "Command-Alt-h"},
        exec: function(editor) {
            ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
                module.init(editor);
                editor.showKeyboardShortcuts()
            })
        }
    })
    editor.commands.addCommand({
        name: "minify",
        bindKey: {win: "Ctrl-Shift-m", mac: "Command-Alt-m"},
        exec: function(editor) {
            var {minify}=require('./uglify');
            var code=editor.session.toString();
            var minified=minfify(code).code;
            editor.session.setValue(minified);
            console.log('action: minify:\n','-----------\n',code);
        }
    })
    editor.commands.addCommand({
        name: "prettify",
        bindKey: {win: "Ctrl-Shift-p", mac: "Command-Alt-p"},
        exec: function(editor) {
            var code=editor.session.toString();
            var prettified=prettify(code);
            editor.session.setValue(prettified);
            console.log('action: prettify:\n','-----------\n',code);
        }
    })
    editor.commands.addCommand({
        name: "eval",
        bindKey: {win: "Ctrl-Shift-e", mac: "Command-Alt-e"},
        exec: function(editor) {
            var code=editor.session.toString();
            try { 
                var result=(0,eval)(code);
                console.log('action: eval (okay):\n','-----------\n',result);
            } catch(e) {
                console.log('action: eval (error):\n','-----------\n',e);
            }
            
        }
    })
    //editor.execCommand("help");


    
    var btn=document.querySelector('#bToolbox')||$.create('button',{id:'bToolbox',value:'toolbox',class:"btnToolbox"});
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
            color: "#2b4a8d",
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

    return {
        editor: editor,
        btnToolbox: btnToolbox,
        btnBookmarklet
    }
};