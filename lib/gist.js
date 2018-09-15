//var serialize = require('serialize-javascript');
var mimeTypes = require('mime-types'),
  //request = require("request"),
  //rp = require('request-promise'),
  qs = require('querystring'),
  URL = require('url'),
  util = require('util');
  //beautify = require('js-prettify');


var serialize=(o)=>String(o);
var beautify=(o)=>o;
var prettify=beautify;
//var fetch = require("node-fetch");
//var prettify=require('js-prettify')

// filenames is an array, options is an object of command line options.
var gist = {};

var cfg={env:{}};

var CLIENT_ID=cfg.env["github_client_id"]||"";
var CLIENT_SECRET="";cfg.env["github_client_secret"]||"";
var TOKEN=cfg.env["github_token"]||"";


if(typeof(localStorage)!='undefined') {
    var clientId=localStorage.getItem('github_client_id');
    var token=localStorage.getItem('github_token');
    if(clientId)
        gist.setClientId(clientId);
    if(token)
        gist.setToken(token);
}





var baseURI = 'https://api.github.com/gists';
var defaultHeaders = () => { 
  var headers={
    ["User-Agent"]: "jSlave"
  };
        
  if(TOKEN) {
    headers["Authorization"] = `token ${TOKEN}`;
  }
  return headers;
}

gist.setToken=(token)=>{
    TOKEN=token;
    if(typeof(localStorage)!='undefined') {
        localStorage.setItem('github_token',token);
    }
}
gist.setClientId=(clientId)=>{
    CLIENT_ID=clientId;
    if(typeof(localStorage)!='undefined') {
        localStorage.setItem('github_client_id',clientId);
    }
}



var extractId=gist.extractId=(s)=>{
  var regexp=/[a-f0-9]{10,}/g
    var match=String(s).match(regexp);
    if(match && match.length) {
      var id = match[0];
      return id;  
    }
};

var extractFileName=gist.extractFileName=(url)=>{ 
    var temp = (url.split('/')).pop().split("#file-")
    var id = temp[0];
    if(temp.length>1) {
      var extOffset = temp[1].lastIndexOf("-");
      fileName = temp[1].slice(0,extOffset) + "." + temp[1].slice(extOffset+1);	
    }
    return fileName;
}; 

  
var urlparse=(uri)=>{ 
  var url=new URL(uri); 
  url.id = url.pathname.split('/').pop(); 
  var filename=url.hash.slice(6).split(/-/gi); 
  var ext=filename.pop(); 
  url.filename=filename.join('-')+'.'+ext; 
  url.uri=uri; return url; 
};



var post = async(endpoint,payload,headers={})=>{
  
  var data=new FormData();
  body.append('json',JSON.stringify(payload));
  
  var opts = {
    method:"POST",
    headers: Object.assign({},defaultHeaders(),headers),
    body: data
  };
  var resp = await fetch(`${baseURI}${endpoint}`,opts).then(resp=>resp.json());
  return resp;
};

var get = async(endpoint,query,headers=[])=>{
  var opts = {
    method:"GET",
    headers: Object.assign({},defaultHeaders(),headers),
  };
  var resp = await fetch(`${baseURI}${endpoint}`,opts).then(resp=>resp.json());
  return resp;
}

// https://gist.github.com/anonymous/499816fc316a6440461926b34282b9f0#file-result-md
var info=gist.info=async(id)=>{
  id=extractId(id);
  var resp = await get(`/${id}`);
  return resp;
}

//*
var getToken=gist.getToken=async(clientId=CLIENT_ID,clientSecret=CLIENT_SECRET)=>{
  var baseUrl='https://api.github.com';
  var opts = {
    method: 'PUT',
    headers: defaultHeaders(),
    body: {
      ['client_secret']: clientSecret,
      scopes: ['user','public_repo','gists']
    }
  };
  var resp=await fetch(`${baseUrl}/authorizations/clients/${clientId}`,opts).then(resp=>resp.json());
  return resp;
}
//var TOKEN=exports.TOKEN=getToken();
/* */



