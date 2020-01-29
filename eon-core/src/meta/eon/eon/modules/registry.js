eon.registry = eon.registry || {};

eon.registry.transformedQueue = [];
eon.registry.renderQueue = [];
eon.registry.bubbleRenderQueue = [];
eon.registry.readyQueue = [];

eon.registry.transformedQueueBreak = true;

eon.registry.elementThemes = {};
eon.registry.elementCounters = {};
eon.registry.elementRegistry = {};

eon.registry.registeredElements = 0;

eon.registry.elementStatus = {
  declared: [],
  created: [],
  attached: {}, // Object is used to avoid duplication
  imported: [],
  transformed: [],
  rendered: [],
  bubbleRendered: [],
  ready: []
};

// Register eon ready callback
eon.createCallback("onReady", eon, "ready");

/*
@function {String} registerElement
@description Register the element, gives it an uid and registers its status to created
@param {Object} el
*/
eon.registry.registerElement = function (el) {
  var name = el.tagName.toLowerCase();
  var uid = el.uid ? el.uid : el.getAttribute("uid");
  var uidFull;

  if (!uid) {

    if (!eon.registry.elementCounters[name]) {
      eon.registry.elementCounters[name] = 0;
    }

    // Assign uid
    eon.registry.elementCounters[name]++;
    uid = eon.registry.elementCounters[name];
    el.setAttribute("uid", uid);
    el.uid = uid;

    uidFull = name + "-" + uid;

    // Track element status
    eon.registry.elementRegistry[uidFull] = {
      el: el,
      status: "created"
    };

    eon.registry.registeredElements++;

    // InnerHTML support
  } else if (uid && (!el.uid || !el.getAttribute("uid"))) {
    uidFull = name + "-" + uid;

    // In case it has either the uid property or the attribute but not the other we just set them again
    el.setAttribute("uid", uid);
    el.uid = uid;

    // Updates the reference for the element
    eon.registry.elementRegistry[uidFull].el = el;
  }

  el.eon = true;

  return uidFull;
};

/*
@function triggerTransformed
@description Triggers the transform callback for the component of the given index
@param {Number} index
*/
eon.registry.triggerTransformed = function (index) {
  eon.registry.transformedQueue[index].fn.apply(eon.registry.transformedQueue[index].el);
};

/*
@function addToTransformedQueue
@description Adds the component to the transform queue, appending its triggerTransformed call into the DOM with a script tag
@param {Object} el
@param {Object} elementDoc
@param {Function} fn
*/
eon.registry.addToTransformedQueue = function (el, elementDoc, fn) {
  var script = document.createElement("script");
  var index;

  eon.registry.transformedQueue.push({
    el: el,
    fn: fn
  });

  index = eon.registry.transformedQueue.length - 1;

  script.innerHTML =
    "setTimeout(function(){setTimeout(function(){eon.registry.triggerTransformed(" +
    index +
    ");}, 0);}, 0);";

  eon.registry.transformedQueue[index][script] = script;

  elementDoc.querySelector("head").appendChild(script);
};

/*
@function addToRenderQueue
@description Adds the component to the render queue
@param {Object} el
@param {Function} fn
*/
eon.registry.addToRenderQueue = function (el, fn) {
  eon.registry.renderQueue.push({
    el: el,
    fn: fn
  });
};

/*
@function addToBubbleRenderQueue
@description Adds the component to the bubble render queue
@param {Object} el
@param {Function} fn
*/
eon.registry.addToBubbleRenderQueue = function (el, fn) {
  eon.registry.bubbleRenderQueue.push({
    el: el,
    fn: fn
  });
};

/*
@function addToReadyQueue
@description Adds the component to the ready queue
@param {Object} el
@param {Function} fn
*/
eon.registry.addToReadyQueue = function (el, fn) {
  eon.registry.readyQueue.push({
    el: el,
    fn: fn
  });
};

