eon.interpolation = eon.interpolation || {};
eon.interpolation.tags = ["{{", "}}", "="];

eon.interpolation.globalScope = eon.interpolation.globalScope || eon;

eon.interpolation.globalScope.data = eon.interpolation.globalScope.data || {};
eon.interpolation.globalScope.locale = eon.interpolation.globalScope.locale || {};

eon.createCallback("onDataChanged", eon.interpolation.globalScope);
eon.createCallback("onLocaleChanged", eon.interpolation.globalScope);

/*
@function prepare
@description Replaces all the echo/script for its corresponding elements and prepares them
@param {Object} template
*/
eon.interpolation.prepare = function (template) {

  // Extend vimlet.meta
  if (!vimlet.meta.sandbox) {
    vimlet.meta.sandbox = {
      "bind": function (keyPath, rootPath, global) {

        global = eon.util.isTrue(global) ? true : false;

        // If rootPath is provided we split it
        rootPath = rootPath && rootPath !== "" ? rootPath.split(".") : rootPath;

        // If the first element of the rootPath is either "data" or "global"
        if (rootPath && ((rootPath[0] == "data" && !global) || (rootPath[0] == "global"))) {

          // Removes the data/global from the path
          rootPath.shift();
          // Joins the remaining path
          rootPath = rootPath.join(".");

          keyPath = rootPath != "" ? rootPath + "." + keyPath : keyPath;

        }

        this.echo('<eon-variable bind="' + keyPath + '" global="' + global + '"></eon-variable>');
      }
    };
  }

  if (!vimlet.meta.shortcut) {
    vimlet.meta.shortcut = {
      "@": function (s) {

        // Transforms the string argument into our binding parameters
        var params = s.split(" ");

        var keyPath = params.length > 1 ? params[1] : params[0];
        var rootPath = params.length > 1 ? params[0] : undefined;
        var global = rootPath && rootPath.split(".")[0] == "global" ? true : false;

        keyPath = "\"" + keyPath + "\"";
        rootPath = rootPath ? "\"" + rootPath + "\"" : rootPath;
        params = "[ " + keyPath + ", " + rootPath + ", " + global + "]";

        return "bind.apply(undefined, " + params + ");";
      }
    };
  }


  vimlet.meta.tags = eon.interpolation.tags;
  vimlet.meta.parse(window, template.innerHTML, null, function (result) {
    template.innerHTML = result;
  });

  return template;
};

/*
@function init
@description Handles all the initial state of the data and variable elements
@param {Object} el
@param {Object} config
*/
eon.interpolation.init = function (el, config) {

  var sources = {};

  sources.element = {};
  sources.global = {};

  // First of all checks if there is a data specified in the element config, if so, it creates the source
  if (Object.keys(el.data).length > 0) {

    sources.element.data = {};
    sources.element.data.scope = el;
    sources.element.data.obj = el.data;
    sources.element.data.isGlobal = false;
    sources.element.data.isLocale = false;

  }

  // If parse is not enabled then we will try to create onDataChanged callback if data exists on the component
  if (!config.parse) {

    if (sources.element.data) {

      eon.interpolation.setupListenerCallback(el, sources.element.data, config);
      eon.interpolation.defineProperties(sources.element.data, "data");

    }

  } else {

    var variables = el.template.querySelectorAll("eon-variable");
    var currentVariable;

    var isGlobal, scope, source, sourceType, interpolations;
    var bindString, bindValue, isUndefined, root;

    eon.interpolation.globalScope.__interpolations = eon.interpolation.globalScope.__interpolations || {};
    eon.interpolation.globalScope.__interpolations.data = eon.interpolation.globalScope.__interpolations.data || {};
    eon.interpolation.globalScope.__interpolations.locale = eon.interpolation.globalScope.__interpolations.locale || {};

    el.__interpolations = el.__interpolations || {};
    el.__interpolations.data = el.__interpolations.data || {};
    el.__interpolations.locale = el.__interpolations.locale || {};

    // Loops all the inner element variables
    for (var i = 0; i < variables.length; i++) {

      currentVariable = variables[i];

      // Sets some basic variables to be used later on
      isGlobal = eon.util.isTrue(currentVariable.getAttribute("global"));
      bindString = currentVariable.getAttribute("bind");
      scope = isGlobal ? eon.interpolation.globalScope : el;
      sourceName = bindString.split(".")[0] == "locale" ? "locale" : "data";

      root = sourceName != "locale" ? scope[sourceName] : scope;

      // Reads if there is already a value on the source if there is not then it assigns an empty string
      bindValue = eon.object.readFromPath(root, bindString);
      isUndefined = typeof bindValue == "undefined";
      bindValue = isUndefined ? "" : bindValue;
      
      // Reassigns the value to the source, in case there was no value
      if (isUndefined) {
        eon.object.assignToPath(root, bindString, bindValue);
      }
      
      sourceType = isGlobal ? "global" : "element";

      // Creates the source object
      if (!sources[sourceType][sourceName]) {

        sources[sourceType][sourceName] = {};
        sources[sourceType][sourceName].scope = scope;
        sources[sourceType][sourceName].obj = scope[sourceName];
        sources[sourceType][sourceName].isGlobal = isGlobal;
        sources[sourceType][sourceName].isLocale = (sourceName === "locale");

      }

    }

    var sourceTypeKeys = Object.keys(sources);
    var sourceKeys;

    for (var i = 0; i < sourceTypeKeys.length; i++) {

      sourceKeys = Object.keys(sources[sourceTypeKeys[i]]);

      for (var j = 0; j < sourceKeys.length; j++) {

        source = sources[sourceTypeKeys[i]][sourceKeys[j]];
        interpolations = source.isLocale ? source.scope.__interpolations.locale : source.scope.__interpolations.data;

        eon.interpolation.setupListenerCallback(el, source, config);
        eon.interpolation.defineProperties(source, sourceKeys[j]);
        eon.interpolation.interpolate(el, source, source.obj, interpolations);

      }

    }

  }

};

