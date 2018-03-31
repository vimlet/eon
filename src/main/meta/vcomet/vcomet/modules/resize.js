  // IE related 'addEventListener'
  var attachEvent = document.attachEvent;
  // Resize detection via RequestAnimationFrame, if not supported use timeout function
  var requestFrame = (function() {
    var raf =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function(fn) {
        return window.setTimeout(fn, 20);
      };
    return function(fn) {
      return raf(fn);
    };
  })();
  // Cancel RequestAnimationFrame resize detection, if not supported remove element timeout
  var cancelFrame = (function() {
    var cancel =
      window.cancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.clearTimeout;
    return function(id) {
      return cancel(id);
    };
  })();
  /**
     *
     * @param  {[type]} element [description]
     * @param  {[type]} key      [description]
     * @param  {Function} callback     [description]
     * @return {[type]}            [description]
     */
  vcomet.addResizeListener = function(element, key, fn) {
    //
    var isIE = navigator.userAgent.match(/Trident/);
    //
    if (!element.__resizeListeners) {
      element.__resizeListeners = {};
      // Resize IE listener creation
      if (attachEvent) {
        element.__resizeTrigger = element;
        element.attachEvent("onresize", resizeListener);
      } else {
        // Set relative position for resize trigger positioning
        if (getComputedStyle(element).position == "static") {
          element.style.position = "relative";
        }
        // Create trigger object
        // ** Object tag also supports resize event and the remaining global events!
        var obj = (element.__resizeTrigger = document.createElement("object"));
        // Hide it from view
        obj.setAttribute(
          "style",
          "display: block; position: absolute; \n\
                          top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;\n\
                          pointer-events: none; z-index: -1;"
        );
        // Store resize element
        obj.__resizeElement = element;
        obj.onload = objectLoad;
        obj.type = "text/html";
        if (isIE) element.appendChild(obj);
        obj.data = "about:blank";
        if (!isIE) element.appendChild(obj);
      }
    }
    element.__resizeListeners[key] = fn;
  };
  /**
     *
     * @param  {[type]} element [description]
     * @param  {[type]} key      [description]
     * @param  {Function} callback     [description]
     * @return {[type]}            [description]
     */
  vcomet.removeResizeListener = function(element, key) {
    // Remove callback from element callback array
    delete element.__resizeListeners[key];
    // If no callback exists detach resize event
    if (!Object.keys(element.__resizeListeners).length) {
      // Cross browser detach event functionality
      if (attachEvent) element.detachEvent("onresize", resizeListener);
      else {
        element.__resizeTrigger.contentDocument.defaultView.removeEventListener(
          "resize",
          resizeListener
        );
        element.__resizeTrigger = !element.removeChild(element.__resizeTrigger);
      }
    }
  };

   // Resize triggering!
   function resizeListener(e) {
    var win = e.target || e.srcElement;
    // Get resize funciton to be triggered and suscribe itto cancel function
    if (win.__resizeRAF) cancelFrame(win.__resizeRAF);
    // Declare resize function and suscribe it to request animation frame functionality
    win.__resizeRAF = requestFrame(function() {
      var trigger = win.__resizeTrigger;
      // Call every monitored element resize callbacks
      if (trigger) {
        // Call every monitored element resize callbacks
        for (var key in trigger.__resizeListeners) {
          trigger.__resizeListeners[key].call(trigger, e);
        }
      }
    });
  }
  //
  function objectLoad() {
    // ** Document.defaultView returns window object related to this document scope
    //    (could be an iframe)
    var defaultView = this.contentDocument
      ? this.contentDocument.defaultView
      : this.contentWindow;
    // Set current resize target
    defaultView.__resizeTrigger = this.__resizeElement;
    // Create resize listener
    defaultView.addEventListener("resize", resizeListener);
  }
