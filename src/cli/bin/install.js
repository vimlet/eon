var commons = require("@vimlet/commons");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var btoa = require("btoa");
var path = require("path");
var os = require("os");
var fs = require("fs-extra");
var url = require("url");
var rimraf = require("rimraf");
var Sync = require("sync");

var gh_owner = "vimlet";
var gh_repo = "VimletComet";
// var gh_credentials;
var vcometFileName = "vcomet-";

var vcometJsonObject = {};
var actualPackages = {};

var singlePackageMode;
var singlePackageName;

var localPath;
var localVersionPath;
var localCustomPath;
var versionJsonObject = {};

module.exports = function (result, cb) {

    vcometJsonObject = {};
    actualPackages = {};
    singlePackageMode = false;
    var noSave = result["no-save"];
    localPath = result.path;

    Sync(function () {
        try {
            // supportGitCredentials();
            handleRemoteVersions.sync(null, result.install, noSave);
            // Find installed packages
            handleLocalVersions.sync(null);
            // Install or update wanted packages        
            installPackages.sync(null);
            if (cb) {
                cb(null, true);
            }
        } catch (error) {
            console.error("\x1b[91m", "\nError: " + error);
            console.error("\x1b[0m"); // Reset color + newLine
            if (cb) {
                cb(error);
            }
        }
    });

};

function supportGitCredentials() {
    // Support credentials from .git/config    
    var gitConfigPath = path.resolve(".git/config");
    if (fs.existsSync(gitConfigPath)) {
        try {
            var gitConfigString = fs.readFileSync(gitConfigPath).toString();
            var match = new RegExp("(http[s]*:\\/\\/)(.+:[^@]+)", "g").exec(gitConfigString);
            if (match && match.length == 3) {
                gh_credentials = match[2];
            }
        } catch (error) {
            // Do nothing
        }
    }
}

// Finds the required version of the packages
function handleRemoteVersions(value, noSave, cb) {
    Sync(function () {

        // Reads the vcomet.json to search the required versions
        if (fs.existsSync("vcomet.json")) {
            try {
                vcometJsonObject = JSON.parse(fs.readFileSync("vcomet.json").toString());
            } catch (error) {
                cb("Unexpected syntax while reading vcomet.json\n\n" + error);
            }

            // If the project does not have vcomet.json
            // looks for a field "vcomet" in the package.json
        } else if (fs.existsSync("package.json")) {
            try {
                var packageJsonObject = JSON.parse(fs.readFileSync("package.json").toString());

                // When existing package.json but not exists vcomet field will create the vcomet.json
                if (packageJsonObject.vcomet) {
                    vcometJsonObject = packageJsonObject.vcomet;
                } else {
                    var newVcometJson = true;
                }

            } catch (error) {
                cb("Unexpected syntax while reading package.json\n\n" + error);
            }

        } else {
            var newVcometJson = true;
        }

        if (!localPath) {
            localPath = vcometJsonObject.path ? vcometJsonObject.path : "vcomet";
        }

        localVersionPath = path.join(localPath, "version.json");
        localCustomPath = path.join(localPath, "custom");

        // If there is no file with the requires version
        // look for the latest version on GitHub
        // General installation            
        if (value === true || value === "true") {
            try {
                var packageVersion = getLatestVcometRelease.sync(null);

                if (!vcometJsonObject.vcomet || vcometJsonObject.vcomet == "latest") {
                    vcometJsonObject.vcomet = packageVersion;
                }

            } catch (error) {
                cb(error);
            }
        } else {
            // Get name and version from value package@version
            // Install single package
            var valueArray = value.split("@");
            var packageName = valueArray[0].toLowerCase();
            var packageVersion;

            if (packageName == "vcomet") {
                try {

                    if (valueArray.length == 2) {
                        checkPackageExists.sync(null, packageName, valueArray[1]);
                        packageVersion = valueArray[1];
                    } else {
                        packageVersion = getLatestVcometRelease.sync(null);
                    }

                    vcometJsonObject[packageName] = packageVersion;
                    if (!noSave) {
                        fs.writeFileSync("vcomet.json", JSON.stringify(vcometJsonObject, null, 2));
                    }

                } catch (error) {
                    cb(error);
                }

            } else {
                singlePackageMode = true;
                singlePackageName = packageName;
                packageVersion = valueArray.length == 2 ? valueArray[1] : getLatestDependencyRelease(packageName);

                if (!vcometJsonObject.dependencies) {
                    vcometJsonObject.dependencies = {};
                }

                vcometJsonObject.dependencies[packageName] = packageVersion;
            }
        }

        // Adds ignore file to the vcomet.json
        var ignoreArray = ["custom"];
        vcometJsonObject.ignore = ignoreArray;

        // Generate vcomet.json if it does not exist.
        if (newVcometJson && packageVersion && !noSave) {
            var newVcometJsonPath = path.join(".", "vcomet.json");

            fs.createFileSync(newVcometJsonPath);
            fs.writeFileSync(newVcometJsonPath, JSON.stringify(vcometJsonObject, null, 2));
        }

        // Call callback
        cb();
    });

}

