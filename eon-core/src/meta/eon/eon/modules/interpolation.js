eon.interpolation = eon.interpolation || {};
eon.interpolation.tags = ["{{", "}}", "="];

eon.interpolation.globalScope = eon.interpolation.globalScope || eon;

eon.interpolation.globalScope.data = eon.interpolation.globalScope.data || {};
eon.interpolation.globalScope.locale = eon.interpolation.globalScope.locale || {};

eon.interpolation.globalScope.__interpolations = eon.interpolation.globalScope.__interpolations || {};
eon.interpolation.globalScope.__interpolations.data = eon.interpolation.globalScope.__interpolations.data || {};
eon.interpolation.globalScope.__interpolations.locale = eon.interpolation.globalScope.__interpolations.locale || {};

eon.interpolation.sources = eon.interpolation.sources || [];

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
        rootPath = rootPath && rootPath != "" ? rootPath.split(".") : rootPath;

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
// eon.interpolation.init = function (el, config) {

//   eon.interpolation.initBindAttributes(el);

// }
/*
@function initBindAttributes
@description Checks if there are bind attributes in the component
@param {Object} el
*/
eon.interpolation.bindAttributes = function (el) {

  if (el.nodeName.toLowerCase() != "eon-variable") {

    // First we create an empty clone of the element
    var emptyClone = el.cloneNode(true);

    emptyClone.innerHTML = "";

    if (emptyClone.outerHTML.indexOf("bind:") > -1) {

      el.__bindAttributes = {};

      for (var i = 0; i < el.attributes.length; i++) {

        if (el.attributes[i].name.indexOf("bind:") > -1) {
          el.__bindAttributes[el.attributes[i].name.replace("bind:", "")] = el.attributes[i].value;
          el.removeAttribute(el.attributes[i].name);
        }

      }
    }
  }

}
/*
@function init
@description Handles all the initial state of the data and variable elements
@param {Object} el
@param {Object} config
*/
eon.interpolation.bind = function (el, config) {

  if (el.nodeName.toLowerCase() != "eon-variable") {

    var sources = {};

    sources.element = {};
    sources.global = {};

    el.__interpolations = el.__interpolations || {};
    el.__interpolations.data = el.__interpolations.data || {};
    el.__interpolations.locale = el.__interpolations.locale || {};

    // First of all checks if there is a data specified in the element config, if so, it creates the source
    if (Object.keys(el.data).length > 0) {

      sources.element.data = {};
      sources.element.data.scope = el;
      sources.element.data.obj = el.data;
      sources.element.data.isGlobal = false;
      sources.element.data.isLocale = false;
      sources.element.data.config = config ? config : null;
      sources.element.data.component = el;

    }

    eon.interpolation.bindVariables(el, sources);
    eon.interpolation.sources.push(sources);
    
    eon.interpolation.interpolate();

  }

};

/*
@function defineProperties
@description Creates the descriptor for the data object itself and for all its properties
@param {Object} source
@param {String} sourceName
*/

eon.interpolation.interpolate = function () {

  var sources, sourceTypeKeys;
  var sourceKeys, source, scope, interpolations;

  for (var k = 0; k < eon.interpolation.sources.length; k++) {

    sources = eon.interpolation.sources[k];
    sourceTypeKeys = Object.keys(eon.interpolation.sources[k])

    for (var i = 0; i < sourceTypeKeys.length; i++) {

      sourceKeys = Object.keys(sources[sourceTypeKeys[i]]);

      for (var j = 0; j < sourceKeys.length; j++) {

        source = sources[sourceTypeKeys[i]][sourceKeys[j]];
        
        scope = source.scope;
        interpolations = source.isLocale ? source.scope.__interpolations.locale : source.scope.__interpolations.data;
        
        eon.interpolation.setupListenerCallback(source, source.config);
        eon.interpolation.defineProperties(source, sourceKeys[j]);
        eon.interpolation.interpolateVariables(scope, source, source.obj, interpolations);

      }

    }


    if (sources.element.data) {

      eon.interpolation.setupListenerCallback(sources.element.data, source.config);
      eon.interpolation.defineProperties(sources.element.data, "data");

    }

  }

};

