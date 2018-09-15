var xorString = s => [...String(s)].reduce((prev, next) => prev ^= next.charCodeAt(0), 0xFF);
var loadScript=window.loadScript=module.exports=(url="")=>{
    if(!String(url).startsWith("http")) {
        url=`https://unpkg.com/${url}`;
    }
    return new Promise((resolve,reject)=>{
        var scriptId='mk'+xorString(url);
        var elem=document.querySelector('#'+scriptId);
        if(elem) {
            resolve();
        } else {
            elem = document.createElement('script');
            elem.id=scriptId;
            elem.setAttribute('async','');
            elem.addEventListener('load',(e)=>resolve());
            elem.addEventListener('error',(e)=>reject());
            elem.src=url;
            (document.body || document.rootElement || document).appendChild(elem);             
        }
    });
};