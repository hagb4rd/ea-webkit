define(function(require,exports,module){
  var iter = module.exports = function(iterable){
    var items = [...iterable]
      , len = items.length
      , current = 0;
    return {
        get items() { return items },
        next() {
            if (current < (len - 1))
                current++;
            else
                current = 0;
            return items[current];
        },
        prev(){
            if (current > 0)
                current--;
            else
                current = (len - 1);
            return this.current();
        },
        random() {
            current = Math.floor(Math.random() * len);
            return this.current();
        },
        current() {
            return items[current];
        }
    }
  }
})
