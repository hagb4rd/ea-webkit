window.Imgur = (function() {
  var runkitUrl = "https://imgur-client-kwc5iikzmzbo.runkit.sh";
  var baseAPIUrl = "https://api.imgur.com/3";
  class Imgur {
    constructor(secret) {
      this.secret = secret||"";
      this.Authorization = null;
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
    getAlbums(username, page) {
      username = username||"me";
      if(page) {
        var p=`/${page}`;
      } else {
        var p="";
      };

      return this.API(`/account/${username}/albums${p}`)
        .then(res=>res.json());
    }
    async API(uri, body) {
      var init = {
        method: "GET",
        headers: await this.getHeaders()
      };

      if(body) {
        init.method = "POST";
        init.body = body;
      };

      return fetch(baseAPIUrl + uri, init)
        .then(res => res.json())
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
          .then(res => res.json())
          .then(res => res.request.headers.Authorization)
          .then(res => (this.Authorization=res, res));
      }
    }
  };
  return Imgur;
})();
