//Cubic Bezier:

var {defineProperty, entries, keys} = Object.prototype;
var {some,every,map,concat,forEach} = Array.prototype;

function Bezier(a,b) { this.A = Array.isArray(a) && a.length==2 ? a :    ["0"]=a[0]; this["1"]=b[0]; this["2"]=a[2];   var {"ease":".25,.1,.25,1","linear":"0,0,1,1","ease-in":".42,0,1,1","ease-out":"0,0,.58,1","ease-in-out":".42,0,.58,1","popup":".22,.9,0,1.01"}