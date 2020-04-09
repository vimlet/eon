
// ############################################################################################
// POLYFILL DETECTION
// ############################################################################################

eon.polyfills.injectPolyfill = function (url) {
  url = eon.cacheBusting || eon.pollyfillCacheBusting ? eon.getCacheBustedUrl(url) : url;
  document.write("<script type=\"text/javascript\" src=\"" + url + "\"></script>");
};

eon.polyfills.needCustomElementsPolyfill = function () {
  var __customElements = window.hasOwnProperty("customElements");
  if (eon.debug.polyfill) {
    console.log("Polyfill custom-elements", !__customElements);
  }
  return !__customElements;
};

eon.polyfills.needTemplatePolyfill = function () {
  var __template = "content" in document.createElement("template") === true;
  if (eon.debug.polyfill) {
    console.log("Polyfill template", !__template);
  }
  return !__template;
};

eon.polyfills.needCSSScopePolyfill = function () {
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

eon.polyfills.needObjectAssignPolyfill = function () {
  var needPolyfill = !Object.assign;
  if (eon.debug.polyfill) {
    console.log("Polyfill Object Assign", needPolyfill);
  }
  return needPolyfill;
};

eon.polyfills.needLocaleStringPolyfill = function () {
  return (new Date(1994, 1, 9).toLocaleString("en", { weekday: "short" }) !== "Wed");
};

eon.polyfills.needPromisesPolyfill = function () {
  if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
    return false;
  }
  return true;
};

eon.polyfills.needClassListAddPolyfill = function () {
  var div = document.createElement("div");
  div.classList.add("class1", "class2");

  return div.classList.contains("class2") ? false : true;
};

// ############################################################################################
// POLYFILL IMPORTS
// ############################################################################################

// Custom Elements - https://github.com/webcomponents/custom-elements
if (!eon.polyfills.customElements && eon.polyfills.needCustomElementsPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/custom-elements/custom-elements.min.js");
}

// Template - https://github.com/webcomponents/template
if (!eon.polyfills.template && eon.polyfills.needTemplatePolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/template/template.js");
}

// CSS :scope
if (!eon.polyfills.CSSScope && eon.polyfills.needCSSScopePolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/css/scope.js");
}

// Object.assign
if (!eon.polyfills.assign && eon.polyfills.needObjectAssignPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/object/assign.js");
}

// Promises
if (!eon.polyfills.promises && eon.polyfills.needPromisesPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/promises/promises.js");
}

// Date locale polyfill
if (!eon.polyfills.localeString && eon.polyfills.needLocaleStringPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/locale-string/locale-string.js");
}

//
if (!eon.polyfills.classList && eon.polyfills.needClassListAddPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/class-list/class-list.js");
}

// Pointer events (Must run always)
if (!eon.polyfills.pep) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/pointer-events/pep.js");
}

// Decompress builds
if (!eon.polyfills.decompress) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/decompress/lzjs.min.js");
}