var Gist = class Gist {
  constructor(opts) {
    opts=opts||{};
    this.id = "";
    this.data = undefined;
    //this.title = opts.title || (new Date()).toString();
    this.description = opts.description || (new Date()).toString();
    this.public = opts.public || false;
    this.files = opts.files || {};
  }
  file(content, title, mime) {
    title=title||Date.now() + ".md";
    mime=mime|| mimeTypes.lookup(title);
    this.files[title]= { content: content, type: mime };
  }

  static async paste(content, title, mime) {
    var gist = new Gist();
    gist.file(content, title, mime);
    await gist.post();
    return Gist.links(gist.id).html;
  }
  static links(id) {
    id=extractId(id);
    var url = {};
    url["id"] = id;
    url["html"] = ` https://gist.github.com/${id} `;
    url["json"] = ` https://api.github.com/gists/${id} `;
    url["edit"] = ` http://hagb4rd.gizmore.org/edit/index.html#load=${id} `
    return url;
  }
  static async info(idString) {
    var gistInfo=await info(idString);
    return gistInfo;
  }
  
  async post() {
    var payload = {
      description: this.description,
      public: this.public,
      files: this.files
    };
    var resp = await post(`/gists?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,payload);
    /*
    var requestOptions = {
      method: "POST",
      url: `https://api.github.com/gists?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      headers: {
        "User-Agent": "jSlave",
        "Authorization": `token ${TOKEN}`
      },
      json: payload
    };
    var p = new Promise(resolve=>{
      request.post(requestOptions, (err,resp) => {
        resolve(resp)
      })
    });
    var resp = await p;
    */
    if(resp && resp.body && resp.body.id) {
      this.id = resp.body.id; 
      this.data = resp.body;
      return this.data;
    } else {
      throw new Error('posting gist failed.');
    }
  }
}


// GIST Basic Templates
// --------
gist.escape = s => {
  s = s || "";
  var regex = /[<>\|\*\(\)\[\]\!`]{1}/g;
  return s.replace(regex, (a, b, c) => {
    var chr = a.charCodeAt(0);
    return `&#${chr};`;
  });
};
gist.rn = () => "\r\n";
gist.br = s => gist.rn() + s + gist.rn();
gist.hr = () => gist.br("- - -");
gist.link = (href, title) => {
  href = href || "";
  title = title || href;
  return " [" + title + "](" + href + ") "
}
gist.inline = s => "`" + gist.escape(s) + "`";
gist.code = (code, lang) => {
  code = code || "";
  lang = lang || "";
  return gist.br("```" + lang) + code + gist.br("```");
}
gist.img = (src, title) => {
  src = src || "";
  title = title || "image";
  return "![" + title + "](" + src + ")"
};
gist.imglink = (href, src) => gist.link(href, gist.img(src));
//google image search result
gist.image = function (item) {
  var p = [];
  var title = p[0] = '\n[' + item.title + '](http://hagb4rd.gizmore.org/gallery/slideshow.html?img=' + encodeURIComponent(item.link) + ')\n';
  //var img   = p[1] = "\n[![" + item.title + "](" + item.image.thumbnailLink + ")]("+ item.link +")\n"; 
  var img = p[1] = gist.br(gist.img(item.link, item.title));
  "![" + item.title + "](" + item.link + ")\n";
  var json = p[2] = gist.code(beautify(JSON.stringify(item)));
  return p.join("\r\n");
}





