eon.interpolation = eon.interpolation || {};
eon.interpolation.tags = ["{{", "}}", "="];
eon.global = {};

// Replaces all the echo/script for its corresponding elements and prepares them
eon.interpolation.prepare = function (template) {

  // Extend vimlet.meta
  if (!vimlet.meta.sandbox) {
    vimlet.meta.sandbox = {
      "bind": function (keyPath, rootPath, global) {

        global = eon.util.isTrue(global) ? true : false;

        // If rootPath is provided we split it
        rootPath = rootPath && rootPath != "" ? rootPath.split(".") : rootPath;

        // If the first element of the rootPath is either "data" or "global" and it meets our conditions, then we remove this element from the rootPath
        if (rootPath && ((rootPath[0] == "data" && !global) || (rootPath[0] == "global"))) {

          rootPath.shift();
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

// Handles all the initial state of the data and variable elements
eon.interpolation.handleInterpolationVariables = function (el, config) {
  var variables = el.template.querySelectorAll("eon-variable");
  var currentVariable;

  var isGlobal, scope, source;
  var bindString, bindValue;

  var sources = {};

  el.__interpolations = el.__interpolations || {};

  // For each variable we take its binding and if we dont have a value for that key we set it as empty
  for (var i = 0; i < variables.length; i++) {

    currentVariable = variables[i];

    isGlobal = eon.util.isTrue(currentVariable.getAttribute("global"));

    bindString = currentVariable.getAttribute("bind");
    
    scope = isGlobal ? eon : el;
    sourceName = isGlobal ? "global" : "data";

    // Reads if there is already a value on the source if there is not then it assigns an empty string
    bindValue = eon.object.readFromPath(scope[sourceName], bindString);
    bindValue = typeof bindValue == "undefined" ? "" : bindValue;
    
    // Reassigns the value to the source, in case there was no value
    eon.object.assignToPath(scope[sourceName], bindString, bindValue);

    if (!sources[sourceName]) {

      sources[sourceName] = {};
      sources[sourceName].scope = scope;
      sources[sourceName].obj = scope[sourceName];

    }

  }

  var sourceKeys = Object.keys(sources);

  for (let j = 0; j < sourceKeys.length; j++) {

    source = sources[sourceKeys[j]];
    
    eon.interpolation.setupDataChangeCallback(el, source.scope, config);
    eon.interpolation.setupDataPropDescriptors(source.scope, sourceKeys[j]);
    eon.interpolation.interpolate(el, source.obj, el.__interpolations);

  }

};

// Creates the descriptor for the data object itself and for all its properties
// eon.interpolation.setupDataPropDescriptors = function (el, config) {
eon.interpolation.setupDataPropDescriptors = function (scope, sourceName) {
  
  // Defines its own descriptor, in case the whole "data" object changes
  Object.defineProperty(
    scope,
    sourceName,
    eon.interpolation.createPropDescriptor(scope, scope, sourceName, "", scope[sourceName])
  );

  // Loops through all the keys of the object
  eon.interpolation.createObjectPropDescriptors(scope, scope[sourceName], sourceName);
}

// Simple property descriptor creation that in case its changed it will trigger our internal callback
eon.interpolation.createPropDescriptor = function (scope, keyOwnerObj, key, keyPath, value) {
  var propDescriptor = {};

  // Update property value
  keyOwnerObj["__" + key] = value;

  // Redirect get and set to __key
  propDescriptor.get = function () {
    return keyOwnerObj["__" + key];
  };

  propDescriptor.set = function (value) {
    // Trigger onDataChanged
    eon.triggerCallback("_onDataChanged", scope, scope, [keyPath + key, keyOwnerObj["__" + key], value]);

    // Update property value
    keyOwnerObj["__" + key] = value;
  };

  return propDescriptor;
}

// When the property we want to observer is an object we create its descriptor and ones for its properties
eon.interpolation.createObjectPropDescriptors = function (el, obj, keyPath) {
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
        eon.interpolation.createPropDescriptor(el, obj, key, keyPath, value)
      );

      // If the value is an Object then we update the keyPath and create the propDescriptors
      if (value && value.constructor === Object) {
        keyPath = keyPath + key;
        eon.interpolation.createObjectPropDescriptors(el, value, keyPath);
      }
    }
  }
}

// Creates the private onDataChanged callback to handle the public one
eon.interpolation.setupDataChangeCallback = function (el, scope, config) {
  
  // If the private callback doesnt exist creates it
  if (!scope._onDataChanged) {
    eon.createCallback("_onDataChanged", scope);
  }

  // When any data changes (incluiding data itself), we manage the onDataChanged triggers depending on the situation
  scope._onDataChanged(function (keyPath, oldVal, newVal) {

    if (newVal.constructor === Object) {
      eon.interpolation.handleObjectChange(el, scope, keyPath, oldVal, newVal, config);
    } else {
      eon.interpolation.handleVariableChange(el, keyPath, oldVal, newVal, config);
    }

  });

}

// Takes all the properties from data, finds its variable and sets its value
eon.interpolation.interpolate = function (el, obj, interpolations, bind) {
  var key, i, variableBind, variable;
  
  for (key in obj) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object the call ourselfs again to loop through our keys
      if (obj[key] && obj[key].constructor === Object) {

        bind = bind ? bind + "." + key : key;
        interpolations[key] = {};

        eon.interpolation.interpolate(el, obj[key], interpolations[key], bind);

      } else {

        variableBind = bind ? bind + "." + key : key;

        // Looks for the variables matching the binding
        interpolations[key] = el.template.querySelectorAll(
          'eon-variable[bind="' + variableBind + '"]'
        );

        // For each variable found previously sets its value
        for (i = 0; i < interpolations[key].length; i++) {
          variable = interpolations[key][i];
          variable.textContent = obj[key];
        }
      }
    }
  }
}

