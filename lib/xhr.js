

module.exports = class XHR extends XMLHttpRequest {
    constructor(options){
        super();
        options = options || {};
        Object.assign(this, options);

    }
    send(method, url, options) {
        options = options || {};
        Object.assign(this, options);
        return new Promise((resolve, reject) => {

            this.onload = function() {
                resolve(this.response);
            };
            this.onerror = function(e) {
                reject(e)
            };
            this.open(method, url);
            this.send();
        })
    }
    static get(url, options) {
        var xhr = new Xhr(options);
        return xhr.send("GET", url);
    }
    static post(url, options) {
        var xhr = new Xhr(options);
        return xhr.send("POST", url);
    }
}