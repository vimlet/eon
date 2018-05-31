// ############################################################################################
// POLYFILL DETECTION
// ############################################################################################

vcomet.injectPolyfill = function (url) {
  document.write('<script type="text/javascript" src="' + url + '"></script>');
};

vcomet.needCustomElementsPolyfill = function () {
  var __customElements = window.hasOwnProperty("customElements");
  if (vcomet.debug.polyfill) {
    console.log("Polyfill custom-elements", !__customElements);
  }
  return !__customElements;
};

vcomet.needTemplatePolyfill = function () {
  var __template = "content" in document.createElement("template") === true;
  if (vcomet.debug.polyfill) {
    console.log("Polyfill template", !__template);
  }
  return !__template;
};

vcomet.needCSSScopePolyfill = function () {
  var needPolyfill = false;
  try {
    doc.querySelector(":scope body");
  } catch (err) {
    needPolyfill = true;
  }
  if (vcomet.debug.polyfill) {
    console.log("Polyfill CSS Scope", needPolyfill);
  }
  return needPolyfill;
};

vcomet.needObjectAssignPolyfill = function () {
  var needPolyfill = !Object.assign;
  if (vcomet.debug.polyfill) {
    console.log("Polyfill Object Assign", needPolyfill);
  }
  return needPolyfill;
};

vcomet.needLocalStringPolyfill = function () {
  return (new Date(1994, 1, 9).toLocaleString("en", { weekday: "short" }) != "Wed");
}

vcomet.needClassListAddPolyfill = function () {
  var div = document.createElement("div");
  div.classList.add("class1", "class2");

  return div.classList.contains("class2") ? false : true;
}

// ############################################################################################
// POLYFILL IMPORTS
// ############################################################################################

// Custom Elements - https://github.com/webcomponents/custom-elements
if (vcomet.needCustomElementsPolyfill()) {
  vcomet.injectPolyfill(vcomet.basePath + "/polyfill/custom-elements/custom-elements.min.js");
}

// Template - https://github.com/webcomponents/template
if (vcomet.needTemplatePolyfill()) {
  vcomet.injectPolyfill(vcomet.basePath + "/polyfill/template/template.js");
}

// CSS :scope
if (vcomet.needCSSScopePolyfill()) {
  vcomet.injectPolyfill(vcomet.basePath + "/polyfill/css/scope.js");
}

// Object.assign
if (vcomet.needObjectAssignPolyfill()) {
  vcomet.injectPolyfill(vcomet.basePath + "/polyfill/object/assign.js");
}

// Pointer events (Must run always)
vcomet.injectPolyfill(vcomet.basePath + "/polyfill/pointer-events/pep.js");

// Date locale polyfill
if (vcomet.needLocalStringPolyfill()) {
  
  (function (proxied) {
    Date.prototype.toLocaleString = function (locale, options) {

      if (options.month && Object.keys(options).length == 1) {
        return vcomet.time.defaultLocale.months[options.month][this.getMonth()];
      } else if (options.weekday && Object.keys(options).length == 1) {
        return vcomet.time.defaultLocale.weekdays[options.weekday][this.getDay()];
      }

      return proxied.apply(this, arguments);
    };
  })(Date.prototype.toLocaleString);

}
//
if (vcomet.needClassListAddPolyfill()) {
  
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


