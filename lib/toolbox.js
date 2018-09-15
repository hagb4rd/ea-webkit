var loadScript=require('./loadscript');
var toolbox=module.exports=async()=>{
    var cdn = {
        '$':'https://iis/lib/webkit/webkit.min.js',
        'webkit': 'https://unpkg.com/ea-webkit@latest/dist/webkit.min.js',
        'requirejs':'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js',
        'ace':'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js',
        'hyperhtml':'https://unpkg.com/hyperhtml'
    };
    await loadScript(cdn['$']);
    await loadScript(cdn['hyperhtml']);
    await loadScript(cdn['ace']);
    console.log(Object.getOwnPropertyNames($));
    var css = { 
        center: { 
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto"
        },
        btn: {
          position: "fixed",
          top: "5px",
          left: "5px",
          zIndex: 900,
        },
        UI: {
            width: "95%",
            height: "740px",
            zIndex: 10
        },
        editor: { 
            position: "relative",
            width: "100%",
            height: "700px"
        },
        hidden: {
            display: "none"
        }
    };
    var UI=window.UI=$.create('div',{id: 'UI'})
    UI.toggle=function() {
        this.classList.toggle('hidden');
        if(this.classList.contains('hidden')) {
            this.style=Object.assign({},css.center,css.UI,css.hidden);
        } else {
            this.style=Object.assign({},css.center,css.UI);
        }
    }
    UI.toggle();
    document.body.append(UI);
    
    
    
    var btnBookmarklet = $.create('button',{id:'createBtn',value:'create bookmarklet'});
    UI.append(btnBookmarklet);
    btnBookmarklet.style=Object.assign({},{
        border: "2px outlet grey",
        textAlign: "center",
        fontWeight: "bolder",
        width: "100%",
        height: "28px",
    });
    
    
    var div=$.create('div',{id:'editorContainer'});
    div.style=Object.assign({},css.editor);
    UI.append(div);
    
    var editor = window.editor = ace.edit("editorContainer");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    
    var btn=$.create('button',{id:'bToolbox',value:'toolbox'});
    btn.style=Object.assign({},css.btn);
    document.body.append(btn);
    btn.addEventListener('click', e=>{
        UI.toggle()
    });
    
};