/*
@function defineProperties
@description Creates the descriptor for the data object itself and for all its properties
@param {Object} source
@param {String} sourceName
*/
eon.interpolation.bindVariables = function (el, sources) {

  var variables = el.template.querySelectorAll("eon-variable");

  // Loops all the inner element variables
  for (var i = 0; i < variables.length; i++) {
    eon.interpolation.bindVariable(el, sources, variables[i]);
  }

};

/*
@function defineProperties
@description Creates the descriptor for the data object itself and for all its properties
@param {Object} source
@param {String} sourceName
*/
eon.interpolation.bindVariable = function (el, sources, variable) {

  var isGlobal, scope, sourceType;
  var bindString, bindValue, isUndefined, root;
  
  // Sets some basic variables to be used later on
  isGlobal = eon.util.isTrue(variable.getAttribute("global"));
  bindString = variable.getAttribute("bind");
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
    sources[sourceType][sourceName].isLocale = (sourceName == "locale");
    sources[sourceType][sourceName].component = el;
    // TODO CONFIG

  }

  variable.__binded = true;

};

/*
@function defineProperties
@description Creates the descriptor for the data object itself and for all its properties
@param {Object} source
@param {String} sourceName
*/
eon.interpolation.bindWildVariable = function (variable) {

  var isLocale, scope, bindString, bindValue, isUndefined, root, interpolations, bindedInterpolations;

  bindString = variable.getAttribute("bind");
  scope = eon.interpolation.globalScope;
  isLocale = bindString.split(".")[0] == "locale" ? true : false;
  sourceName = isLocale ? "locale" : "data";

  root = sourceName != "locale" ? scope[sourceName] : scope;

  // Reads if there is already a value on the source if there is not then it assigns an empty string
  bindValue = eon.object.readFromPath(root, bindString);
  isUndefined = typeof bindValue == "undefined";
  bindValue = isUndefined ? "" : bindValue;

  // Reassigns the value to the source, in case there was no value
  if (isUndefined) {
    eon.object.assignToPath(root, bindString, bindValue);
  }

  interpolations = isLocale ? eon.interpolation.globalScope.__interpolations.locale : eon.interpolation.globalScope.__interpolations.data;
  variableBind = bindString.split(".");

  if (variableBind[0] == "locale") {
    variableBind.shift();
    variableBind = variableBind.join(".");
  } else {
    variableBind = bindString;
  }

  bindedInterpolations = eon.object.readFromPath(interpolations, variableBind);

  if (!bindedInterpolations) {
    bindedInterpolations = [];
    eon.object.assignToPath(interpolations, variableBind, bindedInterpolations);
  }

  bindedInterpolations.push(variable)
  variable.textContent = bindValue;

  variable.__binded = true;

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
}

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
}

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
}

/*
@function setupListenerCallback
@description Creates the private onDataChanged and onLocaleChange callbacks to handle the public ones
@param {Object} el
@param {Object} source
@param {Object} config
*/
eon.interpolation.setupListenerCallback = function (source, config) {
  var scope = source.scope;
  var isLocale = source.isLocale ? true : false;
  var callbackName = source.isLocale ? "_onLocaleChanged" : "_onDataChanged";

  // If the private callback doesnt exist creates it
  if (!scope[callbackName]) {

    eon.createCallback(callbackName, scope);

    // When any data changes (incluiding data itself), we manage the onDataChanged triggers depending on the situation
    scope[callbackName](function (keyPath, oldVal, newVal) {

      if (newVal.constructor === Object) {
        eon.interpolation.handleObjectChange(scope, keyPath, oldVal, newVal, config, isLocale);
      } else {
        eon.interpolation.handleVariableChange(scope, keyPath, oldVal, newVal, config, isLocale);
      }

    });

  }

}

