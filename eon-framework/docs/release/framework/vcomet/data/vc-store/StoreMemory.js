var Vimlet;
(function(Vimlet) {
  var StoreMemory;
  (function(StoreMemory) {
    /*
      @function fetch
      @description Fetch store data
      @param {Object} store [Store element] 
      @return {Object} [Fetched data]
    */
    function fetch(store) {
      // Get request
      StoreMemory.xhr(store, store.url, "onFetched");
      
      return store.data;
    }
    StoreMemory.fetch = fetch;
    /*
      @function sort
      @description Sort store data
      @param {Object} store [Store element] 
      @param {String} sortKey [Sorting key] 
      @param {Boolean} descending [Sorting direction] 
      @return {Object} [Fetched data]
    */
    function sort(store, sortKey, descending) {
      var data = store.data.asObject();
      var sortedData = {};
      var keyValueArray = [];
      // Store key value for each data item
      for (var key in data) {
        keyValueArray.push(data[key]);
      }
      // Sort keys
      if (descending) {
        // Use native javascript sort api for string and boolean values
        if (
          typeof keyValueArray[0][sortKey] === "string" ||
          typeof keyValueArray[0][sortKey] === "boolean"
        ) {
          // Default sort
          keyValueArray.sort(function(a, b) {
            return a[sortKey] < b[sortKey] ? 1 : -1;
          });
        } else {
          // Show as object use warning
          eon.warn.log(
            "store",
            "asObject() function will reorder sorted data with an integer idProperty"
          );
          // Descending sorting for number values
          keyValueArray.sort(function(a, b) {
            var value =
              (!b[sortKey] ? 0 : b[sortKey]) - (!a[sortKey] ? 0 : a[sortKey]);
            // Avoid empty values
            return value;
          });
        }
      } else {
        // Use native javascript sort api for string and boolean values
        if (
          typeof keyValueArray[0][sortKey] === "string" ||
          typeof keyValueArray[0][sortKey] === "boolean"
        ) {
          // Default ascending sort
          keyValueArray.sort(function(a, b) {
            return a[sortKey] > b[sortKey] ? 1 : -1;
          });
        } else {
          // Show as object use warning
          eon.warn.log(
            "store",
            "asObject() function will reorder sorted data with an integer idProperty"
          );
          keyValueArray.sort(function(a, b) {
            var value =
              (!a[sortKey] ? 0 : a[sortKey]) - (!b[sortKey] ? 0 : b[sortKey]);
            // Avoid empty values
            return value === 0 ? 1 : value;
          });
        }
      }
      // Update store data object
      store.data = new Result(keyValueArray, store, true);
    }
    StoreMemory.sort = sort;
    /*
      @function filter
      @description Filter store data
      @param {Object} store [Store element] 
      @param {Object} keyObj [Filter keys]
    */
    function filter(store, keyObj) {
      var size = 0;
      var data = store.data.asObject();
      var filteredData = {};
      var isArray = store.data.__sorted;
      var validItem;

      // If no key is specified retrieve root data
      if (keyObj && keyObj.constructor === Object) {
        if (isArray) {
          data = store.data.asArray();
          filteredData = [];

          for (var i = 0; i < data.length; i++) {
            validItem = true;
            // Loop through filter fields keys
            for (var key in keyObj) {
              // Data has the specified filter property
              if (data[i][key] !== keyObj[key]) {
                // Discard item from data
                validItem = false;
                break;
              }
            }
            // Add item to filtered data
            if (validItem) {
              filteredData.push(data[i]);
            }
          }
        } else {
          // Loop through store data
          for (var index in data) {
            validItem = true;
            // Loop through filter fields keys
            for (var key in keyObj) {
              // Data has the specified filter property
              if (data[index][key] !== keyObj[key]) {
                // Discard item from data
                validItem = false;
                break;
              }
            }
            // Add item to filtered data
            if (validItem) {
              filteredData[index] = data[index];
            }
          }
        }

        // Update store data object
        store.data = new Result(filteredData, store, store.data.__sorted);
      } 
      // Update store data items length
      store.size = Object.keys(filteredData).length;
    }
    StoreMemory.filter = filter;
    /*
      @function list
      @description List store data
      @param {Object} store [Store element] 
      @param {Array} attrs [List attributes]
      @return {Object} [Listed data]
    */
    function list(store, attrs) {
      // Process store data filters and lists
      StoreMemory.processData(store, attrs);
      // Trigger onSourceChanged event
      eon.triggerCallback("onSourceChanged", store);
      return store.data;
    }
    StoreMemory.list = list;
    /*
      @function listRemote
      @description List store data from a remote source
      @param {Object} store [Store element] 
      @param {Array} attrs [List attributes]
    */
    function listRemote(store, attrs) {
      // Request url data
      if(store.url) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", store.url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        // Callback
        xhr.onload = function(e) {
          // If operation has been completed - ready state 4
          if (xhr.readyState === 4) {
            // Response status succesfully completed - status 200
            if (xhr.status === 200) {
              // Set up store
              store._setUpData(xhr.response);
              // Remove unnecesary arguments for the list process
              delete attrs[0];
              // Update store data items length
              store.size = Object.keys(store.data.asObject()).length;
              // Process store data filters and lists
              StoreMemory.processData(store, attrs);
              // Trigger user callback once data has been retrieved
              eon.triggerCallback("onListRemote", store);
            } else {
              // Request error output
              eon.error.log(xhr.statusText);
            }
          }
        };
        // Execute request
        store.onLoaded(function(){xhr.send()});
        
      }
    }
    StoreMemory.listRemote = listRemote;
    /*
      @function listByAttr
      @description List store data locally
      @param {Object} store [Store element] 
      @param {Array} attrs [List attributes]
      @return {Object} [Listed data]
    */
    function listByAttr(store, attrs) {
      var data = store.data.asObject();
      var listedData = {};
      var isArray = store.data.__sorted;
      var validItem;
      // If no attribute is specified retrieve root data
      if (attrs.length > 0) {
        if (isArray) {
          data = store.data.asArray();
          listedData = [];
          // Loop through store data
          for (var i = 0; i < data.length; i++) {
            // Loop through fields keys arguments
            for (var j = 0; j < attrs.length; j++) {
              var attr = attrs[j];
              // Use only string arguments as valid
              if (typeof attr == "string") {
                // Check result item existance
                if (!listedData[i]) {
                  var item = {};
                  item[store.idProperty] = data[i][store.idProperty];
                  item[attr] = data[i][attr];
                  // Create new item
                  listedData.push(item);
                } else {
                  // Declare a new item property
                  listedData[i][attr] = data[i][attr];
                }
              }
            }
          }
        } else {
          // Loop through store data
          for (var key in data) {
            // Loop through fields keys arguments
            for (var i = 0; i < attrs.length; i++) {
              var attr = attrs[i];
              // Use only string arguments as valid
              if (typeof attr == "string") {
                // Check result item existance
                if (!listedData[key]) {
                  // Create new item
                  listedData[key] = {};
                  listedData[key][store.idProperty] = data[key][store.idProperty];
                  listedData[key][attr] = data[key][attr];
                } else {
                  // Declare a new item property
                  listedData[key][attr] = data[key][attr];
                }
              }
            }
          }
        }
      } else {
        listedData = data;
      }
      store.rootData = store.data = new Result(listedData, store, store.data.__sorted);
      return listedData;
    }
    StoreMemory.listByAttr = listByAttr;
    /*
      @function processData
      @description Apply data filters
      @param {Object} store [Store element] 
      @param {Array} attrs [List attributes]
    */
    function processData(store, attrs) {
      // List data
      if (attrs && attrs[0]) {
        StoreMemory.listByAttr(store, attrs[0]);
      }
      // Filter data if specified
      if (store.keys) {
        // Check keys format
        // Parse key object string to object
        store.keys =
          typeof store.keys === "string" ? eval("(" + store.keys + ")") : store.keys;
        // Call store filter
        StoreMemory.filter(store, store.keys);
      }
    }
    StoreMemory.processData = processData;
    /*
      @function getRange
      @description Store data get by range
      @param {Number} start [Data start item index] 
      @param {Number} limit [Data limit item index] 
      @param {Object} store [Store element]
    */
    function getRange(start, limit, raw, store) {
      // Monitor values
      start = start || start === 0 ? parseInt(start) : null;
      limit = limit || limit === 0 ? parseInt(limit) : null;

      var data = raw == false ? store.data.asObject() : Object.assign({}, store.rootData.asObject());
      var rangeData = {};
      var isArray = store.data.__sorted && !raw;
      
      if (isArray) {
        data = raw == false ? store.data.asArray() : Object.assign({}, store.rootData.asObject());
        rangeData = [];
      }
      
      var size = Object.keys(data).length;

      if (
        start &&
        typeof start == "number" &&
        (limit || typeof limit == "number")
      ) {
        var index = 1;

        function rangeLoop(item) {
          // Check start item key
          if (index >= start && index <= limit) {
            if (isArray) {
              rangeData.push(data[item]);
            } else {
              rangeData[item] = data[item];
            }
          }
          index++;
        }
        // Loop through data object items
        if (isArray) {
          for (var i = 0; i < data.length; i++) {
            rangeLoop(i);
            if (index > limit) {
              break;
            }
          }
        } else {
          for (var key in data) {
            rangeLoop(key);
            if (index > limit) {
              break;
            }
          }
        }
      } else {
        eon.error.log("store", "Incorrect range values format");
      }
      // Update store data object
      store.rangeData = new Result(rangeData, store, store.data.__sorted);
      store.size = size;

    }
    StoreMemory.getRange = getRange;
    /*
      @function getRangeRemote
      @description Get a store data range from a remote source
      @param {Number} start [Data start item index] 
      @param {Number} limit [Data limit item index] 
      @param {Object} store [Store element]
    */
    function getRangeRemote(start, limit, store) {
      // Request for data calling listRemote function
      store.listRemote(function() {
        // Get store data by range
        StoreMemory.getRange(start, limit, null, store);
        // Trigger user callback once data has been retrieved
        eon.triggerCallback("onGetRangeRemote", store);
      });
    }
    StoreMemory.getRangeRemote = getRangeRemote;
    /*
      @function get
      @description Get a store data item
      @param {String} id [Data item id] 
      @param {Object} store [Store element]
      @return {Object} [Store data item]
    */
    function get(id, store) {
      var data = store.rootData.asObject();
      // Get item from data object
      return data[id]
        ? data[id]
        : eon.error.log("store", "Item with id " + id + " not found");
    }
    StoreMemory.get = get;
    /*
      @function create
      @description Create a store data item from a local source
      @param {Object} item [Data item] 
      @param {Object} store [Store element]
    */
    function create(item, store) {
      var data = store.rootData.asObject();
      // New item has id
      if (item[store.idProperty]) {
        // Check item duplicated
        if (!data[item[store.idProperty]]) {
          // Create item
          data[item[store.idProperty]] = item;
        } else {
          // Item already exists
          return eon.error.log(
            "store",
            "Item with id " + item[store.idProperty] + " already exists"
          );
        }
      } else {
        // Add id value to item
        item[store.idProperty] = Object.keys(data).length.toString();
        // Create item
        data[item[store.idProperty]] = item;
      }
      if (item[store.idProperty]) {
        // Update store data
        store.rootData = store.data = new Result(data, store, store.data.__sorted);
        // Update store data items length
        store.size = Object.keys(store.data).length;
        // Trigger onSourceChanged event
        eon.triggerCallback("onSourceChanged", store);
        return item;
      } else {
        return eon.error.log("store", "Incorrect item format");
      }
    }
    StoreMemory.create = create;
    /*
      @function replace
      @description Create a store data item from a local source
      @param {String} id [Store data item id] 
      @param {Object} item [Store data item] 
      @param {Object} store [Store element]
      @return {Object} [Store data item]
    */
    function replace(id, item, store) {
      var data = store.rootData.asObject();
      // Check id coincidence
      if (data[id.toString()]) {
        // Add item id property if it hasn't
        item[store.idProperty] = id.toString();
        // Replace item
        data[id.toString()] = item;
        // Update store data
        store.rootData = store.data = new Result(data,store, store.data.__sorted);
        // Update store data items length
        store.size = Object.keys(store.data).length;
        // Trigger onSourceChanged event
        eon.triggerCallback("onSourceChanged", store);
      } else {
        // Item not found warning
        return eon.error.log("store", "Item with id " + id + " not found");
      }
      return item;
    }
    StoreMemory.replace = replace;
    /*
      @function update
      @description Update store data item from a local source
      @param {String} id [Store data item id] 
      @param {Object} item [Store data item] 
      @param {Object} store [Store element]
      @return {Object} [Store data item]
    */
    function update(id, item, store) {
      var data = store.rootData.asObject();
      // Check id coincidence
      if (data[id.toString()]) {
        // Add item id property if it hasn't
        item[store.idProperty] = id.toString();
        // Merge properties
        for (var key in item) {
          data[id.toString()][key] = item[key];
        }
        // Update store data
        store.rootData = store.data = new Result(data, store, store.data.__sorted);
        // Update store data items length
        store.size = Object.keys(store.data).length;
        // Trigger onSourceChanged event
        eon.triggerCallback("onSourceChanged", store);
      } else {
        // Item not found warning
        return eon.error.log("store", "Item with id " + id + " not found");
      }
      return item;
    }
    StoreMemory.update = update;
    /*
      @function remove
      @description Remove a store data item from a local source
      @param {String} id [Store data item id] 
      @param {Object} store [Store element]
      @return {Object} [Store data item]
    */
    function remove(id, store) {
      var data = store.rootData.asObject();
      // Check id coincidence
      if (data[id.toString()]) {
        var deleted = JSON.stringify(data[id.toString()]);
        // Delete item
        delete data[id.toString()];
        // Update store data
        store.rootData = store.data = new Result(data, store, store.data.__sorted);
        // Update store data items length
        store.size = Object.keys(store.data).length;
        // Trigger onSourceChanged event
        eon.triggerCallback("onSourceChanged", store);
        return JSON.parse(deleted);
      } else {
        // Item not found warning
        return eon.error.log("store", "Item with id " + id + " not found");
      }
    }
    StoreMemory.remove = remove;
    /*
      @function xhr
      @description Set up and execute a xhr request
      @param {Object} store [Store element]
      @param {String} url [Request url] 
      @param {String} eventName [Callback event name]
    */
    function xhr(store, url, eventName) {
      // Set up request
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      // TODO - Set range header parameter
      xhr.setRequestHeader("Content-Type", "application/json");
      // Callback
      xhr.onload = function(e) {
        // If operation has been completed - ready state 4
        if (xhr.readyState === 4) {
          // Response status succesfully completed - status 200
          if (xhr.status === 200) {
            // Set up store
            store._setUpData(xhr.response);
            // Update store data items length
            store.size = Object.keys(store.data.asObject()).length;
            // Process store data filters and lists
            StoreMemory.processData(store);
            // Trigger user callback once data has been retrieved
            eon.triggerCallback(eventName, store, store, [store.rootData]);
          }
        }
      };
      // Execute request
      store.onLoaded(function(){xhr.send()});
    }
    StoreMemory.xhr = xhr;
  })((StoreMemory = eon.StoreMemory || (eon.StoreMemory = {})));
})(Vimlet || (Vimlet = {}));
