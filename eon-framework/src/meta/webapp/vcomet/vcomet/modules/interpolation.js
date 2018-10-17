vcomet.interpolation = vcomet.interpolation || {};
vcomet.interpolation.tags = ["{{", "}}", "="];

// Replaces all the echo/script for its corresponding elements and prepares them
vcomet.interpolation.prepare = function (template) {


  // Extend vimlet.meta
  if(!vimlet.meta.sandbox) {
    vimlet.meta.sandbox = {
      "bind": function(s) {
        this.echo('<vc-variable bind="' + s + '"></vc-variable>');
      }
    };
  }
  if(!vimlet.meta.shortcut) {
    vimlet.meta.shortcut = {
      "@": function(s) {
        return "bind(\"" + s.trim() + "\");";
      }
    };
  }


  vimlet.meta.tags = vcomet.interpolation.tags;
  vimlet.meta.parse(window, template.innerHTML, null, function(result){
    template.innerHTML = result;
  });

  return template;
};

// Handles all the initial state of the data and variable elements
vcomet.interpolation.handleInterpolationVariables = function (el, config) {
  var variables = el.template.querySelectorAll("vc-variable");
  var currentVariable;
  var bindString;
  var bindValue;

  el.__interpolations = el.__interpolations || {};

  // For each variable we take its binding and if we dont have a value for that key we set it as empty
  for (var i = 0; i < variables.length; i++) {
    currentVariable = variables[i];
    bindString = "data." + currentVariable.getAttribute("bind");
    bindValue = vcomet.object.readFromPath(el, bindString);

    bindValue = typeof bindValue == "undefined" ? "" : bindValue;

    vcomet.object.assignToPath(el, bindString, bindValue);
  }

  vcomet.interpolation.setupDataChangeCallback(el, config);
  vcomet.interpolation.setupDataPropDescriptors(el, config);
  vcomet.interpolation.interpolate(el, el.data, el.__interpolations);
};

// Creates the private onDataChanged callback to handle the public one
vcomet.interpolation.setupDataChangeCallback = function (el, config) {
  // If the private callback doesnt exist creates it
  if (!el._onDataChanged) {
    vcomet.createCallback("_onDataChanged", el);
  }

  // When any data changes (incluiding data itself), we manage the onDataChanged triggers depending on the situation
  el._onDataChanged(function (keyPath, oldVal, newVal) {

    if (keyPath == "data") {
      vcomet.interpolation.replaceData(el, oldVal, newVal, config);
    } else {
      vcomet.interpolation.handleVariableChange(el, keyPath, oldVal, newVal, config);
    }

  });
}

