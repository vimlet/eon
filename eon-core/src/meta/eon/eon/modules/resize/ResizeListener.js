eon.resizeObserver = function (callback) {
  var elm = this;

  elm.observe = function (el) {
    if (elm.observables.some(function (observable) {
      return observable.el === el;
    })) {
      return;
    }
    var newObservable = {
      el: el,
      size: {
        height: el.clientHeight,
        width: el.clientWidth
      }
    }
    elm.observables.push(newObservable);
  };

  elm.unobserve = function (el) {
    elm.observables = elm.observables.filter(function (obj) {
      return obj.el !== el;
    });
  };

  elm.disconnect = function () {
    elm.observables = [];
  };

  elm.check = function () {
    var changedEntries = elm.observables.filter(function (obj) {
      var currentHeight = obj.el.clientHeight;
      var currentWidth = obj.el.clientWidth;
      if (obj.size.height !== currentHeight || obj.size.width !== currentWidth) {
        obj.size.height = currentHeight;
        obj.size.width = currentWidth;
        return true;
      }
    }).map(function (obj) {
      return obj.el;
    });
    if (changedEntries.length > 0) {
      elm.callback(changedEntries);
    }
    window.requestAnimationFrame(elm.boundCheck);
  };
  //  class ResizeObserver {
  function constructor(callback) {
    elm.observables = [];
    // Array of observed elements that looks like el:
    // [{
    //   el: domNode,
    //   size: {height: x, width: y}
    // }]
    elm.boundCheck = elm.check.bind(elm);
    elm.boundCheck();
    elm.callback = callback;
  }
  constructor(callback);
};