// Check if the required version exists
function checkPackageExists(name, version, cb) {
    var url = "https://api.github.com/repos/" + gh_owner + "/" + gh_repo + "/releases/tags/" + version;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                cb(null);
            } else {
                cb('Version "' + version + '" not valid');
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("User-Agent", "vimlet");
    xhttp.send();
}


// Search on GitHub the latest version of the required package
function getLatestVcometRelease(cb) {
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
    //TODO:
    // if(gh_credentials) {
    //     xhttp.setRequestHeader("Authorization", "Basic " + btoa(gh_credentials));  
    // }
    xhttp.send();
}

function getLatestDependencyRelease(packageName) {
    return "coming-soon";
}

// Finds the current version of the packages
function handleLocalVersions(cb) {

    var foundPackages = {
        dependencies: {}
    };

    // In case of core and ui look for the file version.json inside the vcomet directory
    if (fs.existsSync(localVersionPath)) {
        try {
            versionJsonObject = JSON.parse(fs.readFileSync(localVersionPath).toString());
            foundPackages.vcomet = versionJsonObject.vcomet;
        } catch (error) {
            cb("Unexpected syntax while reading version.json\n\n" + error);
        }
    }

    var currentCustomPath;
    var currentCustomJsonObject;

    // In case of custom packages, look for the file version.json within th specific directory of each custom component
    if (fs.existsSync(localCustomPath)) {
        fs.readdirSync(localCustomPath).forEach(function (file) {
            currentCustomPath = path.join(localCustomPath, file, "custom.json");
            if (fs.existsSync(currentCustomPath)) {
                try {
                    currentCustomJsonObject = JSON.parse(fs.readFileSync(currentCustomPath).toString());
                    foundPackages.dependencies[file] = currentCustomJsonObject.version;
                } catch (error) {
                    cb("Unexpected syntax while reading custom.json\n\n" + error);
                }
            }
        });
    }

    actualPackages = foundPackages;
    cb();
}



// Install required packages
function installPackages(cb) {

    Sync(function () {
        var summaryMessage = "";

        // Avoid checking things twice by using flags
        var isVcomet = vcometJsonObject.vcomet && actualPackages.vcomet != vcometJsonObject.vcomet;
        var isSinglePackageDependency = singlePackageMode && (!(singlePackageName in actualPackages.dependencies) || actualPackages.dependencies[singlePackageName] != vcometJsonObject.dependencies[singlePackageName]);
        var isMultiplePackageDependency = !singlePackageMode && vcometJsonObject.dependencies;

        // Log install summary message
        if (isVcomet) {
            summaryMessage += formatSummaryMessage("vcomet", actualPackages.vcomet, vcometJsonObject.vcomet);
        }

        if (isSinglePackageDependency) {
            summaryMessage += formatSummaryMessage(singlePackageName, actualPackages.dependencies[singlePackageName], vcometJsonObject.dependencies[singlePackageName]);
        }

        if (isMultiplePackageDependency) {
            var dependenciesKeys = Object.keys(vcometJsonObject.dependencies);
            dependenciesKeys.forEach(function (dependencyKey) {
                if (!(dependencyKey in actualPackages.dependencies) || actualPackages.dependencies[dependencyKey] != vcometJsonObject.dependencies[dependencyKey]) {
                    summaryMessage += formatSummaryMessage(dependencyKey, actualPackages.dependencies[dependencyKey], vcometJsonObject.dependencies[dependencyKey]);
                }
            });
        }

        if (summaryMessage) {
            console.log('\nInstalling:\n' + summaryMessage + "\n");
        } else {
            console.log('\nNothing to install\n');
        }

        // vComet
        if (isVcomet) {

            try {
                vcometFileName = vcometFileName + vcometJsonObject.vcomet + ".zip";
                var url = getGitHubDownloadURL.sync(null, vcometFileName, vcometJsonObject.vcomet);

                cleanLocal("vcomet");
                downloadAndExtract.sync(null, url, localPath, vcometJsonObject.vcomet);
                updateVcometVersion("vcomet", vcometJsonObject.vcomet);
            } catch (error) {
                cb(error);
            }

        }

        if (isSinglePackageDependency) {
            // Clean old if exist and install
            cleanLocal(singlePackageName);
            //TODO: coming soon
            console.log("coming soon!");
            // downloadAndExtract(packageUrl, path.join(localCustomPath, singlePackageName), vcometJsonObject.dependencies[singlePackageName]);
        }

        if (isMultiplePackageDependency) {
            var dependenciesKeys = Object.keys(vcometJsonObject.dependencies);
            dependenciesKeys.forEach(function (dependencyKey) {
                if (!(dependencyKey in actualPackages.dependencies) || actualPackages.dependencies[dependencyKey] != vcometJsonObject.dependencies[dependencyKey]) {
                    // Clean old if exist and install
                    cleanLocal(dependencyKey);
                    console.log("coming soon!");
                    // downloadAndExtract(packageUrl, path.join(localCustomPath, dependencyKey), vcometJsonObject.dependencies[dependencyKey]);
                }
            });
        }

        // Call callback
        cb();
    });

}