/*
@function defineProperties
@description Creates the descriptor for the data object itself and for all its properties
@param {Object} source
@param {String} sourceName
*/
eon.interpolation.defineProperties = function (source, sourceName) {

  var scope = source.scope;

  // Defines its own descriptor, in case the whole "data" object changes
  Object.defineProperty(
    scope,
    sourceName,
    eon.interpolation.createPropDescriptor(scope, scope, sourceName, "", scope[sourceName], source.isLocale)
  );

  // Loops through all the keys of the object
  eon.interpolation.createObjectPropDescriptors(scope, scope[sourceName], sourceName, source.isLocale);
};

/*
@function {Object} createPropDescriptor
@description Simple property descriptor creation that in case its changed it will trigger our internal callback
@param {Object} scope
@param {Object} keyOwnerObj
@param {String} key
@param {String} keyPath
@param {Value} value
*/
eon.interpolation.createPropDescriptor = function (scope, keyOwnerObj, key, keyPath, value, isLocale) {
  var propDescriptor = {};

  // Update property value
  keyOwnerObj["__" + key] = value;

  // Redirect get and set to __key
  propDescriptor.get = function () {
    return keyOwnerObj["__" + key];
  };

  propDescriptor.set = function (value) {
    // Trigger callback
    var callbackName = isLocale ? "_onLocaleChanged" : "_onDataChanged";
    eon.triggerCallback(callbackName, scope, scope, [keyPath + key, keyOwnerObj["__" + key], value]);

    // Update property value
    keyOwnerObj["__" + key] = value;
  };

  return propDescriptor;
};

/*
@function createObjectPropDescriptors
@description When the property we want to observer is an object we create its descriptor and ones for its properties
@param {Object} el
@param {Object} obj
@param {String} keyPath
*/
eon.interpolation.createObjectPropDescriptors = function (el, obj, keyPath, isLocale) {
  var value;

  keyPath = keyPath + ".";

  for (var key in obj) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      value = obj[key];

      obj["__" + key] = value;

      Object.defineProperty(
        obj,
        key,
        eon.interpolation.createPropDescriptor(el, obj, key, keyPath, value, isLocale)
      );

      // If the value is an Object then we update the keyPath and create the propDescriptors
      if (value && value.constructor === Object) {
        keyPath = keyPath + key;
        eon.interpolation.createObjectPropDescriptors(el, value, keyPath, isLocale);
      }
    }
  }
};

/*
@function setupListenerCallback
@description Creates the private onDataChanged and onLocaleChange callbacks to handle the public ones
@param {Object} el
@param {Object} source
@param {Object} config
*/
eon.interpolation.setupListenerCallback = function (el, source, config) {
  var scope = source.scope;
  var isLocale = source.isLocale ? true : false;
  var callbackName = source.isLocale ? "_onLocaleChanged" : "_onDataChanged";
  
  // If the private callback doesnt exist creates it
  if (!scope[callbackName]) {
    
    eon.createCallback(callbackName, scope);

    // When any data changes (incluiding data itself), we manage the onDataChanged triggers depending on the situation
    scope[callbackName](function (keyPath, oldVal, newVal) {
      
      if (newVal.constructor === Object) {
        eon.interpolation.handleObjectChange(el, scope, keyPath, oldVal, newVal, config, isLocale);
      } else {
        eon.interpolation.handleVariableChange(scope, keyPath, oldVal, newVal, config, isLocale);
      }

    });

  }

};