// Handles the situation when a whole object has been changed
eon.interpolation.handleObjectChange = function (el, scope, keyPath, oldData, newData, config) {
  var checked = {};
  
  eon.triggerAllCallbackEvents(el, config, "onDataChanged", [keyPath, oldData, newData]);

  // Checks differences between the old and the new data
  checked = eon.interpolation.backwardDataDiffing(el, scope, keyPath, oldData, newData, checked, config);

  // Checks differences between the new and the old data, escaping the already checked ones
  eon.interpolation.forwardDataDiffing(el, scope, keyPath, newData, checked, config);
  eon.interpolation.createObjectPropDescriptors(scope, newData, keyPath, config);
}

// Handles the value change of the variable element and triggers onDataChanged
eon.interpolation.handleVariableChange = function (el, keyPath, oldVal, newVal, config) {
  var pathArray = keyPath.split(".");
  var interpolationPath;
  var variablesToChange;
  
  // Removes the first index of the pathArray, that corresponds to "data", which we dont need for the interpolations
  pathArray.shift();
  // Sets the path back together withouth data
  interpolationPath = pathArray.join(".");
  // Takes the variable elements for the path
  variablesToChange = eon.object.readFromPath(el.__interpolations, interpolationPath);

  // If it has variable elements changes its value 
  if (variablesToChange) {
    for (var i = 0; i < variablesToChange.length; i++) {
      variablesToChange[i].textContent = newVal;
    }
  }

  eon.triggerAllCallbackEvents(el, config, "onDataChanged", [interpolationPath, oldVal, newVal]);
}

// Compares the old data with the new one and triggers the changes
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
        eon.interpolation.handleVariableChange(el, keyPath + "." + key, oldData[key], newVal, config);

        if (newData && newData.hasOwnProperty(key)) {
          checked[key] = newData[key];
        }
      }
    }
  }

  return checked;
}

// Compares the data with the already checked object
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
        if ((checked && !checked[key]) || !checked) {
          eon.interpolation.handleVariableChange(el, keyPath + "." + key, oldVal, data[key], config);
        }
      }
    }
  }
}