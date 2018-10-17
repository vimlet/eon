// USE ONLY WITH AMD!

// Add vpa to global scope to support script src imports
var scope = typeof global != "undefined" ? global : window;
scope["vpa"] = scope["vpa"] || {};
scope["module"] = scope["module"] || undefined;
// Module type detection flags
vpa.isCommonJS = false;
vpa.isAMD = false;
// Detect CommonJS/AMD
if (typeof module != "undefined" && typeof module.exports != "undefined") {
    vpa.isCommonJS = true;
}
// Base implementation
(function () {
    var self = this;
    if (vpa.isCommonJS) {
        module.exports = vpa;
    }
    self.use = function (a, cb) {
        if (vpa.isCommonJS) {
            var adapter;
            if (typeof a == "string") {
                adapter = module.parent.require("./" + a);
            }
            else {
                adapter = a;
            }
            module.exports = adapter;
            cb(adapter);
        }
        else {
            // Assume amd when "use" is called from the browser
            vpa.require([a], function (adapter) {
                cb(adapter);
            });
        }
    };
    // CommonJS, AMD and Global declarations
    self.declareAdapter = function (name, adapter, ext_module) {
        (function () {
            // CommonJS
            if (vpa.isCommonJS) {
                ext_module.exports = adapter;
            }
            // AMD
            if (vpa.isAMD) {
                vpa.define(function () {
                    return adapter;
                });
            }
            // Global
            vpa[name] = adapter;
        })();
    };
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


// This prevent errors when calling define out of a require
// since there's no proper AMD detection shim, we'll assume 
// AMD when vpa.use is called under the browser
vpa.isAMD = true;

// Allow custom AMD lib
vpa.define = vpa.define || define;
vpa.require = vpa.require || require;

vpa.define(function () {
  return vpa;
});