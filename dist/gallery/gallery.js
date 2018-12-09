requirejs(["util","imgur","gallery","clipboard"], function(util,Imgur,Gallery,Clipboard) {

var btns = document.querySelectorAll('.clipboard-btn');
    var clipboard = new Clipboard(btns, {
      text: function() {
        return "do be do be do";
      }
    });
    clipboard.on('success', function(e) {
        console.log(e);
    });
    clipboard.on('error', function(e) {
        console.log(e);
    });

var imgur = (function(imgurClient,ImgurAlbum, ImgurImage){
  var imageMap = new Map();
  var albumMap = new Map();
  var getAlbums = async() => {
    var res = await imgurClient.getAlbums();
    //console.log("Albums", res);
    var albums = res.data.map(x=>ImgurAlbum.fromImgur(x));

    albums.forEach(album=>{
      albumMap.set(album.id, album);
    });
    return albums;
  };
  var getImages = async(albumId) => {
    var res = await imgurClient.getImages(albumId);
    var imageUrls = [];
    res.forEach(i=>{
      imageMap.set(i.id, i);
      imageUrls.push(i.link);
    });
    return imageUrls;
  };
  return {
    client: imgurClient,
    images: imageMap,
    albums: albumMap,
    getAlbums: getAlbums,
    getImages: getImages
  };
})(Imgur.client,Imgur.ImgurAlbum, Imgur.ImgurImage);

var run = async() => {

    //get imagelinks

    var gallery = new Gallery(document.querySelector("#display"),document.querySelector("#frame"));
    gallery.albums=await imgur.getAlbums();

    gallery.addAlbum = async(album) => {
      album = album||gallery.albums[lib.rand(0,gallery.albums.length)];
      var images = await imgur.getImages(album.id);
      gallery.add(images);
      console.log("gallery.addAlbum()", images, album);
    }

    //Gallery feed
    gallery.add([
      "https://media.giphy.com/media/3og0IyhQ7KdGu1JzPO/giphy.gif",
      //"https://media.giphy.com/media/3ohk2FsuYF0HBXnJ4Y/giphy.gif",
      //"https://media.giphy.com/media/l0HlxYp0hiXHTRvyw/giphy.gif",
      "https://i.imgur.com/ugPfzPo.gif",
      "https://i.imgur.com/jLoDq1Z.gif"
    ]);
    window.gallery=gallery;
    window.imgur=imgur;

    function hotkey(e) {
      if(e.code=="PageDown") { gallery.next() };
      if(e.code=="PageUp") { gallery.previous() };
      if(e.code=="Space") { gallery.addAlbum() };
    };
    var debounceTime = 500;
    var debounceKeyMap = new Map();
    var onkeydown = e => { console.log(e); var lastHit; if(debounceKeyMap.has(e.code)) { lastHit=parseInt(debounceKeyMap.get(e.code),10); }; if(!lastHit || (Date.now()-lastHit) > debounceTime) { debounceKeyMap.set(e.code,Date.now()); hotkey(e); }; };
    document.addEventListener("keydown", onkeydown);

    console.log(imgur.AlbumMap);
};
run();
});
