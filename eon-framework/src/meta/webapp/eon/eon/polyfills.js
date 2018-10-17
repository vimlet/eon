// ############################################################################################
// POLYFILL DETECTION
// ############################################################################################

eon.injectPolyfill = function (url) {
  document.write('<script type="text/javascript" src="' + url + '"></script>');
};

eon.needCustomElementsPolyfill = function () {
  var __customElements = window.hasOwnProperty("customElements");
  if (eon.debug.polyfill) {
    console.log("Polyfill custom-elements", !__customElements);
  }
  return !__customElements;
};

eon.needTemplatePolyfill = function () {
  var __template = "content" in document.createElement("template") === true;
  if (eon.debug.polyfill) {
    console.log("Polyfill template", !__template);
  }
  return !__template;
};

eon.needCSSScopePolyfill = function () {
  var needPolyfill = false;
  try {
    doc.querySelector(":scope body");
  } catch (err) {
    needPolyfill = true;
  }
  if (eon.debug.polyfill) {
    console.log("Polyfill CSS Scope", needPolyfill);
  }
  return needPolyfill;
};

eon.needObjectAssignPolyfill = function () {
  var needPolyfill = !Object.assign;
  if (eon.debug.polyfill) {
    console.log("Polyfill Object Assign", needPolyfill);
  }
  return needPolyfill;
};

eon.needLocalStringPolyfill = function () {
  return (new Date(1994, 1, 9).toLocaleString("en", { weekday: "short" }) != "Wed");
}

eon.needClassListAddPolyfill = function () {
  var div = document.createElement("div");
  div.classList.add("class1", "class2");

  return div.classList.contains("class2") ? false : true;
}

// ############################################################################################
// POLYFILL IMPORTS
// ############################################################################################

// Custom Elements - https://github.com/webcomponents/custom-elements
if (eon.needCustomElementsPolyfill()) {
  eon.injectPolyfill(eon.basePath + "/polyfill/custom-elements/custom-elements.min.js");
}

// Template - https://github.com/webcomponents/template
if (eon.needTemplatePolyfill()) {
  eon.injectPolyfill(eon.basePath + "/polyfill/template/template.js");
}

// CSS :scope
if (eon.needCSSScopePolyfill()) {
  eon.injectPolyfill(eon.basePath + "/polyfill/css/scope.js");
}

// Object.assign
if (eon.needObjectAssignPolyfill()) {
  eon.injectPolyfill(eon.basePath + "/polyfill/object/assign.js");
}

// Pointer events (Must run always)
eon.injectPolyfill(eon.basePath + "/polyfill/pointer-events/pep.js");

// Date locale polyfill
if (eon.needLocalStringPolyfill()) {
  
  (function (proxied) {
    Date.prototype.toLocaleString = function (locale, options) {

      if (options.month && Object.keys(options).length == 1) {
        return eon.time.defaultLocale.months[options.month][this.getMonth()];
      } else if (options.weekday && Object.keys(options).length == 1) {
        return eon.time.defaultLocale.weekdays[options.weekday][this.getDay()];
      }

      return proxied.apply(this, arguments);
    };
  })(Date.prototype.toLocaleString);

}
//
if (eon.needClassListAddPolyfill()) {
  
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

}


