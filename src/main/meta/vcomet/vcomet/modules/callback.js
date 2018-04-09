
//  --- Types ---
//  always: (default)     Call stored functions always when triggered.
//  once:                Call stored functions once when triggered.
//  ready:              Call stored functions when triggered and force future functions to run immediately.
vcomet.createCallback = function (callback, obj, type) {
  // Set callback type
  if (!obj["__" + callback + "__type"]) {
    // Set always as the default type when undefined
    if (typeof type === "undefined") {
      type = "always";
    }
    obj["__" + callback + "__type"] = type;
  }
  // Set callback triggered flag
  if (!obj["__" + callback + "__triggered"]) {
    obj["__" + callback + "__triggered"] = false;
  }
  // Stored functions array
  if (!obj["__" + callback]) {
    obj["__" + callback] = [];
  }
  // Add callback function to array
  if (!obj[callback]) {
    obj[callback] = function (fn, scope, args) {

      // If ready and triggered inmediately call the function else store it
      if (
        obj["__" + callback + "__type"] === "ready" &&
        obj["__" + callback + "__triggered"] === true
      ) {
        fn.apply(
          obj["__" + callback + "__scope"],
          obj["__" + callback + "__args"]
        );
      } else {
        // callback wrapper object
        obj["__" + callback].push({
          fn: fn,
          scope: scope,
          args: args
        });
      }
    };
  }
};

vcomet.triggerCallback = function (callback, obj, scope, args) {

  // Check if callback exsists
  if (obj["__" + callback]) {
    // Check if callback functions need to be triggered
    if (obj["__" + callback + "__type"] === "always" || obj["__" + callback + "__triggered"] === false) {

      obj["__" + callback + "__triggered"] = true;

      var scopeUndefinedOrNull = typeof scope === "undefined" || scope == null;
      var argsUndefinedOrNull = typeof args === "undefined" || args == null;
      var callbackFunctions = obj["__" + callback];

      // If the callback is of "ready" type we make a copy of the functions queue to trigger them and then clear the callback queue
      if (obj["__" + callback + "__type"] == "ready") {
        callbackFunctions = obj["__" + callback].slice(0);
        obj["__" + callback] = [];
      }

      // Trigger stored functions
      for (var i = 0; i < callbackFunctions.length; i++) {

        if (scopeUndefinedOrNull) {
          scope = callbackFunctions[i].scope ? callbackFunctions[i].scope : obj;
        }

        if (argsUndefinedOrNull) {
          args = callbackFunctions[i].args ? callbackFunctions[i].args : [];
        }

        callbackFunctions[i].fn.apply(scope, args);

      }

      // Store scope, args and tag as triggered
      obj["__" + callback + "__scope"] = scope;
      obj["__" + callback + "__args"] = args;

    }
  }
};

vcomet.removeCallback = function (callback, obj, fn) {
  var callbacksArray = obj["__" + callback];

  for (var i = 0; i < callbacksArray.length; i++) {
    if (callbacksArray[i].fn === fn) {
      callbacksArray.splice(i, 1);
    }
  }
};

