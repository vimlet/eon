(function (proxied) {

    DOMTokenList.prototype.add = function () {
      
      if(arguments.length > 1) {
        
        for (var i = 0; i < arguments.length; i++) {
          proxied.apply(this, [arguments[i]]);
        }
        
      } else {
        return proxied.apply(this, arguments);
      }

    };
  })(DOMTokenList.prototype.add);
  
  (function (proxied) {

    DOMTokenList.prototype.remove = function () {

      if (arguments.length > 1) {

        for (var i = 0; i < arguments.length; i++) {
          proxied.apply(this, [arguments[i]]);
        }

      } else {
        return proxied.apply(this, arguments);
      }

    };
  })(DOMTokenList.prototype.remove);