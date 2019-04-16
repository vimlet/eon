eon.data = eon.data || {};

eon.data.MemoryAdapter = function () {
  // eon.vpa.declareAdapter("MemoryAdapter", function (config) {
  var memory = {}; // Memory itself
  memory.data = new Map(); // Where data will be stored
  var counter = 0;

  // @function create (private) [Create a new entry to the memory object with given data] @param query
  function create(query) {
    return new Promise(function (resolve, reject) {
      if (query.data) {
        var id;
        if (query.data.id) {
          id = query.data.id;
        }
        else {
          // ** Check if some data has already been inserted
          counter = memory.data.size ? memory.data.size + 1 : 0;
          id = counter;
          query.data.id = "" + id;
          counter++;
        }
        var validated = validate(query);
        if (validated) {
          memory.data.set(id, validated);
          resolve(validated);
        }
        else {
          reject(new Error("Validation error"));
        }
      }
      else {
        reject(new Error("Data not found"));
      }
    });
  }
  // @function read (private) [Read from memory or list if no id given] @param query
  function read(query) {
    return new Promise(function (resolve, reject) {
      // Check id value
      if (query.id) {
        if (memory.data.get(query.id)) {
          resolve(memory.data.get(query.id));
        } else {
          reject(new Error("Not found"));
        }
      } else {
        var keys;
        var result = new Map();
        // Sort data before get range
        if (query.sortField) {
          var asc = 1;
          if (query.sortRule && ~["descending", "desc"].indexOf(query.sortRule)) {
            asc = -1;
          }
          keys = sortArray(memory.data, query.sortField, asc);
        }
        // Check ranges
        var start = query.limitStart || 0;
        var end = (query.limitAmount + query.limitStart) || memory.data.size;
        end = end > memory.data.size ? memory.data.size : end;

        if (!keys) {
          keys = [];
          // Store map keys
          memory.data.forEach(function (value, key, map) {
            keys.push(key);
          });
        }
        // Build sorted map
        for (var i = start; i < end; i++) {
          // Check keys sorted 
          if (query.sortField) {
            result.set(keys[i].key, memory.data.get(keys[i].key));
          } else {
            result.set(keys[i], memory.data.get(keys[i]));
          }
        }
        resolve(result);
      }
    });
  }
  // @function update (private) [Update an existing entry from memory] @param query
  function update(query) {
    return new Promise(function (resolve, reject) {
      // Check null values
      if (query.id) {
        if (query.data) {
          // Check update target
          if (memory.data.get(query.id)) {
            // Merge current and new data
            query.data = deepMerge(memory.data.get(query.id), query.data);
            var validated = validate(query);
            if (validated) {
              // Set new validated data entry
              memory.data.set(query.id, validated);
              resolve(validated);
            }
            else {
              reject(new Error("Validation error"));
            }
          }
          else {
            reject(new Error("Id doesn't exist"));
          }
        }
        else {
          reject(new Error("Data not found"));
        }
      }
      else {
        reject(new Error("Id not found"));
      }
    });
  }
  // @function delete (private) [Delete from memory] @param query
  function remove(query) {
    return new Promise(function (resolve, reject) {
      // Check null values
      if (query.id) {
        // Check remove target
        if (memory.data.get(query.id)) {
          var result = memory.data.get(query.id);
          memory.data.delete(query.id);
          resolve(result);
        }
        else {
          reject("Id not found");
        }
      }
      else {
        // Remove all entries
        var result = memory;
        // Safe clear object and its copy baseAdapter._memory
        memory.data.forEach(function (value, key, map) {
          memory.data.delete(key);
        });
        resolve(result);
      }
    });
  }
  // @function sortArray (private) [Sort an array of objects] @param array @param key @param asc (number) [1 if ascendant, -1 if descendant]
  function sortArray(data, field, asc) {
    // ** IMPROVE
    var array = [];
    // Store map keys
    data.forEach(function (value, key, map) {
      array.push({
        key: key,
        field: data.get(key)[field]
      });
    });
    // Check ascending value
    asc = asc || 1;
    // Sort comparing function
    function compare(a, b) {
      if (a.field < b.field) {
        return -1 * asc;
      }
      else if (a.field > b.field) {
        return 1 * asc;
      }
      else {
        return 0;
      }
    }
    // Sort map keys
    array.sort(compare);
    return array;
  }
  // @function validate(private) [Not implemented yet] @param query
  function validate(query) {
    if (query.validate) {
      // Do something
    }
    return query.data;
  }
  // @function deepMerge (private) [Merge two objects] @param args
  var deepMerge = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var merged = {};
    var merge = function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (obj[prop] && typeof obj[prop] == 'object') {
            merged[prop] = deepMerge(merged[prop], obj[prop]);
          }
          else {
            merged[prop] = obj[prop];
          }
        }
      }
    };
    for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      merge(obj);
    }
    return merged;
  };
  var queryHandler = function (adapterData) {
    var baseQuery = eon.vpa.createBaseQuery(adapterData);
    baseQuery.result = function (cb) {
      var query = baseQuery.query;
      var result;
      var error;
      switch (query.action) {
        case "create":
          create(query).then(function (data) {
            result = data;
            cb(error, result);
          }).catch(function (er) {
            error = er;
            cb(error, result);
          });
          break;
        case "read":
          read(query).then(function (data) {
            result = data;
            cb(error, result);
          }).catch(function (er) {
            error = er;
            cb(error, result);
          });
          break;
        case "update":
          update(query).then(function (data) {
            result = data;
            cb(error, result);
          }).catch(function (er) {
            error = er;
            cb(error, result);
          });
          break;
        case "delete":
          remove(query).then(function (data) {
            result = data;
            cb(error, result);
          }).catch(function (er) {
            error = er;
            cb(error, result);
          });
          break;
      }
    };
    return baseQuery;
  };
  var baseAdapter = eon.vpa.createBaseAdapter(queryHandler);
  baseAdapter._memory = memory;
  return baseAdapter;
};
