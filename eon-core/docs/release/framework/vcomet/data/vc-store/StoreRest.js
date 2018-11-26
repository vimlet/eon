var eon;
(function(eon) {
  var StoreRest;
  (function(StoreRest) {
    /**
     * --------------------------------------------------
     * REST STORE
     *  - Based on REST standard. Data manipulated on local associative
     *    array and on main resources
     * ---------------------------------------------------
     */
    /*
      @function fetch
      @description Fetch store data from a remote source
      @param {Object} store [Store element]
    */
    function fetch(store) {
      // TODO - Check connection and work on local data if disconnected
      // Get request
      StoreRest.restXhr(store, store.url, "onFetched");
    }
    StoreRest.fetch = fetch;
    /*
      @function sortRemote
      @description Sort store data from a remote source
      @param {Object} store [Store element]
      @param {String} key [Sorting key]
      @param {Boolean} descending [Sorting direction]
    */
    function sortRemote(store, key, descending) {
      // TODO - Check connection and work on local data if disconnected
      // Replace previous range params from url
      var sortParam = (descending ? "+" : "-") + key;
      var sortObj = {};
      sortObj[store.sortParam] = sortParam;
      store.url = eon.util.replaceParam(store.url, sortObj);
      // Get request
      StoreRest.restXhr(store, store.url, "onSortRemote", true);
    }
    StoreRest.sortRemote = sortRemote;
    /*
      @function filterRemote
      @description Filter store data from a remote source
      @param {Object} store [Store element]
      @param {String} keys [Filtering keys]
    */
    function filterRemote(store, keys) {
      // TODO - Check connection and work on local data if disconnected
      // Replace previous filter params from url
      var filterObj = {};
      filterObj[store.filterParam] =
        typeof keys !== "string" ? JSON.stringify(keys) : keys;
        store.url = eon.util.replaceParam(store.url, filterObj);
      // Get request
      StoreRest.restXhr(store, store.url, "onFilterRemote");
    }
    StoreRest.filterRemote = filterRemote;
    /**
     * **The store url could contain parameters from previous requests**
     * **This must be considered on every rest store specific request functions**
    */
    /*
      @function getRangeRemote
      @description Store data get by range from a remote source
      @param {Number} start [Data start item index]
      @param {Number} limit [Data limit item index]
      @param {Object} store [Store element]
    */
    function getRangeRemote(start, limit, store) {
      // TODO - Check connection and work on local data if disconnected
      // Replace previous range params from url
      store.url = eon.util.replaceParam(store.url, {
        start: start,
        limit: limit
      });
      // Get request
      StoreRest.restXhr(store, store.url, "onGetRangeRemote");
    }
    StoreRest.getRangeRemote = getRangeRemote;
    /*
      @function listRemote
      @description Store data list by attributes from a remote source
      @param {Object} store [Store element]
      @param {Array} attrs [List attributes]
    */
    function listRemote(store, attrs) {
      // TODO - Check connection and work on local data if disconnected
      // Replace previous list params from url
      var listObj = {};
      listObj[store.listParam] = JSON.stringify(attrs);
      store.url = eon.util.replaceParam(store.url, {
        list: JSON.stringify(attrs)
      });
      // Get request
      StoreRest.restXhr(store, store.url, "onListRemote");
    }
    StoreRest.listRemote = listRemote;
    /*
      @function getRemote
      @description Store data get by id from a remote source
      @param {String} id [Data item id]
      @param {Object} store [Store element]
    */
    function getRemote(id, store) {
      // TODO - Check connection and work on local data if disconnected
      // Add parameters to url
      var url = store._rootUrl + "/" + id;
      var item;
      // Set up request
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      // Callback
      xhr.onload = function(e) {
        // If operation has been completed - ready state 4
        if (xhr.readyState === 4) {
          // Response status successfully completed - status 200
          if (xhr.status === 200) {
            // Set response item to be returned
            item = JSON.parse(xhr.response);
            // TODO - Find a way of refresh local data
            // store.data[item[store.idProperty]] = item;
            // Trigger user callback once data has been retrieved
            eon.triggerCallback("onGetRemote", store, store, [item]);
          }
        }
      };
      // Execute request
      store.onLoaded(function(){xhr.send()});
    }
    StoreRest.getRemote = getRemote;
    /*
      @function createRemote
      @description Store data add item from a remote source
      @param {Object} item [Data item]
      @param {Object} store [Store element]
    */
    function createRemote(item, store) {
      // Check existing item id property;
      var itemId = item[store.idProperty];
      // Store resources url
      var url = !itemId ? store._rootUrl : store._rootUrl + "/" + itemId;
      // Set up request
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      // Request callback
      xhr.onload = function(e) {
        // If operation has been completed - ready state 4
        if (xhr.readyState === 4) {
          // Response status successfully completed - status 200
          if (xhr.status === 200) {
            // Set response item to be returned
            item = JSON.parse(xhr.response);
            // Refresh local data object
            eon.StoreMemory.create(item, store);
            // Trigger user callback once data has been retrieved
            eon.triggerCallback("onCreateRemote", store, store, [item]);
            // Trigger onSourceChanged event
            eon.triggerCallback("onSourceChanged", store);
          }
        }
      };
      // Execute request with post payload data
      store.onLoaded(function(){xhr.send(JSON.stringify(item))});
    }
    StoreRest.createRemote = createRemote;
    /*
      @function replaceRemote
      @description Store data replace item from a remote source
      @param {String} id [Data item id]
      @param {Object} item [Data item]
      @param {Object} store [Store element]
    */
    function replaceRemote(id, item, store) {
      // Validate arguments
      if (id >= 0 && Object.keys(item).length > 0) {
        // Store resources url
        var url = store._rootUrl + "/" + id;
        // Set up request
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        // Request callback
        xhr.onload = function(e) {
          // If operation has been completed - ready state 4
          if (xhr.readyState === 4) {
            // Response status successfully completed - status 200
            if (xhr.status === 200) {
              // Set response item to be returned
              item = JSON.parse(xhr.response);
              // Refresh local data object
              eon.StoreMemory.replace(id, item, store);
              // Trigger user callback once data has been retrieved
              eon.triggerCallback("onReplaceRemote", store, store, [item]);
              // Trigger onSourceChanged event
              eon.triggerCallback("onSourceChanged", store);
            }
          }
        };
      } else {
        eon.error.log(
          "store",
          "Cannot send replace request without an id or item object"
        );
      }
      // Execute request with post payload data
      store.onLoaded(function(){xhr.send(JSON.stringify(item))});
    }
    StoreRest.replaceRemote = replaceRemote;
    /*
      @function updateRemote
      @description Store data update item from a remote source
      @param {String} id [Data item id]
      @param {Object} item [Data item]
      @param {Object} store [Store element]
    */
    function updateRemote(id, item, store) {
      // Validate arguments
      if (id >= 0 && Object.keys(item).length > 0) {
        // Store resources url
        var url = store._rootUrl + "/" + id;
        // Set up request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        // Request callback
        xhr.onload = function(e) {
          // If operation has been completed - ready state 4
          if (xhr.readyState === 4) {
            // Response status successfully completed - status 200
            if (xhr.status === 200) {
              // Set response item to be returned
              item = JSON.parse(xhr.response);
              // Refresh local data object
              eon.StoreMemory.update(id, item, store);
              // Trigger user callback once data has been retrieved
              eon.triggerCallback("onUpdateRemote", store, store, [item]);
              // Trigger onSourceChanged event
              eon.triggerCallback("onSourceChanged", store);
            }
          }
        };
        // Execute request with post payload data
        store.onLoaded(function(){xhr.send(JSON.stringify(item))});
      } else {
        eon.error.log(
          "store",
          "Cannot send update request without an id or item object"
        );
      }
    }
    StoreRest.updateRemote = updateRemote;
    /*
      @function removeRemote
      @description Remove a store item by id from a remote source
      @param {String} id [Data item id]
      @param {Object} store [Store element]
    */
    function removeRemote(id, store) {
      // Validate arguments
      if (id) {
        // Add parameters to url
        var url = store._rootUrl + "/" + id;
        // Set up request
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        // Callback
        xhr.onload = function(e) {
          // If operation has been completed - ready state 4
          if (xhr.readyState === 4) {
            // Response status successfully completed - status 200
            if (xhr.status === 200) {
              // Set response item to be returned
              item = JSON.parse(xhr.response);
              // Refresh local data object
              eon.StoreMemory.remove(id, store);
              // Trigger user callback once data has been retrieved
              eon.triggerCallback("onRemoveRemote", store, store, [item]);
              // Trigger onSourceChanged event
              eon.triggerCallback("onSourceChanged", store);
            }
          }
        };
      } else {
        eon.error.log(
          "store",
          "Cannot send remove request without an id parameter"
        );
      }
      // Execute request
      store.onLoaded(function(){xhr.send()});
    }
    StoreRest.removeRemote = removeRemote;
    /**
     * Set up and execute xhr request
     * @param  {[type]} el      [description]
     * @param  {[type]} url     [description]
     * @param  {[type]} event   [description]
     * @return {[type]}         [description]
     */
    /*
      @function restXhr
      @description Set up and execute xhr request
      @param {Object} store [Store element]
      @param {String} url [Request url] 
      @param {String} eventName [Callback event name]
      @param {Boolean} sortRequest [Whether or not data has been sorted]
    */
    function restXhr(store, url, eventName, sortRequest) {
      // Set up request
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      // TODO - Set range header parameter
      xhr.setRequestHeader("Content-Type", "application/json");
      // Callback
      xhr.onload = function(e) {
        // If operation has been completed - ready state 4
        if (xhr.readyState === 4) {
          // Response status successfully completed - status 200
          if (xhr.status === 200) {
            // Set up store
            store._setUpData(xhr.response);
            // Process store data filters and lists
            eon.StoreMemory.processData(store);
            // Set data as sorted
            store.data.__sorted = sortRequest;
            // Update store data items length
            store.size = xhr.getResponseHeader("Total");
            // Trigger user callback once data has been retrieved
            eon.triggerCallback(eventName, store, store, [store.rootData]);
            eon.createCallback("onSourceChanged", store, store, [store.rootData]);
          }
        }
      };
      // Execute request
      store.onLoaded(function(){xhr.send()});
    }
    StoreRest.restXhr = restXhr;
  })((StoreRest = eon.StoreRest || (eon.StoreRest = {})));
})(eon || (eon = {}));
