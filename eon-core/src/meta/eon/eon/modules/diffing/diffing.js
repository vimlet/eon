eon.dataDiff = function (config) {

  var self = this;

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
  /*
    @property {Boolean} orderSensitive
    @description Whether or not the keys order matters
  */
  // this.orderSensitive = config.hasOwnProperty("orderSensitive") ? config.orderSensitive : false;
  /*
    @property {Function} create
    @description Create operation
  */
  this.create = config.create;
  /*
    @property {Function} update
    @description Update operation
  */
  this.update = config.update;
  /*
    @property {Boolean} delete
    @description Delete operation
  */
  this.delete = config.delete;

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
    var isObject = data.constructor === Object && oldData.constructor === Object;
    var isMap = data.constructor === Map && oldData.constructor === Map;

    // Map is alrady order sensitive...
    if (isObject && !self.orderSensitive) {
      self._diff(data, oldData);
    } else if (isMap || self.orderSensitive) {
      self._diffMap(data, oldData);
    }

    self._processState();
    self._saveState(data);
  };

  /*
    @function create
    @description Create operation fallback
    @param {Object} data
  */
  this.create = this.create || function (data) {
    // Default create 
  };
  /*
    @function update
    @description Update operation fallback
    @param {Object} data
  */
  this.update = this.update || function (data) {
    // Default update 
  };
  /*
    @function delete
    @description Delete operation fallback
    @param {Object} data
  */
  this.delete = this.delete || function (data) {
    // Default delete 
  };

  // ## Private Functions ##

  this._diffMap = function (items, oldItems) {
    // Loop through properties in object 1
    items.forEach(function(value, key) {
      // Check property exists on both objects
      if (!oldItems.has(key)) {
        // :: Create item
        self._create(key, value, null);
      } else {
        // switch (typeof (items[key])) {
        switch (typeof (value)) {
          // Deep compare objects
          case "object":
            value 
            if (!self._compare(value, oldItems.get(key))) {
              // :: Update item
              self._update(key, value, oldItems.get(key));
            };
            break;
          // Compare function code
          case "function":
            if (typeof (oldItems.get(key)) != "undefined" || (value.toString() != oldItems.get(key).toString())) {
              // :: Update item
              self._update(key, value, oldItems.get(key));
            };
            break;
          // Compare values
          default:
            if (value != oldItems.get(key)) {
              // :: Update item
              self._update(key, value, oldItems.get(key));
            };
        }
      }
    });
    // Check oldItems for any extra properties
    oldItems.forEach(function(value, key) {
      // * Undefined properties are considered nonexistent
      if (typeof (value) == "undefined" || !items.has(key)) {
        // :: Delete item
        self._delete(key, items.get(key), value);
      };
    });
    return true;
  }

  /*
    @function (private) _diff
    @description Store differences between objects
    @param {Object} items
    @param {Object} oldItems
  */
  this._diff = function (items, oldItems) {
    // Loop through properties in object 1
    for (var key in items) {
      // Check property exists on both objects
      if (!oldItems.hasOwnProperty(key)) {
        // :: Create item
        self._create(key, items[key], null);
      } else {
        switch (typeof (items[key])) {
          // Deep compare objects
          case "object":
            if (!self._compare(items[key], oldItems[key])) {
              // :: Update item
              self._update(key, items[key], oldItems[key]);
            };
            break;
          // Compare function code
          case "function":
            if (typeof (oldItems[key]) != "undefined" || (items[key].toString() != oldItems[key].toString())) {
              // :: Update item
              self._update(key, items[key], oldItems[key]);
            };
            break;
          // Compare values
          default:
            if (items[key] != oldItems[key]) {
              // :: Update item
              self._update(key, items[key], oldItems[key]);
            };
        }
      }
    }
    // Check oldItems for any extra properties
    for (var key in oldItems) {
      // * Undefined properties are considered nonexistent
      if (typeof (oldItems[key]) == "undefined" || !items.hasOwnProperty(key)) {
        // :: Delete item
        self._delete(key, items[key], oldItems[key]);
      };
    }
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
  */
  this._saveState = function (data) {
    if(typeof self.storeStates === "number" && self.storeStates > 0) {  
      // Check state storage limit
      if(self.states.length >= self.storeStates) {
        // Remove first position state
        self.states.shift();
      }
      self.states.push(data);
    }
  }
  /*
    @function (private) _create
    @description Store create operation
    @param {Key} key
    @param {Value} value
    @param {Value} oldValue
  */
  this._create = function (key, value, oldValue) {
    // Default create 
    self._operations.push({
      type: "create",
      key: key,
      newValue: value,
      oldValue: oldValue
    });
  };
  /*
    @function (private) _update
    @description Store update operation
    @param {Key} key
    @param {Value} value
    @param {Value} oldValue
  */
  this._update = function (key, value, oldValue) {
    // Default update 
    self._operations.push({
      type: "update",
      key: key,
      newValue: value,
      oldValue: oldValue
    });
  };
  /*
    @function (private) _delete
    @description Store delete operation
    @param {Key} key
    @param {Value} value
    @param {Value} oldValue
  */
  this._delete = function (key, value, oldValue) {
    // Default delete 
    self._operations.push({
      type: "delete",
      key: key,
      newValue: value,
      oldValue: oldValue
    });
  };

}