/*
@function triggerRenders
@description Attempts to trigger all the render callbacks for all the components if all of them are transformed
*/
eon.registry.triggerRenders = function () {

  if (eon.registry.registeredElements === eon.registry.elementStatus.transformed.length && (!eon.buildsQueue || eon.buildsQueue.length == 0)) {

    eon.registry.transformedQueueBreak = true;
    
    eon.registry.triggerRenderCallbacks();
    eon.registry.triggerBubbleRenderCallbacks();
    eon.registry.triggerReadyCallbacks();
    
    // Trigger global onReady
    eon.onImportsReady(function () {
      eon.triggerCallback("onReady", eon);
    });

  }

};

/*
@function triggerRenderCallbacks
@description Triggers the render callbacks from the render queue
*/
eon.registry.triggerRenderCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.renderQueue.slice();
  eon.registry.renderQueue = [];

  // Trigger queue
  for (var i = 0; i < auxQueue.length; i++) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

/*
@function triggerBubbleRenderCallbacks
@description Triggers the bubble render callbacks from the bubble render queue
*/
eon.registry.triggerBubbleRenderCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.bubbleRenderQueue.slice();
  eon.registry.bubbleRenderQueue = [];

  // Trigger queue
  for (var i = auxQueue.length - 1; i >= 0; i--) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

/*
@function triggerReadyCallbacks
@description Triggers the ready callbacks from the ready queue
*/
eon.registry.triggerReadyCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.readyQueue.slice();
  eon.registry.readyQueue = [];

  // Trigger queue
  for (var i = 0; i < auxQueue.length; i++) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

/*
@function registerTheme
@description Registers the specified theme
@param {String} tagName
@param {String} theme
*/
eon.registry.registerTheme = function (tagName, theme) {
  if (!eon.registry.elementThemes[theme]) {
    eon.registry.elementThemes[theme] = {};
  }

  eon.registry.elementThemes[theme][tagName] = true;
};

/*
@function {Boolean} isThemeRegistered
@description Checks if the provided theme has already been registered
@param {String} tagName
@param {String} theme
*/
eon.registry.isThemeRegistered = function (tagName, theme) {
  return !eon.registry.elementThemes[theme]
    ? false
    : eon.registry.elementThemes[theme][tagName];
};

/*
@function {String} getUidFull
@description Returns the full UID for the provided component
@param {Object} el
*/
eon.registry.getUidFull = function (el) {
  var uid = el.uid ? el.uid : el.getAttribute("uid");
  var fullUid;

  if (typeof el !== "string" && uid) {
    fullUid = el.tagName.toLowerCase() + "-" + uid;
  }

  return fullUid;
};

/*
@function updateElementStatus
@description Registers a new status for the given component
@param {Object} el
@param {String} status
*/
eon.registry.updateElementStatus = function (el, status) {

  if (status !== "parsed") {

    var uidFull = eon.registry.getUidFull(el);

    if (status === "attached") {

      eon.registry.elementStatus[status][uidFull] = el;

      if (eon.registry.elementStatus.ready.length !== eon.registry.registeredElements) {
        eon["__onReady__triggered"] = false;
      }

    } else if (status !== "detached") {

      eon.registry.elementStatus[status].push(el);
      
    }

    if (status !== "created" && status !== "declared") {
      eon.registry.elementRegistry[uidFull][status] = true;
    }

  }

};

/*
@function isAttached
@description Whether the component is attached or not
@param {Object} el
*/
eon.registry.isAttached = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].attached
  );
};

/*
@function isImported
@description Whether the component is imported or not
@param {Object} el
*/
eon.registry.isImported = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].imported
  );
};

/*
@function isTransformed
@description Whether the component is transformed or not
@param {Object} el
*/
eon.registry.isTransformed = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].transformed
  );
};

/*
@function isRendered
@description Whether the component is rendered or not
@param {Object} el
*/
eon.registry.isRendered = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].rendered
  );
};

/*
@function isBubbleRendered
@description Whether the component is bubble rendered or not
@param {Object} el
*/
eon.registry.isBubbleRendered = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].bubbleRendered
  );
};

/*
@function isReady
@description Whether the component is ready or not
@param {Object} el
*/
eon.registry.isReady = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].ready
  );
};

// Trigger global onReady
eon.onImportsReady(function () {

  if (eon.registry.elementStatus.declared.length === 0 && (!eon.buildsQueue || eon.buildsQueue.length == 0)) {
    eon.triggerCallback("onReady", eon);
  }

});