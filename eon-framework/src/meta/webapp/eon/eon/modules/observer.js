eon.createPropertyObserver = function (property, obj, callback, pollingRate) {
  if (typeof pollingRate == "undefined") {
    pollingRate = 300;
  }
  obj.propertyObservers = obj.propertyObservers || {};
  var startObserver = false;
  if (!obj.propertyObservers[property]) {
    obj.propertyObservers[property] = {
      value: obj[property],
      callbacks: [],
      observer: null
    };
    startObserver = true;
  }
  // Add new callback to callbacks array
  obj.propertyObservers[property].callbacks.push(callback);
  // Start observing if needed
  if (startObserver) {
    var args;
    obj.propertyObservers[property].observer = setInterval(function () {
      if (obj.propertyObservers[property].value != obj[property]) {
        //  De-reference oldValue if its type is object
        if (typeof obj.propertyObservers[property].value == "object") {
          args = [
            property,
            Object.assign({}, obj.propertyObservers[property].value),
            obj[property]
          ];
        } else {
          args = [
            property,
            obj.propertyObservers[property].value,
            obj[property]
          ];
        }
        // Update stored value
        obj.propertyObservers[property].value = obj[property];
        // Trigger callback with scope and args
        for (
          var i = 0;
          i < obj.propertyObservers[property].callbacks.length;
          i++
        ) {
          obj.propertyObservers[property].callbacks[i].apply(obj, args);
        }
      }
    }, pollingRate);
  }
};

eon.removePropertyObserver = function (property, obj) {
  if (obj.propertyObservers && obj.propertyObservers[property]) {
    // Clear interval
    window.clearInterval(obj.propertyObservers[property].observer);
    // Delete propertyObservers. property
    delete obj.propertyObservers[property];
  }
};

