eon.differ = eon.differ || {};

/*
@function getDiff
@description Returns the diff between the two objects
@param {Object} obj1
@param {Object} obj2
@param {Object} options
*/
eon.differ.getDiff = function (obj1, obj2, options) {
  return eon.differ.compare(obj1, obj2, options);
}

/*
@function getCreated
@description Returns the createdmutations
@param {Object} obj1
@param {Object} obj2
@param {Object} options
*/
eon.differ.getCreated = function (obj1, obj2, options) {
  return eon.differ.compare(obj1, obj2, options, "created");
};

/*
@function getUpdated
@description Returns the updated
@param {Object} obj1
@param {Object} obj2
@param {Object} options
*/
eon.differ.getUpdated = function (obj1, obj2, options) {
  return eon.differ.compare(obj1, obj2, options, "updated");
};

/*
@function getDeleted
@description Returns the deleted mutations
@param {Object} obj1
@param {Object} obj2
@param {Object} options
*/
eon.differ.getDeleted = function (obj1, obj2, options) {
  return eon.differ.compare(obj1, obj2, options, "deleted");
};

/*
@function getMutations
@description Returns the created, updated and deleted mutations
@param {Object} obj1
@param {Object} obj2
@param {Object} options
*/
eon.differ.getMutations = function (obj1, obj2, options) {
  var mutations = {
    created: eon.differ.getCreated(obj1, obj2, options),
    updated: eon.differ.getUpdated(obj1, obj2, options),
    deleted: eon.differ.getDeleted(obj1, obj2, options)
  }
  return mutations;
}

/*
@function compare
@description Loops through the two objects to compare them
@param {Object} obj1
@param {Object} obj2
@param {Object} options
@param {String} type
*/
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

// 
/*
@function compareEntry
@description Compares values
@param {Object} item1
@param {Object} item2
@param {String} key
@param {Object} diffs
@param {Object} options
@param {String} type
*/
eon.differ.compareEntry = function (item1, item2, key, diffs, options, type) {
  var type1 = Object.prototype.toString.call(item1);
  var type2 = Object.prototype.toString.call(item2);
  var differentType = (type1 !== type2);
  var differentArrays = type1 === '[object Array]' && !eon.differ.compareArray(item1, item2, options);
  var different = type1 != '[object Function]' && item1 !== item2;
  var isUndefined = type2 === '[object Undefined]';

  if (type == "deleted") {
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

/*
@function compareArray
@description Compares Array, it can accept an option for the arrayOrder, in case it matters
@param {Object} arr1
@param {Object} arr2
@param {Object} options
*/
eon.differ.compareArray = function (arr1, arr2, options) {
  options.arrayOrder = "arrayOrder" in options ? options.arrayOrder : true;

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (var i = 0; i < arr1.length; i++) {

    if (options.arrayOrder) {
      if (!arr2[i] || Object.keys(differ.compare(arr2[i], arr1[i])).length > 0) {
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

/*
@function createState
@description Returns a state object
@param {Object} data
*/
eon.createState = function (data) {
  var state = {};
  var stateOptions = data.options || {};

  // Public function to be called by the user
  state.sync = function () {
    // Gets the remote data
    data.getRemote(function (remoteError, remoteData) {
      // If there is no error in getting the remote data..
      if (!remoteError) {
        state.__remote = remoteData;

        // Get the local data
        data.getLocal(function (localError, localData) {
          // If there is no error in getting the local data..
          if (!localError) {
            state.__local = localData;

            // If the user provided a handleDiff function we called it sending the corresponding diff data
            if (data.handleDiff) {
              var diff = eon.differ.getDiff(state.__local, state.__remote, stateOptions.diffing);
              data.handleDiff(diff);
            }

            // If the user provided a handleMutations function we called it sending the corresponding mutations
            if (data.handleMutations) {
              var mutations = eon.differ.getMutations(state.__local, state.__remote, stateOptions.diffing);
              data.handleMutations(mutations.created, mutations.updated, mutations.deleted);
            }

          }
        });
      }
    });
  };

  return state;
};