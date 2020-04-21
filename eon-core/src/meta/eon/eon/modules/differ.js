eon.differ = eon.differ || {};

eon.differ.getDiff = function (obj1, obj2, options) {
  return eon.differ.compare(obj1, obj2, options);
}

eon.differ.getCreated = function (obj1, obj2, options) {
  return eon.differ.compare(obj1, obj2, options, "created");
};

eon.differ.getUpdated = function (obj1, obj2, options) {
  return eon.differ.compare(obj1, obj2, options, "updated");
};

eon.differ.getDeleted = function (obj1, obj2, options) {
  return eon.differ.compare(obj1, obj2, options, "deleted");
};

eon.differ.getMutations = function (obj1, obj2, options) {
  var mutations = {
    created: eon.differ.getCreated(obj1, obj2, options),
    updated: eon.differ.getUpdated(obj1, obj2, options),
    deleted: eon.differ.getDeleted(obj1, obj2, options)
  }
  return mutations;
}

// Loops through the two objects to compare them
eon.differ.compare = function (obj1, obj2, options, type) {
  var diffs = {};

  options = options || {};

  obj1 = JSON.parse(JSON.stringify(obj1));
  obj2 = JSON.parse(JSON.stringify(obj2));

  for (var key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      eon.differ.compareEntry(obj1[key], obj2[key], key, diffs, options, type);
    }
  }

  if (!type || type == "created") {
    for (key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (!obj1[key] && obj1[key] !== obj2[key]) {
          diffs[key] = obj2[key];
        }
      }
    }
  }

  return diffs;
}

// Compares values
eon.differ.compareEntry = function (item1, item2, key, diffs, options, type) {
  var type1 = Object.prototype.toString.call(item1);
  var type2 = Object.prototype.toString.call(item2);
  var differentType = (type1 !== type2);
  var differentArrays = type1 === '[object Array]' && !eon.differ.compareArray(item1, item2, options);
  var different = type1 != '[object Function]' && item1 !== item2;
  var isUndefined = type2 === '[object Undefined]';

  if (!type || type == "deleted") {
    if (isUndefined) {
      diffs[key] = null;
      return;
    }
  }

  if (type1 === '[object Object]') {
    var objDiff = eon.differ.compare(item1, item2, options, type);
    if (Object.keys(objDiff).length > 0) {
      diffs[key] = objDiff;
    }
    return;
  }

  if (!type || type == "updated") {
    if (!isUndefined && (differentType || differentArrays || different)) {
      diffs[key] = item2;
      return;
    }
  }

}

// Compares Array, it can accept an option for the arrayOrder, in case it matters
eon.differ.compareArray = function (arr1, arr2, options) {
  options.arrayOrder = "arrayOrder" in options ? options.arrayOrder : true;

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (var i = 0; i < arr1.length; i++) {

    if (options.arrayOrder) {
        if (!arr2[i] || Object.keys(differ.compare(arr2[i],arr1[i])).length > 0) {
        return false;
      }
    } else {
      var element = arr1[i];
      var index2 = arr2.indexOf(element);
      if (index2 < 0) {
        return false;
      } else {
        arr2.splice(index2, 1);
      }
    }
    
  }

  if (!options.arrayOrder && arr2.length > 0) {
    return false;
  }

  return true;
}