define(function(require,exports,module) {
  const runkitUrl = "https://imgur-client-kwc5iikzmzbo.runkit.sh";
  const baseAPIUrl = "https://api.imgur.com/3";

  const credentials = {
    "CLIENT_ID":"117557a7f9f1073",
    "secret":""
  }

  var UI = {
    authorize: {
      url: ()=>`https://api.imgur.com/oauth2/authorize?client_id=${credentials["CLIENT_ID"]}&response_type=token&state=APPLICATION_STATE`
      }
  }

  class ImgurClient {
    constructor(secret) {
      this.secret = secret||"";
      this.Authorization = null;
      this.disableCache = true;
    }
    runkitAlbum(albumId) {
      albumId=albumId||"sn9W2";
      return fetch(`${runkitUrl}/?secret=${this.secret}&album=${albumId}`);
    }
    getImages(albumId) {
      if(albumId) {
        return this.API(`/album/${albumId}/images`)
          .then(res=>res.data);
      } else {
        return this.API('/account/me/images')
          .then(res=>res.data);
      }
    }
    async getAlbums(username, page) {
      username = username||"me";
      if(page) {
        var p=`/${page}`;
      } else {
        var p="";
      };

      var resp = await this.API(`/account/${username}/albums${p}`);
      if(resp.success) {
        return resp.data;
      } else {
        throw new Error(JSON.stringify(resp))
      } 
    }
    uploadImage(url, options) {
        var options=options||{};
        var post = {
            image: url,
            type: "URL"
        };
        if(options.album)
            post.album = options.album;
        if(options.title)
            post.title = options.title;
        if(options.description)
            post.description = options.description;
        if(options.name)
            post.name = options.name;

        return this.API("/image", post);
    }
    async API(uri, body) {
      var init = {
        method: "GET",
        headers: await this.getHeaders()
      };

      if(body) {
        init.method = "POST";
        init.body = JSON.stringify(body);
        init.headers.append("Content-Type", "application/json");
      };

      var cacheKey = "imgur:/"+uri;
      if(!this.disableCache && (localStorage.getItem(cacheKey))) {
        return await JSON.parse(localStorage.getItem(cacheKey));
      }

      return fetch(baseAPIUrl + uri, init)
        .then(res => {
          var jsonString = (typeof res !== "string"?JSON.stringify(res):res);
          localStorage.setItem(cacheKey, jsonString);
          return res;
        }).then(res => res.json())
    }

    async getHeaders() {
      var headers = new Headers();
      var bearer = await this.getAuthorization();
      headers.append("Authorization", bearer);
      return headers;
    }

    getAuthorization() {
      if(this.Authorization) {
        return Promise.resolve(this.Authorization);
      } else {
        return fetch(`${runkitUrl}/?secret=${this.secret}&album=sn9W2`)
          .then(resp => resp.json())
          .then(resp => resp.request.headers.Authorization)
          .then(resp => (this.Authorization=resp, resp));
      }
    }
  };

var client;


  class ImgurImage {
    constructor(opts) {

    }
    fromImgur(opts) {
      var image = new ImgurImage();
      opts = opts||{};
      image["id"] = opts["id"]; 
      image["title"] = opts["title"]; 
      image["description"] = opts["description"]; 
      image["datetime"] = opts["datetime"]; 
      image["type"] = opts["type"]; 
      image["animated"] = opts["animated"]; 
      image["width"] = opts["width"]; 
      image["height"] = opts["height"]; 
      image["size"] = opts["size"]; 
      image["views"] = opts["views"]; 
      image["bandwidth"] = opts["bandwidth"]; 
      image["vote"] = opts["vote"]; 
      image["favorite"] = opts["favorite"]; 
      image["nsfw"] = opts["nsfw"]; 
      image["section"] = opts["section"]; 
      image["account_url"] = opts["account_url"]; 
      image["account_id"] = opts["account_id"]; 
      image["is_ad"] = opts["is_ad"]; 
      image["in_most_viral"] = opts["in_most_viral"]; 
      image["has_sound"] = opts["has_sound"]; 
      image["tags"] = opts["tags"]; 
      image["ad_type"] = opts["ad_type"]; 
      image["ad_url"] = opts["ad_url"]; 
      image["in_gallery"] = opts["in_gallery"]; 
      image["deletehash"] = opts["deletehash"]; 
      image["name"] = opts["name"]; 
      image["link"] = opts["link"]; 
      return image;
    }
    toImgurObject() {
      var json = {};
      json["id"] = this["id"]; 
      json["title"] = this["title"]; 
      json["description"] = this["description"]; 
      json["datetime"] = this["datetime"]; 
      json["type"] = this["type"]; 
      json["animated"] = this["animated"]; 
      json["width"] = this["width"]; 
      json["height"] = this["height"]; 
      json["size"] = this["size"]; 
      json["views"] = this["views"]; 
      json["bandwidth"] = this["bandwidth"]; 
      json["vote"] = this["vote"]; 
      json["favorite"] = this["favorite"]; 
      json["nsfw"] = this["nsfw"]; 
      json["section"] = this["section"]; 
      json["account_url"] = this["account_url"]; 
      json["account_id"] = this["account_id"]; 
      json["is_ad"] = this["is_ad"]; 
      json["in_most_viral"] = this["in_most_viral"]; 
      json["has_sound"] = this["has_sound"]; 
      json["tags"] = this["tags"]; 
      json["ad_type"] = this["ad_type"]; 
      json["ad_url"] = this["ad_url"]; 
      json["in_gallery"] = this["in_gallery"]; 
      json["deletehash"] = this["deletehash"]; 
      json["name"] = this["name"]; 
      json["link"] = this["link"]; 
      return json;
    }
    toJSON() {
      return JSON.stringify(this.toImgurObject())
    }


  };


  class ImgurAlbum {
    constructor(opts,imgurClient) {
      opts = opts||{};
      this.client = imgurClient||client;
      this.id = opts.id;  
      this.title = opts.title;  
      this.description = opts.description;  
      this.datetime = opts.datetime;  
      this.cover = opts.cover;  
      this.cover_width = opts.cover_width;  
      this.cover_height = opts.cover_height;  
      this.account_url = opts.account_url;  
      this.account_id = opts.account_id;  
      this.privacy = opts.privacy;  
      this.layout = opts.layout;  
      this.views = opts.views;  
      this.link = opts.link;  
      this.favorite = opts.favorite;  
      this.nsfw = opts.nsfw;  
      this.section = opts.section;  
      this.images_count = opts.images_count;  
      this.in_gallery = opts.in_gallery;  
      this.is_ad = opts.is_ad;  
      this.deletehash = opts.deletehash;  
      this.order = opts.order;  

      this.images = [];
    }
    static fromImgur(opts) {
      var album = new ImgurAlbum(opts);
      opts = opts || {};
      album.id = opts.id;  
      album.title = opts.title;  
      album.description = opts.description;  
      album.datetime = opts.datetime;  
      album.cover = opts.cover;  
      album.cover_width = opts.cover_width;  
      album.cover_height = opts.cover_height;  
      album.account_url = opts.account_url;  
      album.account_id = opts.account_id;  
      album.privacy = opts.privacy;  
      album.layout = opts.layout;  
      album.views = opts.views;  
      album.link = opts.link;  
      album.favorite = opts.favorite;  
      album.nsfw = opts.nsfw;  
      album.section = opts.section;  
      album.images_count = opts.images_count;  
      album.in_gallery = opts.in_gallery;  
      album.is_ad = opts.is_ad;  
      album.deletehash = opts.deletehash;  
      album.order = opts.order;  
      return album;
    }
    toJSON() {
      var imgur = this.toImgurObject();
      imgur.images = this.images;
      return JSON.stringify(imgur);
    }
    toImgurObject() {
      var json = {};
      json.id = this.id;  
      json.title = this.title;  
      json.description = this.description;  
      json.datetime = this.datetime;  
      json.cover = this.cover;  
      json.cover_width = this.cover_width;  
      json.cover_height = this.cover_height;  
      json.account_url = this.account_url;  
      json.account_id = this.account_id;  
      json.privacy = this.privacy;  
      json.layout = this.layout;  
      json.views = this.views;  
      json.link = this.link;  
      json.favorite = this.favorite;  
      json.nsfw = this.nsfw;  
      json.section = this.section;  
      json.images_count = this.images_count;  
      json.in_gallery = this.in_gallery;  
      json.is_ad = this.is_ad;  
      json.deletehash = this.deletehash;  
      json.order = this.order;  
      return json;
    }

    async loadImages() {
      var xs = await this.client.getImages(this.id);
      this.images = xs.map(x=>ImgurImage.fromImgur(x));
      this.map  = new Map(images.map(x=>[x.id,x]));
      return this.images;
    }

    async list() {
      if(!this.images.length) {
        return await this.loadImages();
      } else {
        return await this.images
      }
    }
  };

  module.exports = {
    credentials: credentials,
    UI: UI,
    get client() {
        if(!credentials.secret) {
         throw Error("missing require('imgur.runkit.js').credentials.secret"); 
        }
        if(!client) {
          client=new ImgurClient(credentials.secret);
        }
        return client;
    },
    ImgurAlbum: ImgurAlbum,
    ImagurImage: ImgurImage
  }
});