/*
@function interpolate
@description Takes all the properties from data, finds its variable and sets its value
@param {Object} el
@param {Object} source
@param {Object} obj
@param {Object} interpolations
@param {String} bind
*/
eon.interpolation.interpolateVariables = function (el, source, obj, interpolations, bind) {
  var key, i, variableBind, variable;
  var root = bind;

  for (key in obj) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object the call ourselfs again to loop through our keys
      if (obj[key] && obj[key].constructor === Object) {

        root = bind ? bind + "." + key : key;
        
        interpolations[key] = interpolations[key] ? interpolations[key] : {};

        eon.interpolation.interpolateVariables(el, source, obj[key], interpolations[key], root);

      } else {

        variableBind = root ? root + "." + key : key;
        variableBind = source.isLocale ? "locale." + variableBind : variableBind;
        
        interpolations[key] = interpolations[key] ? interpolations[key] : [];
        
        // Looks for the variables matching the binding
        if (source.component) {
          Array.prototype.push.apply(interpolations[key], source.component.template.querySelectorAll(
            'eon-variable[bind="' + variableBind + '"][global="' + source.isGlobal + '"]'
          ));
        }
        
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
eon.interpolation.handleObjectChange = function (scope, keyPath, oldData, newData, config, isLocale) {
  var checked = {};
  var callbackName = isLocale ? "onLocaleChanged" : "onDataChanged";

  eon.triggerAllCallbackEvents(scope, config, callbackName, [keyPath, oldData, newData]);

  // Checks differences between the old and the new data
  checked = eon.interpolation.backwardDataDiffing(scope, keyPath, oldData, newData, checked, config, isLocale);

  // Checks differences between the new and the old data, escaping the already checked ones
  eon.interpolation.forwardDataDiffing(scope, keyPath, newData, checked, config, isLocale);
  eon.interpolation.createObjectPropDescriptors(scope, newData, keyPath, config);
}

// Handles the value change of the variable element and triggers onDataChanged
eon.interpolation.handleVariableChange = function (scope, keyPath, oldVal, newVal, config, isLocale) {
  var pathArray = keyPath.split(".");
  var callbackName = isLocale ? "onLocaleChanged" : "onDataChanged";
  var interpolations = isLocale ? scope.__interpolations.locale : scope.__interpolations.data;
  var interpolationPath;
  var variablesToChange;

  // Removes the first index of the pathArray, that corresponds to "data", which we dont need for the interpolations
  pathArray.shift();
  // Sets the path back together without data
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
}

/*
@function backwardDataDiffing
@description Compares the old data with the new one and triggers the changes
@param {Object} scope
@param {String} keyPath
@param {Object} oldData
@param {Object} newData
@param {Object} checked
@param {Object} config
*/
eon.interpolation.backwardDataDiffing = function (scope, keyPath, oldData, newData, checked, config, isLocale) {
  var newVal;
  // Loops through the oldData
  for (var key in oldData) {

    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object, we enter this function again for that object
      if (oldData[key].constructor === Object) {
        checked[key] = eon.interpolation.backwardDataDiffing(scope, keyPath + "." + key, oldData[key], newData ? newData[key] : newData, {}, config, isLocale);
      } else {
        // If there is no such property on the new Data we set it as an empty string
        newVal = newData ? newData[key] : "";

        // Handles the variable change
        eon.interpolation.handleVariableChange(scope, keyPath + "." + key, oldData[key], newVal, config, isLocale);

        if (newData && newData.hasOwnProperty(key)) {
          checked[key] = newData[key];
        }
      }
    }
  }

  return checked;
}

/*
@function forwardDataDiffing
@description Compares the data with the already checked object
@param {Object} scope
@param {String} keyPath
@param {Object} data
@param {Object} checked
@param {Object} config
*/
eon.interpolation.forwardDataDiffing = function (scope, keyPath, data, checked, config, isLocale) {
  var oldVal;
  // Loops through data
  for (var key in data) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object, we enter this function again for that object
      if (data[key].constructor === Object) {
        eon.interpolation.forwardDataDiffing(scope, keyPath + "." + key, data[key], checked ? checked[key] : checked, config, isLocale);
      } else {
        oldVal = checked ? checked[key] : "";
        // To only trigger variable change for properties that are not already checked/triggered
        if ((checked && !checked.hasOwnProperty(key)) || !checked) {
          eon.interpolation.handleVariableChange(scope, keyPath + "." + key, oldVal, data[key], config, isLocale);
        }
      }
    }
  }
}