// Takes all the properties from data, finds its variable and sets its value
vcomet.interpolation.interpolate = function (el, obj, interpolations, bind) {
  var key, i, variableBind, variable;
  
  for (key in obj) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object the call ourselfs again to loop through our keys
      if (obj[key] && obj[key].constructor === Object) {

        bind = bind ? bind + "." + key : key;
        interpolations[key] = {};

        vcomet.interpolation.interpolate(el, obj[key], interpolations[key], bind);

      } else {

        variableBind = bind ? bind + "." + key : key;

        // Looks for the variables matching the binding
        interpolations[key] = el.template.querySelectorAll(
          'vc-variable[bind="' + variableBind + '"]'
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

// Handles the value change of the variable element and triggers onDataChanged
vcomet.interpolation.handleVariableChange = function (el, keyPath, oldVal, newVal, config) {
  var interpolations = el.__interpolations;
  var pathArray = keyPath.split(".");
  var interpolationPath;
  var variablesToChange;

  // Removes the first index of the pathArray, that corresponds to "data", which we dont need for the interpolations
  pathArray.shift();
  // Sets the path back together withouth data
  interpolationPath = pathArray.join(".");
  // Takes the variable elements for the path
  variablesToChange = vcomet.object.readFromPath(el.__interpolations, interpolationPath);

  // If it has variable elements changes its value 
  if (variablesToChange) {
    for (var i = 0; i < variablesToChange.length; i++) {
      variablesToChange[i].textContent = newVal;
    }
  }
  
  vcomet.triggerAllCallbackEvents(el, config, "onDataChanged", [interpolationPath, oldVal, newVal]);
}

// Handles the situation when the whole data has been changed for another object
vcomet.interpolation.replaceData = function (el, oldData, newData, config) {
  var checked = {};
  
  vcomet.triggerAllCallbackEvents(el, config, "onDataChanged", ["data", oldData, newData]);

  // Checks differences between the old and the new data
  checked = vcomet.interpolation.backwardDataDiffing(el, "data", oldData, newData, checked, config);

  // Checks differences between the new and the old data, escaping the already checked ones
  vcomet.interpolation.forwardDataDiffing(el, "data", newData, checked, config);
  vcomet.interpolation.createObjectPropDescriptors(el, newData, "data", config);
}

// Compares the old data with the new one and triggers the changes
vcomet.interpolation.backwardDataDiffing = function (el, keyPath, oldData, newData, checked, config) {
  var newVal;
  // Loops through the oldData
  for (var key in oldData) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object, we enter this function again for that object
      if (oldData[key].constructor === Object) {
        checked[key] = vcomet.interpolation.backwardDataDiffing(el, keyPath + "." + key, oldData[key], newData ? newData[key] : newData, {}, config);
      } else {
        // If there is no such property on the new Data we set it as an empty string
        newVal = newData ? newData[key] : "";
        // Handles the variable change
        vcomet.interpolation.handleVariableChange(el, keyPath + "." + key, oldData[key], newVal, config);

        if (newData && newData.hasOwnProperty(key)) {
          checked[key] = newData[key];
        }
      }
    }
  }

  return checked;
}

// Compares the data with the already checked object
vcomet.interpolation.forwardDataDiffing = function (el, keyPath, data, checked, config) {
  var oldVal;
  // Loops through data
  for (var key in data) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object, we enter this function again for that object
      if (data[key].constructor === Object) {
        vcomet.interpolation.forwardDataDiffing(el, keyPath + "." + key, data[key], checked ? checked[key] : checked, config);
      } else {
        oldVal = checked ? checked[key] : "";
        // To only trigger variable change for properties that are not already checked/triggered
        if ((checked && !checked[key]) || !checked) {
          vcomet.interpolation.handleVariableChange(el, keyPath + "." + key, oldVal, data[key], config);
        }
      }
    }
  }
}

// Creates the descriptor for the data object itself and for all its properties
vcomet.interpolation.setupDataPropDescriptors = function (el, config) {
  // Also creates a propDescriptor for the base object property
  el.__data = el.data;

  // Defines its own descriptor, in case the whole "data" object changes
  Object.defineProperty(
    el,
    "data",
    vcomet.interpolation.createPropDescriptor(el, el, "data", "", el.data, config)
  );

  // Loops through all the keys of the object
  vcomet.interpolation.createObjectPropDescriptors(el, el.data, "data", config);
}

// Simple property descriptor creation that in case its changed it will trigger our internal callback
vcomet.interpolation.createPropDescriptor = function (callbackOwner, keyOwnerObj, key, keyPath, value, config) {
  var propDescriptor = {};

  // Update property value
  keyOwnerObj["__" + key] = value;

  // Redirect get and set to __key
  propDescriptor.get = function () {
    return keyOwnerObj["__" + key];
  };

  propDescriptor.set = function (value) {
    // Trigger onDataChanged
    vcomet.triggerCallback("_onDataChanged", callbackOwner, callbackOwner, [keyPath + key, keyOwnerObj["__" + key], value]);

    // Update property value
    keyOwnerObj["__" + key] = value;
  };

  return propDescriptor;
}

// When the property we want to observer is an object we create its descriptor and ones for its properties
vcomet.interpolation.createObjectPropDescriptors = function (el, obj, keyPath, config) {
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
        vcomet.interpolation.createPropDescriptor(el, obj, key, keyPath, value, config)
      );

      // If the value is an Object then we update the keyPath and create the propDescriptors
      if (value && value.constructor === Object) {
        keyPath = keyPath + key;
        vcomet.interpolation.createObjectPropDescriptors(el, value, keyPath, config);
      }
    }
  }
}