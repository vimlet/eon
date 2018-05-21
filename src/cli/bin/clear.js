var commons = require("@vimlet/commons");
var btoa = require("btoa");
var path = require("path");
var os = require("os");
var fs = require("fs-extra");
var url = require("url");
var rimraf = require("rimraf");
var Sync = require("sync");

module.exports = function (result) {

    var clearArguments = {
        cache: true
    };

    if (clearArguments[result.clear]) {
        // Remove .vcomet 
        if (result.clear.toLowerCase() == "cache") {
            var deletePath = path.join(os.homedir(), ".vcomet");
    
            rimraf.sync(deletePath);
        }
    } else {
        console.log('\nInvalid "clear" argument [' + Object.keys(clearArguments).toString() + ']\n');
    }

};