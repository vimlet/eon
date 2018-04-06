var commons = require("@vimlet/commons");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var path = require("path");
var os = require("os");
var fs = require("fs-extra");
var url = require("url");
var readlineSync = require('readline-sync');
var Sync = require("sync");
var install = require("./install");

var gh_owner = "vimlet";
var gh_repo = "VimletComet";
var fileName = "vcomet-";

var projectPath;
var cwd = process.cwd();

module.exports = function (result) {
    console.log("\nWelcome to vComet");

    projectPath = result.path ? result.path : cwd;

    Sync(function () {
        try {
            var templateVersion = getLatestTemplateRealise.sync(null)
            fileName = fileName + templateVersion + ".zip";
            var templateURL = getGitHubTemplateURL.sync(null, fileName, templateVersion);

            downloadAndExtractTemplate.sync(null, templateURL, projectPath, templateVersion);

            // Call to install vcomet
            install({install: true});

        } catch (error) {
            console.error("\x1b[91m", "\nError: " + error);
            console.error("\x1b[0m"); // Reset color + newLine
        }
    })

}

function getLatestTemplateRealise(cb) {
    var url = "https://api.github.com/repos/" + gh_owner + "/" + gh_repo + "/releases/latest";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var responseObject = JSON.parse(xhttp.responseText);
                cb(null, responseObject.tag_name);
            } else {
                cb("Request status " + this.status);
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("User-Agent", "vimlet");
    xhttp.send();
}

function getGitHubTemplateURL(name, version, cb) {
    var url = "https://api.github.com/repos/" + gh_owner + "/" + gh_repo + "/releases/tags/" + version;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var responseObject = JSON.parse(xhttp.responseText);
                var asset;
                for (var i = 0; i < responseObject.assets.length; i++) {
                    asset = responseObject.assets[i];
                    if (asset.name.toLowerCase() == name.toLowerCase()) {
                        cb(null, asset.browser_download_url);
                        break;
                    }
                }
            } else {
                cb("Request status " + this.status);
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("User-Agent", "vimlet");
    xhttp.send();

}

function downloadAndExtractTemplate(file_url, projectPath, version, cb) {
    var downloadPath = path.join(os.homedir(), ".vcomet", "template-" + version, version);
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