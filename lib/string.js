var escapeHtml=exports.escapeHtml=(templateData)=>{
    var s = templateData[0];
    for (var i = 1; i < arguments.length; i++) {
      var arg = String(arguments[i]);
  
      // Escape special characters in the substitution.
      s += arg.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
  
      // Don't escape special characters in the template.
      s += templateData[i];
    }
    return s;
  }
  
  var test=escapeHtml.test=(bonk)=>escapeHtml`<p>${bonk.sender} sent you a bonk.</p>`;
  var help=escapeHtml.help=test({sender: "Hacker Steve <script>alert('xss');</script>"});




    
    
    
    
  var findDescriptor=(o,name)=>{
    

    //descritor in prototype chain
    if(name in o) {
        //walking up, starting with the instance o
        var chain=[];
        var proto=o;
        var depth=0;
        
        while(proto!=null) {
            
            var names=Object.getOwnPropertyNames(proto);
            var descriptors=names.map(name=>([k,Object.getOwnPropertyDescriptor(proto, name),proto]));
            chain.push(descriptors);
            

            proto=Object.getPrototypeOf(proto);
        }
    }

  }

  var properties=(o)=>{

  };