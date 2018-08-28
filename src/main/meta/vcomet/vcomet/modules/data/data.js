// Create vcomet.data scope
vcomet.data = vcomet.data || {};

// NEEDED
vcomet.data.idProperty = "id";

// TO BE REMOVED Dummy data
vcomet.data.dummy = [
    {
        id: "0",
        name: "John"
    },
    {
        id: "1",
        name: "Janice"
    }
]
// Data store should be a Result object with the data as array or object
vcomet.data.data = (function() {
    function Result(data, el, sorted) {
      /**
      * Parse response object data to array
      * INTERNAL USE ONLY
      * @param  {[type]} data [description]
      * @return {[type]}      [description]
      */
      this.toArray = function(data, el) {
        // TODO - Create data array representation
        // PROVISIONAL - Do not process data object saving resources
        var arr = [];
        // TODO - If other format than json is supported by store requests
        this.__array = arr;
        return arr;
      };
      /**
      * Parse response data and set up custom object
      * INTERNAL USE ONLY
      * @param  {[type]} response [description]
      * @return {[type]}          [description]
      */
      this.toObject = function(data, el) {
        // Create associative array to present data
        var obj = {};
        // Parse response elements and populate associative array
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          // Item id as key and item itself as value
          obj[item[el.idProperty]] = item;
        }
        this.__object = obj;
        return obj;
      };
      this.__array = data.constructor === Array ? data : this.toArray(data, el);
      this.__object = data.constructor === Object ? data : this.toObject(data, el);
      this.__sorted = sorted;
    }
    Result.prototype.asArray = function() {
      return this.__array;
    };
    Result.prototype.asObject = function() {
      return this.__object;
    };
    return Result;
  })();

vcomet.data.QueryObject = function(data, buildHandler) {
     var instance = this;

     var data = data || {};

     this.options = function (o) {
         data.options = o;
         return instance;
     };

     this.limit = function (n) {
         data.limit = n;
         return instance;
     };

     this.validate = function (schema) {
         // Validate should trigger error callback on build
         data.validate = schema;
         return instance;
     };

     this.build = function (cb) {
         buildHandler(data, cb);
     };

     return instance;
 }

 vcomet.data.Adapter = function (config, queryObjectHandler) {
     // --- CREATE ---
     this.create = function (data) {
         return queryObjectHandler(config, {
             action: "create",
             data: data
         });
     };

     // --- READ ---
     this.read = function (id) {
         return queryObjectHandler(config, {
             action: "read",
             id: id
         });
     };

     // --- UPDATE ---
     this.update = function (id, data) {
         return queryObjectHandler(config, {
             action: "update",
             id: id,
             data: data
         });
     };

     // --- DELETE ---
     this.delete = function (id) {
         return queryObjectHandler(config, {
             action: "delete",
             id: id
         });
     };

     return this;

 };