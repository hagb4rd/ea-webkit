var {minify}=require('../uglify');


var defaultCode=`var main=async()=>{
	try {
		var cdn = {
			'$': 'https://unpkg.com/ea-webkit@latest/dist/webkit.js',
			'requirejs':'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js',
			'ace':'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js'
		};
		await loadScript(cdn['$']);
		await loadScript(cdn['hyperhtml']);
		console.log(Object.getOwnPropertyNames($).sort($.cmp.locale));
	} catch (e) {
		console.log(e)
  }
  //creates this bookmarklet editor :o 
	$.toolbox();
};
main().catch(console.log);`

var template=(code=defaultCode)=>`(function() { 
  function xorString(s){ return [...String(s)].reduce((prev, next) => prev ^= next.charCodeAt(0), 0xFF) };
  function loadScript(url){
    return new Promise((resolve,reject)=>{
        var id='mk'+xorString(url);
        var elem=document.querySelector('#'+id);
        if(elem) {
            resolve(elem);
        } else {
              elem = document.createElement('script');
              elem.setAttribute('async','');
              elem.src=url;
              elem.id=id;
              elem.addEventListener('load',(e)=>resolve(e));
              elem.addEventListener('error',(e)=>reject(e));
        }
        (document.head || document.getElementsByTagName('head')[0] || document.documentElement).appendChild(elem);             
    })
  };
  ${code}		
})()`;

var bookmarkletURL=module.exports=(code)=>{



	//var base64encoded=btoa(template(code));
  //var dataURL=`data:application/javascript;data:application/javascript;base64,${base64encoded}`;
  //var href = `javascript:(function(){var s=document.createElement("script");s.src="${dataURL}";document.body.append(s)})()`

  var href = `javascript:(function(){${minify(template(code)).code}})();`;
	
	return href;
}
bookmarkletURL.template=template;
bookmarkletURL.minify=minify;
bookmarkletURL.defaultCode = defaultCode;