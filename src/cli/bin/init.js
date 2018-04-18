var commons = require("@vimlet/commons");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var path = require("path");
var os = require("os");
var fs = require("fs-extra");
var url = require("url");
var readlineSync = require('readline-sync');
var Sync = require("sync");
var install = require("./install");

var templateURL = "https://github.com/vimlet/VimletComet-Examples/releases/download/vcomet-init/example.zip";

var projectPath;
var cwd = process.cwd();

module.exports = function (result) {
    console.log("\nWelcome to vComet");

    projectPath = result.path ? result.path : cwd;

    Sync(function () {
        try {
            downloadAndExtractTemplate.sync(null, templateURL, projectPath);

            // Call to install vcomet
            install({install: true});

        } catch (error) {
            console.error("\x1b[91m", "\nError: " + error);
            console.error("\x1b[0m"); // Reset color + newLine
        }
    })

}

function downloadAndExtractTemplate(file_url, projectPath, cb) {
    var downloadPath = path.join(os.homedir(), ".vcomet", "template");
    var fileName = path.basename(url.parse(file_url).pathname);
    fs.mkdirsSync(projectPath);
    var dest = path.join(downloadPath, fileName);

    if (!fs.existsSync(dest)) {
        commons.request.download(file_url, dest, null, null, function (error) {
            if (!error) {
                // Extract
                commons.compress.unpack(dest, projectPath, "zip", null, null, function (error) {
                    cb(error);
                });
            } else {
                cb(error);
            }
        });
    } else {
        // Extract
        commons.compress.unpack(dest, projectPath, "zip", null, null, function (error) {
            cb(error);
        });
    }

}