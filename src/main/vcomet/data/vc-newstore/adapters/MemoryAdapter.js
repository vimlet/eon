vpa.declareAdapter("MemoryAdapter", function (config) {
    var memory = {}; // Memory itself
    memory.data = {}; // Where data will be stored
    var memoryKeys = []; // Memory keys to keep creation order
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
                    id = counter;
                    query.data.id = "" + id;
                    counter++;
                }
                var validated = validate(query);
                if (validated) {
                    memory.data[id] = validated;
                    // Remove key if exist to keep order while overwritting
                    if (memoryKeys.indexOf(id) >= 0) {
                        memoryKeys.splice(memoryKeys.indexOf(id), 1);
                    }
                    memoryKeys.push("" + id);
                    resolve(JSON.parse(JSON.stringify(validated)));
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
            if (query.id) {
                if (memory.data[query.id]) {
                    resolve(JSON.parse(JSON.stringify(memory.data[query.id])));
                }
                else {
                    reject(new Error("Not found"));
                }
            }
            else {
                var start = query.limitStart || 0;
                var end = (query.limitAmount + query.limitStart) || memoryKeys.length;
                var result = [];
                for (var i = start; i < end; i++) {
                    result.push(memory.data[memoryKeys[i]]);
                }
                if (query.sortField) {
                    var asc = 1;
                    if (query.sortRule && (query.sortRule == "descendant" || query.sortRule == "desc")) {
                        asc = -1;
                    }
                    result = sortArray(result, query.sortField, asc);
                }
                resolve(JSON.parse(JSON.stringify(result)));
            }
        });
    }
    // @function update (private) [Update an existing entry from memory] @param query
    function update(query) {
        return new Promise(function (resolve, reject) {
            if (query.id) {
                if (query.data) {
                    if (memory.data[query.id]) {
                        query.data = deepMerge(memory.data[query.id], query.data);
                        var validated = validate(query);
                        if (validated) {
                            memory.data[query.id] = validated;
                            resolve(JSON.parse(JSON.stringify(validated)));
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
            if (query.id) {
                if (memory.data[query.id]) {
                    var result = JSON.parse(JSON.stringify(memory.data[query.id]));
                    delete memory.data[query.id];
                    // Remove key if exist to keep order while overwritting
                    if (memoryKeys.indexOf(query.id) >= 0) {
                        memoryKeys.splice(memoryKeys.indexOf(query.id), 1);
                    }
                    resolve(result);
                }
                else {
                    reject("Id not found");
                }
            }
            else {
                var result = JSON.parse(JSON.stringify(memory));
                memoryKeys = [];
                // Safe clear object and its copy baseAdapter._memory
                for (var key in memory.data) {
                    delete memory.data[key];
                }
                resolve(result);
            }
        });
    }
    // @function sortArray (private) [Sort an array of objects] @param array @param key @param asc (number) [1 if ascendant, -1 if descendant]
    function sortArray(array, key, asc) {
        asc = asc || 1;
        function compare(a, b) {
            if (a[key] < b[key]) {
                return -1 * asc;
            }
            else if (a[key] > b[key]) {
                return 1 * asc;
            }
            else {
                return 0;
            }
        }
        return array.sort(compare);
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
        var baseQuery = vpa.createBaseQuery(adapterData);
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
    var baseAdapter = vpa.createBaseAdapter(queryHandler);
    baseAdapter._memory = memory;
    return baseAdapter;
}, module);
