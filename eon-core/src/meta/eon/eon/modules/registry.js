eon.registry = eon.registry || {};

eon.registry.transformedQueue = [];
eon.registry.renderQueue = [];
eon.registry.bubbleRenderQueue = [];
eon.registry.readyQueue = [];

eon.registry.transformedQueueBreak = true;

eon.registry.elementThemes = {};
eon.registry.elementTemplates = {};
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

// Register element
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

eon.registry.triggerTransformed = function (index) {
  eon.registry.transformedQueue[index].fn.apply(eon.registry.transformedQueue[index].el);
};

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

eon.registry.addToRenderQueue = function (el, fn) {
  eon.registry.renderQueue.push({
    el: el,
    fn: fn
  });
};

eon.registry.addToBubbleRenderQueue = function (el, fn) {
  eon.registry.bubbleRenderQueue.push({
    el: el,
    fn: fn
  });
};

eon.registry.addToReadyQueue = function (el, fn) {
  eon.registry.readyQueue.push({
    el: el,
    fn: fn
  });
};

eon.registry.triggerRenders = function () {

  if (eon.registry.registeredElements == eon.registry.elementStatus.transformed.length) {

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

eon.registry.triggerRenderCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.renderQueue.slice();
  eon.registry.renderQueue = [];

  // Trigger queue
  for (var i = 0; i < auxQueue.length; i++) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

eon.registry.triggerBubbleRenderCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.bubbleRenderQueue.slice();
  eon.registry.bubbleRenderQueue = [];

  // Trigger queue
  for (var i = auxQueue.length - 1; i >= 0; i--) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

eon.registry.triggerReadyCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.readyQueue.slice();
  eon.registry.readyQueue = [];

  // Trigger queue
  for (var i = 0; i < auxQueue.length; i++) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

eon.registry.registerTheme = function (tagName, theme) {
  if (!eon.registry.elementThemes[theme]) {
    eon.registry.elementThemes[theme] = {};
  }

  eon.registry.elementThemes[theme][tagName] = true;
};

eon.registry.isThemeRegistered = function (tagName, theme) {
  return !eon.registry.elementThemes[theme]
    ? false
    : eon.registry.elementThemes[theme][tagName];
};

eon.registry.registerTemplate = function (tagName, template) {
  if (!eon.registry.elementTemplates[tagName]) {
    eon.registry.elementTemplates[tagName] = {};
  }

  eon.registry.elementTemplates[tagName] = template;
};

eon.registry.isTemplateRegistered = function (tagName) {
  return !eon.registry.elementTemplates[tagName] ? false : true;
};

eon.registry.getUidFull = function (el) {
  var uid = el.uid ? el.uid : el.getAttribute("uid");
  var fullUid;

  if (typeof el != "string" && uid) {
    fullUid = el.tagName.toLowerCase() + "-" + uid;
  }

  return fullUid;
};

eon.registry.updateElementStatus = function (el, status) {

  if (status != "parsed") {

    var uidFull = eon.registry.getUidFull(el);

    if (status == "attached") {

      eon.registry.elementStatus[status][uidFull] = el;

      if (eon.registry.elementStatus.ready.length != eon.registry.registeredElements) {
        eon["__onReady__triggered"] = false;
      }

    } else if (status != "detached") {

      eon.registry.elementStatus[status].push(el);
      
    }

    if (status != "created" && status != "declared") {
      eon.registry.elementRegistry[uidFull][status] = true;
    }

  }

};

eon.registry.isAttached = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].attached
  );
};

eon.registry.isImported = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].imported
  );
};

eon.registry.isTransformed = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].transformed
  );
};

eon.registry.isRendered = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].rendered
  );
};

eon.registry.isBubbleRendered = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].bubbleRendered
  );
};

eon.registry.isReady = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].ready
  );
};

// Trigger global onReady
eon.onImportsReady(function () {

  if (eon.registry.elementStatus.declared.length == 0) {
    eon.triggerCallback("onReady", eon);
  }

});