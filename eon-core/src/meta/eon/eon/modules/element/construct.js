/*
@function  declare
@description Creates the element class
@param {Object} baseElement
*/
eon.constructClass = function (baseElement) {
  // Class adpater
  var classAdapter = function () {
    // WARNING! Reflect.construct returned value will fail to return element when browser has native
    // support for webcomponents and webcomponents polyfill is enabled at the same time
    var el;
    // Constructor
    if (window.hasOwnProperty("Reflect")) {
      el = Reflect.construct(baseElement, [], classAdapter); // ES6 Reflect is preferred when available
    } else {
      baseElement.prototype.constructor = classAdapter;
      baseElement.__proto__.constructor = classAdapter;
      el = baseElement.call(classAdapter); // ES alternative
    }
    // Trigger onCreated callback
    eon.triggerCallback("onCreated", classAdapter, el);
    return el;
  };

  // Adapt class prototype and constructor
  Object.setPrototypeOf(classAdapter, baseElement);
  Object.setPrototypeOf(classAdapter.prototype, baseElement.prototype);
  Object.setPrototypeOf(classAdapter.__proto__, baseElement.__proto__);

  // Create callbacks
  eon.createCallback("onCreated", classAdapter);
  eon.createCallback("onAttached", classAdapter);
  eon.createCallback("onDetached", classAdapter);
  eon.createCallback("onAttributeChanged", classAdapter);

  // Trigger callbacks
  classAdapter.prototype.connectedCallback = function () {
    var el = this;
    eon.triggerCallback("onAttached", classAdapter, el);
  };
  classAdapter.prototype.disconnectedCallback = function () {
    var el = this;
    eon.triggerCallback("onDetached", classAdapter, el);
  };
  classAdapter.prototype.attributeChangedCallback = function (
    attrName,
    oldVal,
    newVal
  ) {
    var el = this;
    el["__" + eon.util.hyphenToCamelCase(attrName)] = newVal;
    eon.triggerCallback("onAttributeChanged", classAdapter, el, [
      attrName,
      oldVal,
      newVal
    ]);
  };
  return classAdapter;
};