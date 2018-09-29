define(function(require,exports,module){

  var baseURL = 'https://api.github.com/gists';
  var defaultHeaders = [];

  var urlparse=(uri)=>{ 
    var url=new URL(uri); 
    url.id = url.pathname.split('/').pop(); 
    var filename=url.hash.slice(6).split(/-/gi); 
    var ext=filename.pop(); 
    url.filename=filename.join('-')+'.'+ext; 
    url.uri=uri; return url; 
  };



  var post = async(endpoint,body,headers=[])=>{
    var opts = {
      url:`${baseURL}url`,
      method:"POST",
      headers: defaultHeaders.concat(headers),
      body: body
    };
    var resp = await fetch(opts).then(resp=>resp.json());
    return resp;
  };

  var get = async(endpoint,query,headers=[])=>{
    var opts = {
      url:`${baseURL}url`,
      method:"GET",
      headers: defaultHeaders.concat(headers),
    };
    var resp = await fetch(opts).then(resp=>resp.json());
    return resp;
  }

  // https://gist.github.com/anonymous/499816fc316a6440461926b34282b9f0#file-result-md
  var info=exports.info=async(id)=>{
    var resp = await get(`/${id}`);
    return resp;
  }




})