gist.paste = async(text, name, description) => {
  var gist=new Gist({description: description});
  gist.file(text,name);
  var resp=await gist.post();
  return Gist.links(gist.id).html;
};
gist.edit = async function edit(o) {
  /*
  if(typeof(o) == "object") {
    
    Function.prototype.inspect = function() { return this.toString( )};
    
    var protoChain = [o];
    while(o.__proto__) {
      protoChain.push(o.__proto__);
      o = o.__proto__
    }
    
    var text = beautify(util.inspect(protoChain, {showHidden: true, colors: false, depth: null }));   
    
  } else if(typeof(o) == "function") {
   var text = beautify(text.toString());
  } else if (typeof(o) == "string") {
    var text = o;
  } else {
    var text = String(o);
  }
  */
  var text = beautify(serialize(o));

  var link = await Gist.paste(text, String(Date.now()) + ".js");
  var id = extractId(link);
  var links = {
    raw: (id => `https://gist.githubusercontent.com/anonymous/${id}/raw/`)(id),
    //github: link,
    edit: (id => ` http://hagb4rd.gizmore.org/edit/index.html#load=${id}`)(id)
  };
  return links.edit;
};
gist.fetch = async(link) => {
  var base='https://api.github.com/gists';
  var id = extractId(link);
  var fileName = extractFileName(link);
  var g=await fetch(`${base}/${id}`).then(resp=>resp.json);
  Object.defineProperty(g,'filenames', { get: ()=>Object.keys(g.files) });
  Object.defineProperty(g,'file', { get: ()=>{ fileName=fileName||g.filenames[0]; return g.files[fileName]; }});
  return g;
}

gist.file = (filepath) => {
  var path = admin().require("path");
  return util.promisify(admin().fs.readFile)(filepath, {
    encoding: "utf-8"
  }).then(str => gist.paste(str, path.basename(filepath))).then(url => {
    var split = url.split("/");
    var id = split[split.length - 1];
    return {
      raw: url,
      edit: ` http://hagb4rd.gizmore.org/edit/index.html#load=${id} `
    };
  }).then(({
    edit,
    raw
  }) => ` gist: ${raw} | edit: ${edit} `)
};






function GistFile(text, title, description, template) {
  if (!text) {
    throw new TypeError('GistFile Constructor: Missing Parameter');
  } else {
    this.text = text;
  }
  if (description)
    this.description = description;
  if (title)
    this.title = title;
  if (template)
    this.template = template;
}
GistFile.prototype.description = Date.now().toString();
GistFile.prototype.title = Date.now() + ".md";
GistFile.prototype.public = false;
GistFile.prototype.template = gist.br("# $$tittle$$ ") + gist.code("$$text$$", "js");
GistFile.prototype.toString = function (dictionary) {
  var self = this;
  var output = this.template;
  Object.keys(GistFile.prototype).forEach(function (key, i) {
    output = output.replace('$$' + key + '$$', self[key]);
  });
  if (dictionary) {
    Object.keys(dictionary).forEach(function (key, i) {
      output = output.replace('$$' + key + '$$', dictionary[key]);
    })
  };
  return output;
};



function render(template, dictionary) {
  var output = this.template;
  Object.keys(GistFile.prototype).forEach(function (key, i) {
    output = output.replace('$$' + key + '$$', self[key]);
  });
  if (dictionary) {
    Object.keys(dictionary).forEach(function (key, i) {
      output = output.replace('$$' + key + '$$', dictionary[key]);
    })
  };
  return output;
}


/**
 * Pastes GistFiles to GISTHUB
 * 
 * @param {[GistFile]} Array of GistFiles
 * @returns {string} Gist URL
 */
/*
function gistpaste(text, title, description, public) {

  return new Promise(function (resolve, reject) {
    if (text.length < 1)
      reject(Error("textlength must be > 0"));

    var gistFile = new GistFile(text, title, description);


    var payload = {
      description: gistFile.description,
      public: public || false,
      files: {}
    };

    payload.files[gistFile.title] = {
      content: gistFile.render()
    };
    description = gistFile.description;

    //done(null, { payload: payload });

    var opt = {
      method: 'POST',
      url: "https://api.github.com/gists",
      headers: {
        "User-Agent": "jslave"
      },
      json: payload
    };

    rp(opt).then(function (response) {
      var blocks_url = '';
      var url = URL.parse(response.body.html_url)
      var result = URL.format(url);
      resolve(result);
    });
  });
};
*/

gist.stringify = async(object) => `http://jslave.herokuapp.com/gist/${gist.extractId(await Gist.paste(prettify(JSON.stringify(object)),'list.json'))}/list.json`;

gist.Gist = Gist;

module.exports = gist;