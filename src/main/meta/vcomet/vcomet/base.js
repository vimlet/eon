// ############################################################################################
// BASE
// ############################################################################################
vcomet.getCurrentScript = function() {
    if (document.currentScript) {
      return document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1].src;
    }
  };
  
  vcomet.__setBase = function() {
    var path = vcomet.getCurrentScript().replace("/vcomet.js", "");
    path = path.replace(/.*:\/\//g, "");
    path = path.split("/");
    path = path.slice(1, path.length);
  
    var basePath = "";
    for (i = 0; i < path.length; i++) {
      basePath += "/";
      basePath += path[i];
    }
  
    vcomet.basePath = basePath;
  };
  
  // Attempt to find basePath if not set
  if (!vcomet.basePath) {
    vcomet.__setBase();
  }
  