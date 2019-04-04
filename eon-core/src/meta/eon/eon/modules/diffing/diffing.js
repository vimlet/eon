eon.dataDiff = function (config) {

  var self = this;
  config = !config || config.constructor !== Object ? {} : config;
  
  // ## Public Properties ##

  /*
    @property {Array} states
    @description Stored previous data states
  */
  this.states = [];
  /*
    @property {Boolean} storeStates (TEMP)
    @description Whether or not the previous states should be stored
  */
  this.storeStates = config.hasOwnProperty("storeStates") ? config.storeStates : 0;
  
  // ## Private Properties ##

  /*
    @property (private) {Object} _operations
    @description Diffing result operations
  */
  this._operations = [];


  // ## Public Functions ##

  /*
    @function commit
    @description Compare and process data
    @param {Object} data
    @param {Object} oldData
  */
  this.commit = function (data, oldData) {
    // Convert into Map object
    data = eon.util.objectToMap(data);
    oldData = eon.util.objectToMap(oldData);
    // Compare and persist data
    self._diff(data, oldData);
    self._processState();
    self._saveState(data);
  };

  /*
    @function create
    @description Create operation fallback
    @param {Object} data
  */
  this.create = config.create && config.create.constructor === Function ? config.create : function (data) {
    // Default create 
  };
  /*
    @function update
    @description Update operation fallback
    @param {Object} data
  */
  this.update = config.update && config.update.constructor === Function ? config.update : function (data) {
    // Default update 
  };
  /*
    @function delete
    @description Delete operation fallback
    @param {Object} data
  */
  this.delete = config.delete && config.delete.constructor === Function ? config.delete : function (data) {
    // Default delete 
  };

  // ## Private Functions ##

  /*
    @function (private) _diff
    @description Store differences between objects
    @param {Object} items
    @param {Object} oldItems
  */
  this._diff = function (items, oldItems) {
    var counter = -1;
    var oldCounter = -1;
    // Loop through properties in object 1
    items.forEach(function (value, key) {
      counter++;
      // Check property exists on both objects
      if (!oldItems.has(key)) {
        // :: Create item
        self._storeOperation("create", key, counter, value, null);
      } else {
        // switch (typeof (items[key])) {
        switch (typeof (value)) {
          // Deep compare objects
          case "object":
            value
            if (!self._compare(value, oldItems.get(key))) {
              // :: Update item
              self._storeOperation("update", key, counter, value, oldItems.get(key));
            };
            break;
          // Compare function code
          case "function":
            if (typeof (oldItems.get(key)) != "undefined" || (value.toString() != oldItems.get(key).toString())) {
              // :: Update item
              self._storeOperation("update", key, counter, value, oldItems.get(key));
            };
            break;
          // Compare values
          default:
            if (value != oldItems.get(key)) {
              // :: Update item
              self._storeOperation("update", key, counter, value, oldItems.get(key));
            };
        }
      }
    });
    // Check oldItems for any extra properties
    oldItems.forEach(function (value, key) {
      oldCounter++;
      // * Undefined properties are considered nonexistent
      if (typeof (value) == "undefined" || !items.has(key)) {
        // :: Delete item
        self._storeOperation("delete", key, oldCounter, items.get(key), value);
      };
    });
    return true;
  }
  /*
    @function (private) _compare
    @description Whether or not there are differences between objects keys
    @param {Object} items
    @param {Object} oldItems
  */
  this._compare = function (items, oldItems) {
    // Loop through properties in object 1
    for (var key in items) {
      // Check property exists on both objects
      if (items.hasOwnProperty(key) !== oldItems.hasOwnProperty(key)) return false;
      switch (typeof (items[key])) {
        // Deep compare objects
        case "object":
          if (!self._compare(items[key], oldItems[key])) return false;
          break;
        // Compare function code
        case "function":
          if (typeof (oldItems[key]) == "undefined" || (key != "compare" && items[key].toString() != oldItems[key].toString())) return false;
          break;
        // Compare values
        default:
          if (items[key] != oldItems[key]) return false;
      }
    }
    // Check old not matched keys
    for (var key in oldItems) {
      if (typeof (items[key]) == "undefined") return false;
    }
    return true;
  }
  /*
    @function (private) _processState
    @description Process data operations
  */
  this._processState = function () {
    self._operations.forEach(function (operation) {
      switch (operation.type) {
        case "create":
          self.create(operation);
          break;
        case "update":
          self.update(operation);
          break;
        default:
          self.delete(operation);
      }
    });
  }
  /*
    @function (private) _saveState
    @description Save state
    @param {Map} data
  */
  this._saveState = function (data) {
    if (typeof self.storeStates === "number" && self.storeStates > 0) {
      // Check state storage limit
      if (self.states.length >= self.storeStates) {
        // Remove first position state
        self.states.shift();
      }
      self.states.push(data);
    }
  }
  /*
    @function (private) _create
    @description Store operation
    @param {type} type
    @param {Key} key
    @param {Value} value
    @param {Value} oldValue
  */
  this._storeOperation = function (type, key, position, value, oldValue) {
    // Default create 
    self._operations.push({
      type: type,
      key: key,
      position: position,
      newValue: value,
      oldValue: oldValue
    });
  };

}