/*
@function interpolate
@description Takes all the properties from data, finds its variable and sets its value
@param {Object} el
@param {Object} source
@param {Object} obj
@param {Object} interpolations
@param {String} bind
*/
eon.interpolation.interpolate = function (el, source, obj, interpolations, bind) {
  var key, i, variableBind, variable;

  for (key in obj) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object the call ourselfs again to loop through our keys
      if (obj[key] && obj[key].constructor === Object) {

        bind = bind ? bind + "." + key : key;
        interpolations[key] = interpolations[key] ? interpolations[key] : {};

        eon.interpolation.interpolate(el, source, obj[key], interpolations[key], bind); 

      } else {

        variableBind = bind ? bind + "." + key : key;
        variableBind = source.isLocale ? "locale." + variableBind : variableBind;

        interpolations[key] = interpolations[key] ? interpolations[key] : [];
        
        // Looks for the variables matching the binding
        Array.prototype.push.apply(interpolations[key], el.template.querySelectorAll(
          'eon-variable[bind="' + variableBind + '"][global="' + source.isGlobal + '"]'
        ));

        // For each variable found previously sets its value
        for (i = 0; i < interpolations[key].length; i++) {
          variable = interpolations[key][i];
          variable.textContent = obj[key];
        }

      }
    }
  }
};

/*
@function handleObjectChange
@description Handles the situation when a whole object has been changed
@param {Object} el
@param {Object} scope
@param {String} keyPath
@param {Object} oldData
@param {Object} newData
@param {Object} config
*/
eon.interpolation.handleObjectChange = function (el, scope, keyPath, oldData, newData, config, isLocale) {
  var checked = {};
  var callbackName = isLocale ? "onLocaleChanged" : "onDataChanged";

  eon.triggerAllCallbackEvents(el, config, callbackName, [keyPath, oldData, newData]);

  // Checks differences between the old and the new data
  checked = eon.interpolation.backwardDataDiffing(el, scope, keyPath, oldData, newData, checked, config);

  // Checks differences between the new and the old data, escaping the already checked ones
  eon.interpolation.forwardDataDiffing(el, scope, keyPath, newData, checked, config);
  eon.interpolation.createObjectPropDescriptors(scope, newData, keyPath, config);
};

// Handles the value change of the variable element and triggers onDataChanged
eon.interpolation.handleVariableChange = function (scope, keyPath, oldVal, newVal, config, isLocale) {
  var pathArray = keyPath.split(".");
  var callbackName = isLocale ? "onLocaleChanged" : "onDataChanged";
  var interpolations = isLocale ? scope.__interpolations.locale : scope.__interpolations.data;
  var interpolationPath;
  var variablesToChange;
  
  // Removes the first index of the pathArray, that corresponds to "data", which we dont need for the interpolations
  pathArray.shift();
  // Sets the path back together withouth data
  interpolationPath = pathArray.join(".");
  // Takes the variable elements for the path
  variablesToChange = eon.object.readFromPath(interpolations, interpolationPath);

  // If it has variable elements changes its value 
  if (variablesToChange) {
    for (var i = 0; i < variablesToChange.length; i++) {
      variablesToChange[i].textContent = newVal;
    }
  }
  
  eon.triggerAllCallbackEvents(scope, config ? config : {}, callbackName, [interpolationPath, oldVal, newVal]);
};

/*
@function backwardDataDiffing
@description Compares the old data with the new one and triggers the changes
@param {Object} el
@param {Object} scope
@param {String} keyPath
@param {Object} oldData
@param {Object} newData
@param {Object} checked
@param {Object} config
*/
eon.interpolation.backwardDataDiffing = function (el, scope, keyPath, oldData, newData, checked, config) {
  var newVal;
  // Loops through the oldData
  for (var key in oldData) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object, we enter this function again for that object
      if (oldData[key].constructor === Object) {
        checked[key] = eon.interpolation.backwardDataDiffing(el, scope, keyPath + "." + key, oldData[key], newData ? newData[key] : newData, {}, config);
      } else {
        // If there is no such property on the new Data we set it as an empty string
        newVal = newData ? newData[key] : "";
        // Handles the variable change
        eon.interpolation.handleVariableChange(scope, keyPath + "." + key, oldData[key], newVal, config);

        if (newData && newData.hasOwnProperty(key)) {
          checked[key] = newData[key];
        }
      }
    }
  }

  return checked;
};

/*
@function forwardDataDiffing
@description Compares the data with the already checked object
@param {Object} el
@param {Object} scope
@param {String} keyPath
@param {Object} data
@param {Object} checked
@param {Object} config
*/
eon.interpolation.forwardDataDiffing = function (el, scope, keyPath, data, checked, config) {
  var oldVal;
  // Loops through data
  for (var key in data) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object, we enter this function again for that object
      if (data[key].constructor === Object) {
        eon.interpolation.forwardDataDiffing(el, scope, keyPath + "." + key, data[key], checked ? checked[key] : checked, config);
      } else {
        oldVal = checked ? checked[key] : "";
        // To only trigger variable change for properties that are not already checked/triggered
        if ((checked && !checked.hasOwnProperty(key)) || !checked) {
          eon.interpolation.handleVariableChange(scope, keyPath + "." + key, oldVal, data[key], config);
        }
      }
    }
  }
};