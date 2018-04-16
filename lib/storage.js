var storage = (function(name) {
    
    name=name||"storage";

    var storage = window && window.localStorage || require("dirty")(__dirname+"/"+name+".db");  
    
    return {
        getItem: (s,obj)=>{
            return JSON.parse(storage.getItem(s));
        },
        setItem: (s)=>{
            storage.setItem(s, JSON.stringify(obj));
        }
    }
});