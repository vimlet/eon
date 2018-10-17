var commons = require("@vimlet/commons");
var os = require("os");
var path = require("path");
var fs = require("fs-extra");
var url = require("url");
var rimraf = require("rimraf");
var Sync = require("sync");

var packagePath;

// TODO:
module.exports = function (result) {

    packagePath = result.path ? result.path : path.join("eon", "custom", result.publish);

    checkPakcage();
};

// Verify that the package exist and contains custom.version with a file version
function checkPakcage() {
    var customJsonPath;
    if (fs.existsSync(packagePath)) {
        customJsonPath = path.join(packagePath, "custom.json");

        if (customJsonPath) {
            var customJsonObject = JSON.parse(fs.readFileSync(customJsonPath).toString());
            var customVersion = customJsonObject.version;
        }
    }
}
