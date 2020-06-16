eon.util = eon.util || {};
/**
 * Set first string character to upper case
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.firstToUpperCase = function (str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};
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
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
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
    outer.classList.add("eonScrollWidthChecker");

    // Rules for the scroll width
    // if (!eon.scrollWidthCheckerRule && eon.util.getBrowser() != "IE" && eon.util.getBrowser() != "Edge") {
    //   eon.style.sheet.insertRule(".eonScrollWidthChecker::-webkit-scrollbar { visibility: hidden; }", 0);
    //   eon.style.sheet.insertRule(".eonScrollWidthChecker::-webkit-scrollbar-corner { visibility: hidden; }", 0);
    //   eon.scrollWidthCheckerRule = true;
    // }

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
  return a === true || a === "true";
};

eon.util.isTouchScreen = function () {
  return "ontouchstart" in window;
};

eon.ajax = function (url, options, cb) {
  options = options || {};
  options.method = options.method ? options.method.toUpperCase() : "GET";
  options.querySeparator = options.querySeparator || "?";
  options.paramSeparator = options.paramSeparator || "&";
  options.contentType = options.contentType || "application/json";
  options.payload = options.payload || null;
  options.async = options.async || null;
  options.user = options.user || null;
  options.password = options.password || null;
  options.cacheBusting = "cacheBusting" in options ? options.cacheBusting : false;

  url = options.cacheBusting ? eon.getCacheBustedUrl(url) : url;

  var xhr = options.xhr || new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      var success;
      if(options.errorOnRedirect) {
        success = this.status >= 200 && this.status < 300;
      } else {
        success = this.status >= 200 && this.status < 400;
      }
      if (cb) {
        cb(!success, {
          url: url,
          method: options.method,
          xhr: this,
          status: this.status,
          response: options.contentType == "application/json" && this.response && typeof this.response != "object" ? JSON.parse(this.response) : this.response,
          responseText:  options.contentType == "application/json" ? JSON.stringify(this.response) : this.responseText
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

  xhr.setRequestHeader("Content-Type", options.contentType);
  
  if(options.contentType == "application/json") {
    xhr.responseType = "json";
    if(options.payload && typeof options.payload == "object") {
      options.payload = JSON.stringify(options.payload);
    }
  }

  if (options.headers) {
    for (var header in options.headers) {
      xhr.setRequestHeader(header, options.headers[header]);
    }
  }

  xhr.send(options.payload);
};

eon.setLocale = function (url, options) {

  options = options ? options : {};

  eon.ajax(url, options, function (error, obj) {

    if (!error) {

      var jsonObj = JSON.parse(obj.responseText);

      if (jsonObj) {
        eon.interpolation.globalScope.locale = jsonObj;
      }

    }

  });

};

/**
 * 
 * @param  {[type]}  [description]
 */
eon.util.arrayToMap = function (array) {
  var result = new Map();

  if (array.constructor === Map) {
    result = array;
  } else if (array.constructor === Array) {
    for (var i = 0; i < array.length; i++) {
      result.set(i.toString(), array[i]);
    }
  }

  return result;
};

/**
 * 
 * @param  {[type]}  [description]
 */
eon.util.objectToMap = function (object) {
  var map = new Map();

  if (object.constructor === Map) {
    map = object;
  } else {
    for (var key in object) {
      map.set(key, object[key]);
    }
  }

  return map;
};
/**
 * Get Map Js Object representation
 * @param  {[type]}  [description]
 */
eon.util.mapToObject = function (map) {
  var obj = Object.create(null);

  if (map.constructor === Map) {
    obj = map;
  } else if (map.constructor === Object) {
    map.forEach(function (value, key, mapObj) {
      mapObj[key] = value;
    });
  }

  return obj;
};
