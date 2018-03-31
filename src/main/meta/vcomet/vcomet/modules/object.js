vcomet.object = vcomet.object || {};

vcomet.object.assignToPath = function(obj, path, value) {
  var pathArray = path.split(".");
  var target = obj;

  for (var i = 0; i < (pathArray.length - 1); i++) {
    if(!target[pathArray[i]]) {
      target[pathArray[i]] = {};
    }

    target = target[pathArray[i]];    
  }

  target[pathArray[pathArray.length - 1]] = value;
};

vcomet.object.readFromPath = function(obj, path) {
  var pathArray = path.split(".");
  var target = obj;

  for (var i = 0; i < pathArray.length; i++) {
    if (target) {
      target = target[pathArray[i]];    
    }
  }

  return target;
};
