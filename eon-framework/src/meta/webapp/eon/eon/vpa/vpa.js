// USE ONLY WITH SCRIPT SRC!

// Support module in any environment
var scope = typeof global != "undefined" ? global : window;
scope["module"] = scope["module"] || undefined;

// Global vpa declaration
scope.vpa = scope.vpa || {};

vpa.declareLocal = vpa.hasOwnProperty("declareLocal") ? vpa.declareLocal : true;
vpa.declareGlobal = vpa.hasOwnProperty("declareGlobal") ? vpa.declareGlobal : true;

vpa.useAmd = vpa.hasOwnProperty("useAmd") ? vpa.useAmd : false;
vpa.allowAmdRequire = vpa.hasOwnProperty("allowAmdRequire") ? vpa.allowAmdRequire : false;

if (vpa.useAmd || vpa.allowAmdRequire) {
  vpa.define = vpa.define || define;
  vpa.require = vpa.require || require;
  vpa.useAmd = true; // Force AMD when any related option is used
}

vpa.declareAdapter = function (name, adapter, ext_module) {
  (function () {
    if (vpa.declareLocal && vpa.useAmd) {
        vpa.define(function () {
          return adapter;
        });      
    }
    if (vpa.declareGlobal) {
      vpa[name] = adapter;
    }
  })();
};

// Base implementation
(function () {
    var self = this;
    // Base Query and Adapter Objects
    self.createBaseQuery = function (adapterData) {
        var BaseQuery = /** @class */ (function () {
            function BaseQuery() {
                this.query = adapterData || {};
            }
            BaseQuery.prototype.options = function (o) {
                this.query.options = o;
                return this;
            };
            BaseQuery.prototype.limit = function (start, amount) {
                this.query.limitStart = start;
                this.query.limitAmount = amount;
                return this;
            };
            BaseQuery.prototype.validate = function (schema) {
                this.query.validate = schema;
                return this;
            };
            BaseQuery.prototype.sort = function (field, rule) {
                this.query.sortField = field;
                this.query.sortRule = rule;
                return this;
            };
            BaseQuery.prototype.view = function (v) {
                this.query.view = v;
                return this;
            };
            BaseQuery.prototype.result = function (cb) {
                throw "Not implemented, please override result function";
            };
            return BaseQuery;
        }());
        return new BaseQuery();
    };
    self.createBaseAdapter = function (queryHandler) {
        var BaseAdapter = /** @class */ (function () {
            function BaseAdapter() {
            }
            BaseAdapter.prototype.create = function (data) {
                return queryHandler({
                    action: "create",
                    data: data
                });
            };
            BaseAdapter.prototype.read = function (id) {
                return queryHandler({
                    action: "read",
                    id: id
                });
            };
            BaseAdapter.prototype.update = function (id, data) {
                return queryHandler({
                    action: "update",
                    id: id,
                    data: data
                });
            };
            BaseAdapter.prototype.delete = function (id) {
                return queryHandler({
                    action: "delete",
                    id: id
                });
            };
            return BaseAdapter;
        }());
        return new BaseAdapter();
    };
}).apply(vpa);


// Allow vpa require
if (vpa.allowAmdRequire) {
  vpa.define(function () {
    return vpa;
  });
}