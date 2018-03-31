vcomet.registry = vcomet.registry || {};

vcomet.registry.transformedQueue = [];
vcomet.registry.renderQueue = [];
vcomet.registry.bubbleRenderQueue = [];
vcomet.registry.readyQueue = [];

vcomet.registry.elementThemes = {};
vcomet.registry.elementCounters = {};
vcomet.registry.elementRegistry = {};

vcomet.registry.elementStatus = {
  declared: [],
  created: [],
  attached: {}, // Object is used to avoid duplication
  imported: [],
  transformed: [],
  rendered: [],
  bubbleRendered: [],
  ready: []
};

// Register vcomet ready callback
vcomet.createCallback("onReady", vcomet, "ready");

// Register element
vcomet.registry.registerElement = function (el) {
  var name = el.tagName.toLowerCase();
  var uid = el.uid ? el.uid : el.getAttribute("uid");
  var uidFull;

  if (!uid) {

    if (!vcomet.registry.elementCounters[name]) {
      vcomet.registry.elementCounters[name] = 0;
    }

    // Assign uid
    vcomet.registry.elementCounters[name]++;
    uid = vcomet.registry.elementCounters[name];
    el.setAttribute("uid", uid);
    el.uid = uid;

    uidFull = name + "-" + uid;

    // Track element status
    vcomet.registry.elementRegistry[uidFull] = {
      el: el,
      status: "created"
    };

    // InnerHTML support
  } else if (uid && (!el.uid || !el.getAttribute("uid"))) {
    uidFull = name + "-" + uid;

    // In case it has either the uid property or the attribute but not the other we just set them again
    el.setAttribute("uid", uid);
    el.uid = uid;

    // Updates the reference for the element
    vcomet.registry.elementRegistry[uidFull].el = el;
  }

  el.vcomet = true;

  return uidFull;
};

vcomet.registry.triggerTransformed = function (index) {
  vcomet.registry.transformedQueue[index].fn.apply(vcomet.registry.transformedQueue[index].el);
};

vcomet.registry.addToTransformedQueue = function (el, elementDoc, fn) {
  var script = document.createElement("script");
  var index;

  vcomet.registry.transformedQueue.push({
    el: el,
    fn: fn
  });

  index = vcomet.registry.transformedQueue.length - 1;

  script.innerHTML =
    "setTimeout(function(){setTimeout(function(){vcomet.registry.triggerTransformed(" +
    index +
    ");}, 0);}, 0);";

  vcomet.registry.transformedQueue[index][script] = script;

  elementDoc.querySelector("head").appendChild(script);
};

vcomet.registry.addToRenderQueue = function (el, fn) {
  vcomet.registry.renderQueue.push({
    el: el,
    fn: fn
  });
};

vcomet.registry.addToBubbleRenderQueue = function (el, fn) {
  vcomet.registry.bubbleRenderQueue.push({
    el: el,
    fn: fn
  });
};

vcomet.registry.addToReadyQueue = function (el, fn) {
  vcomet.registry.readyQueue.push({
    el: el,
    fn: fn
  });
};

vcomet.registry.triggerRenders = function () {

  if (Object.keys(vcomet.registry.elementStatus.attached).length == vcomet.registry.elementStatus.transformed.length) {

    vcomet.registry.triggerRenderCallbacks();
    vcomet.registry.triggerBubbleRenderCallbacks();
    vcomet.registry.triggerReadyCallbacks();

    // Trigger global onReady
    vcomet.onImportsReady(function () {
      vcomet.triggerCallback("onReady", vcomet);
    });

  }

};

vcomet.registry.triggerRenderCallbacks = function () {
  // Clone queue and clear
  var auxQueue = vcomet.registry.renderQueue.slice();
  vcomet.registry.renderQueue = [];

  // Trigger queue
  for (var i = 0; i < auxQueue.length; i++) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

vcomet.registry.triggerBubbleRenderCallbacks = function () {
  // Clone queue and clear
  var auxQueue = vcomet.registry.bubbleRenderQueue.slice();
  vcomet.registry.bubbleRenderQueue = [];

  // Trigger queue
  for (var i = auxQueue.length - 1; i >= 0; i--) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

vcomet.registry.triggerReadyCallbacks = function () {
  // Clone queue and clear
  var auxQueue = vcomet.registry.readyQueue.slice();
  vcomet.registry.readyQueue = [];

  // Trigger queue
  for (var i = 0; i < auxQueue.length; i++) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

vcomet.registry.registerTheme = function (tagName, theme) {
  if (!vcomet.registry.elementThemes[theme]) {
    vcomet.registry.elementThemes[theme] = {};
  }

  vcomet.registry.elementThemes[theme][tagName] = true;
};

vcomet.registry.isThemeRegistered = function (tagName, theme) {
  return !vcomet.registry.elementThemes[theme]
    ? false
    : vcomet.registry.elementThemes[theme][tagName];
};

vcomet.registry.getUidFull = function (el) {
  var uid = el.uid ? el.uid : el.getAttribute("uid");
  var fullUid;

  if (typeof el != "string" && uid) {
    fullUid = el.tagName.toLowerCase() + "-" + uid;
  }

  return fullUid;
};

vcomet.registry.updateElementStatus = function (el, status) {

  if (status != "parsed") {

    var uidFull = vcomet.registry.getUidFull(el);

    if (status == "attached") {
      vcomet.registry.elementStatus[status][uidFull] = el;
    } else if (status != "detached") {
      vcomet.registry.elementStatus[status].push(el);
    }

    if (status != "created" && status != "declared") {
      vcomet.registry.elementRegistry[uidFull][status] = true;
    }  

  }

};

vcomet.registry.isAttached = function (el) {
  return (
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)] &&
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)].attached
  );
};

vcomet.registry.isImported = function (el) {
  return (
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)] &&
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)].imported
  );
};

vcomet.registry.isTransformed = function (el) {
  return (
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)] &&
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)].transformed
  );
};

vcomet.registry.isRendered = function (el) {
  return (
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)] &&
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)].rendered
  );
};

vcomet.registry.isBubbleRendered = function (el) {
  return (
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)] &&
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)].bubbleRendered
  );
};

vcomet.registry.isReady = function (el) {
  return (
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)] &&
    vcomet.registry.elementRegistry[vcomet.registry.getUidFull(el)].ready
  );
};

// Trigger global onReady
vcomet.onImportsReady(function () {
  
  if (vcomet.registry.elementStatus.declared.length == 0) {
    vcomet.triggerCallback("onReady", vcomet);
  }
  
});