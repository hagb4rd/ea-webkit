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
    
    
    var div=$.create('div',{id:'editor',class:"editor"});
    UI.append(div);
    
    var editor = window.editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    
    var btn=$.create('button',{id:'bToolbox',value:'toolbox',class:"btnToolbox"});
    btn.innerHTML='toolbox';
    document.body.append(btn);
    btn.addEventListener('click', e=>{
        UI.toggle()
    });
    
};