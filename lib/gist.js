define(function(require,exports,module){

  var baseURL = 'https://api.github.com';
  var defaultHeaders = [];

  var urlparse=(uri)=>{ 
    var url=new URL(uri); 
    url.id = url.pathname.split('/').pop(); 
    var filename=url.hash.slice(6).split(/-/gi); 
    var ext=filename.pop(); 
    url.filename=filename.join('-')+'.'+ext; 
    url.uri=uri; return url; 
  };



  var aututhorize = () => {

    /* Authorize Doc https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
    //---------------------------------------------------
    client_id	    string	Required. The client ID you received from GitHub when you registered.
    redirect_uri	string	The URL in your application where users will be sent after authorization. See details below about redirect urls.
    scope	string	A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
    state	string	An unguessable random string. It is used to protect against cross-site request forgery attacks.
    allow_signup	string	Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is true. Use false in the case that a policy prohibits signups.
    */
    //URL Sample  https://github.com/login/oauth/authorize?client_id=...&scope=user%20public_repo
    var query = {
      'client_id':'',
      redirect_id:'',
      scope:'',
      allow_signup:''
    };


  };

  var gists=(user)=>{
    
    
    var uri=`${baseURL}/users/${user}/gists`
  }
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