function formatSummaryMessage(package, actual, required) {
    var message;
    if (!actual) {
        // console.log(package + " => " + required);
        message = "\n" + package + " => " + required;
    } else {
        // console.log(package + ": " + actual + " => " + required);
        message = "\n" + package + ": " + actual + " => " + required;
    }
    return message;
}

// Searchs on GitHub the url to download the required version file
function getGitHubDownloadURL(name, version, cb) {
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
    //TODO:
    // if(gh_credentials) {
    //     xhttp.setRequestHeader("Authorization", "Basic " + btoa(gh_credentials));  
    // }
    xhttp.send();
}

// Remove the current file 
function cleanLocal(name) {
    if (fs.existsSync(localPath)) {
        var filePath;

        if (name == "vcomet") {
            var ignoreArray = vcometJsonObject.ignore;
            fs.readdirSync(localPath).forEach(function (file) {

                // Files that are specified in the ignore file of the vcomet.json will not be deleted
                if (ignoreArray.indexOf(file) == -1 && file != "version.json") {
                    filePath = path.join(localPath, file);
                    console.log("Removing: " + filePath);
                    // Using rimraf to avoid fs-extra not-empty errors
                    rimraf.sync(filePath);
                    // fs.removeSync(filePath);   
                }

            });

        } else {
            // Dependency
            filePath = path.join(localCustomPath, name);
            if (fs.existsSync(filePath)) {
                console.log("Removing: " + filePath);
                // Using rimraf to avoid fs-extra not-empty errors
                rimraf.sync(filePath);
                // fs.removeSync(filePath);   
            }
        }

    }

}

// Download and extract required packages
function downloadAndExtract(file_url, extractPath, version, cb) {
    // Create local vcomet storage path
    var downloadPath = path.join(os.homedir(), ".vcomet", "vcomet-" + version);
    var fileName = path.basename(url.parse(file_url).pathname);

    fs.mkdirsSync(downloadPath);
    var dest = path.join(downloadPath, fileName);
    // Check if already in local storage, if so extract only
    if (!fs.existsSync(dest)) {
        // Note: this is async
        //TODO:
        // if(gh_credentials) {
        //     commons.request.headers = {
        //         "User-Agent": "vimlet",
        //         "Authorization": "Basic " + btoa(gh_credentials)
        //     };
        // }
        commons.request.download(file_url, dest, null, null, function (error) {
            if (!error) {
                // Extract
                commons.compress.unpack(dest, extractPath, "zip", null, null, function (error) {
                    cb(error);
                });
            } else {
                cb(error);
            }
        });

    } else {
        // Extract
        commons.compress.unpack(dest, extractPath, "zip", null, null, function (error) {
            cb(error);
        });
    }

}

// Updates core and ui version of the version.json file
function updateVcometVersion(name, version) {
    versionJsonObject[name] = version;
    fs.writeFileSync(localVersionPath, JSON.stringify(versionJsonObject, null, 2));
}