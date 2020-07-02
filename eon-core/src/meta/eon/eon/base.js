// ############################################################################################
// BASE
// ############################################################################################

eon.cacheBusting = "cacheBusting" in eon ? eon.cacheBusting : false;
eon.importCacheBusting = "importCacheBusting" in eon ? eon.importCacheBusting : false;
eon.themeCacheBusting = "themeCacheBusting" in eon ? eon.themeCacheBusting : false;
eon.pollyfillCacheBusting = "pollyfillCacheBusting" in eon ? eon.pollyfillCacheBusting : false;
eon.buildCacheBusting = "buildCacheBusting" in eon ? eon.buildCacheBusting : false;

eon.getCacheBustedUrl = function (url) {
  return url + "?cache=" + (+ new Date);
};

eon.getCurrentScript = function() {
    if (document.currentScript) {
      return document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1].src;
    }
  };
  
  eon.__setBase = function() {
    var path = eon.getCurrentScript().replace(new RegExp("(\\/[^\\/]+)\\/?$"), "");
    path = path.replace(/.*:\/\//g, "");
    path = path.split("/");
    path = path.slice(1, path.length);
  
    var basePath = "";
    for (var i = 0; i < path.length; i++) {
      basePath += "/";
      basePath += path[i];
    }
  
    eon.basePath = basePath;
  };
  
  // Attempt to find basePath if not set
  if (!eon.basePath) {
    eon.__setBase();
  }
  