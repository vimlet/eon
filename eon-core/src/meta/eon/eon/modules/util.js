eon.util = eon.util || {};
/**
 * Set first string character to upper case
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.firstToUpperCase = function (str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
/**
 * Set first string character to lower case
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.firstToLowerCase = function (str) {
  var first = str.substring(0, 1);
  var low = str.substring(0, 1).toLowerCase();
  return low + str.substring(1, str.length);
};
/**
 * Replaces the camel cases for hyphens
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.camelToHyphenCase = function (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
/**
 * Replaces the hyphens cases for camels
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.hyphenToCamelCase = function (str) {
  return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
};
/**
 * Parse query params to object
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
eon.util.queryToObject = function (url) {
  var obj = {};
  // Get query params substring from url
  var paramsStr = url.split("?")[1];
  if (paramsStr) {
    paramsStr = paramsStr.split("#")[0];
    // Store each params into an array
    var paramsArray = paramsStr.split("&");
    for (var i = 0; i < paramsArray.length; i++) {
      var paramStr = paramsArray[i];
      // Store query param as an object property
      obj[paramStr.split("=")[0]] = paramStr.split("=")[1];
    }
  }
  return obj;
};
/**
 * Parse params object to query string
 * @param  {[type]} obj [description]
 * @return {[type]}      [description]
 */
eon.util.objectToQuery = function (obj) {
  var queryStr = "";
  var keyIndex = 0;
  for (var key in obj) {
    // Check first parameter added
    if (keyIndex > 0) {
      // Build string with query parameters separator
      queryStr += "&" + key + "=" + obj[key];
    } else {
      // Build string without query parameters separator
      queryStr += key + "=" + obj[key];
    }
    keyIndex++;
  }
  return queryStr;
};
/**
 * Replace or add params to specified url
 * @param  {[type]} url [description]
 * @param  {[type]} paramsObj [description]
 * @return {[type]}      [description]
 */
eon.util.replaceParam = function (url, paramsObj) {
  // Convert url params into a manipulable object
  var queryObj = this.queryToObject(url);
  // Replace or add query param
  for (var key in paramsObj) {
    queryObj[key] = paramsObj[key];
  }
  // Return url with its parameters updated
  var newUrl = url.split("?")
    ? url.split("?")[0] + "?" + this.objectToQuery(queryObj)
    : url + "?" + this.objectToQuery(queryObj);
  return newUrl;
};
/**
 * Replace or add params to specified url
 * @param  {[type]} url [description]
 * @param  {[type]} paramsObj [description]
 * @return {[type]}      [description]
 */
eon.util.getBrowser = function () {
  var browserName;
  // Internet Explorer 6-11
  if (document.documentMode) {
    browserName = "IE";
  }
  // Edge 20+
  if (!document.documentMode && window.StyleMedia) {
    browserName = "Edge";
  }
  // Chrome 1+
  if (window.chrome && navigator.userAgent.indexOf("Chrome") > -1 && browserName !== "Edge") {
    browserName = "Chrome";
  }
  // Firefox 1.0+
  if (typeof InstallTrigger !== "undefined") {
    browserName = "Firefox";
  }
  // Safari
  if (!window.chrome && navigator.userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
  }
  // TODO - ** Test in Opera**
  if (
    (window.opr && opr.addons) ||
    window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0
  ) {
    browserName = "Opera";
  }
  return browserName;
};

/**
 * Replace or add params to specified url
 * @param  {[type]} url [description]
 * @param  {[type]} paramsObj [description]
 * @return {[type]}      [description]
 */
eon.util.getBrowserScrollBarWidth = function () {

  if (!eon.__browserScrollBarWidth) {

    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.getBoundingClientRect().width;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.getBoundingClientRect().width;

    // remove divs
    outer.parentNode.removeChild(outer);

    // Creates a listener for the window resize to handle the zoom in/out of the browser that may affect the scroll bar width
    if (!eon.__browserScrollBarWidthListener) {
      window.addEventListener("resize", function () {
        delete eon.__browserScrollBarWidth;
      });
    }

    eon.__browserScrollBarWidth = widthNoScroll - widthWithScroll;
    eon.__browserScrollBarWidthListener = true;

  }

  return eon.__browserScrollBarWidth;

};

eon.util.isTrue = function (a) {
  return a == true || a == "true";
};

eon.util.isTouchScreen = function () {
  return "ontouchstart" in window;
};

eon.ajax = function (url, options, cb) {
  options = options || {};
  options.method = options.method ? options.method.toUpperCase() : "GET";
  options.querySeparator = options.querySeparator || "?";
  options.paramSeparator = options.paramSeparator || "&";
  options.payload = options.payload || null;
  options.async = options.async || null;
  options.user = options.user || null;
  options.password = options.password || null;

  var xhr = options.xhr || new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      var success = this.status >= 200 && this.status < 300;
      if(cb) {
        cb(success, {
          url: url,
          method: options.method,
          xhr: this,
          status: this.status,
          response: this.response,
          responseText: this.responseText
        });
      }
    }
  };

  if (options.params) {
    var paramsKeys = Object.keys(options.params);
    if (paramsKeys.length > 0) {
      url += options.querySeparator + paramsKeys[0] + "=" + options.params[paramsKeys[0]];
      for (var i = 1; i < paramsKeys.length; i++) {
        url += options.paramSeparator + paramsKeys[i] + "=" + options.params[paramsKeys[i]];
      }
    }
  }

  if (options.async || options.user || options.password) {
    xhr.open(options.method, url, options.async, options.user, options.password);
  } else {
    xhr.open(options.method, url);
  }

  if (options.contentType) {
    xhr.setRequestHeader("Content-Type", options.contentType);
  }

  if (options.headers) {
    for (var header in options.headers) {
      xhr.setRequestHeader(header, options.headers[header]);
    }
  }
  xhr.send(options.payload);
};

/**
 * 
 * @param  {[type]}  [description]
 */
eon.util.arrayToMap = function (array) {
  var map = new Map();

  for (var i = 0; i < array.length; i++) {
    map.set(i.toString(), array[i]);
  }

  return map;
};

/**
 * 
 * @param  {[type]}  [description]
 */
eon.util.objectToMap = function (object) {
  var map = new Map();

  for(var key in object){
    map.set(key, object[key]);
  }

  return map;
};
/**
 * Get Map Js Object representation
 * @param  {[type]}  [description]
 */
eon.util.mapToObject = function (map) {
  var obj = Object.create(null);
  map.forEach(function (value, key, mapObj) {
    mapObj[key] = value;
});
  return obj;
};
