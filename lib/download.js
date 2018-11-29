module.exports=async(text, filename="text") => {
    filename=filename||lib.UUID()
    var element = document.createElement('a');
    
    if(typeof(text)=='object'){
      if(!filename.endsWith('json'))
        filename+=".json";
      text=lib.json.stringify(text);
    }
    
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}