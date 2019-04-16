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
var gh_repo = "eon";
// var gh_credentials;
var eonCoreFileName = "eon-core.zip";
var eonUIFileName = "eon-ui.zip";

var eonJsonObject = {};
var actualPackages = {};

var singlePackageMode;
var singlePackageName;

var localPath;
var localVersionPath;
var localCustomPath;
var versionJsonObject = {};

module.exports = function (result, cb) {
  // PATCH: This timeout fixes eon.json read error after template download and extract
  setTimeout(function () {
    eonJsonObject = {};
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
  }, 0);
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

    // Reads the eon.json to search the required versions
    if (fs.existsSync("eon.json")) {
      try {
        eonJsonObject = JSON.parse(fs.readFileSync("eon.json").toString());
      } catch (error) {
        cb("Unexpected syntax while reading eon.json\n\n" + error);
      }

      // If the project does not have eon.json
      // looks for a field "eon" in the package.json
    } else if (fs.existsSync("package.json")) {
      try {
        var packageJsonObject = JSON.parse(fs.readFileSync("package.json").toString());

        // When existing package.json but not exists eon field will create the eon.json
        if (packageJsonObject.eon) {
          eonJsonObject = packageJsonObject.eon;
        } else {
          var neweonJson = true;
        }

      } catch (error) {
        cb("Unexpected syntax while reading package.json\n\n" + error);
      }

    } else {
      var neweonJson = true;
    }

    if (!localPath) {
      localPath = eonJsonObject.path ? eonJsonObject.path : "eon";
    }

    localVersionPath = path.join(localPath, "version.json");
    localCustomPath = path.join(localPath, "custom");

    // If there is no file with the requires version
    // look for the latest version on GitHub
    // General installation            
    if (value === true || value === "true") {
      try {
        var packageVersion = getLatestEonRelease.sync(null);

        if (!eonJsonObject.eon || eonJsonObject.eon == "latest") {
          eonJsonObject.eon = packageVersion;
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

      if (packageName == "eon") {
        try {

          if (valueArray.length == 2) {
            checkPackageExists.sync(null, packageName, valueArray[1]);
            packageVersion = valueArray[1];
          } else {
            packageVersion = getLatestEonRelease.sync(null);
          }

          eonJsonObject[packageName] = packageVersion;
          if (!noSave) {
            fs.writeFileSync("eon.json", JSON.stringify(eonJsonObject, null, 2));
          }

        } catch (error) {
          cb(error);
        }

      } else {
        singlePackageMode = true;
        singlePackageName = packageName;
        packageVersion = valueArray.length == 2 ? valueArray[1] : getLatestDependencyRelease(packageName);

        if (!eonJsonObject.dependencies) {
          eonJsonObject.dependencies = {};
        }

        eonJsonObject.dependencies[packageName] = packageVersion;
      }
    }

    // Adds ignore file to the eon.json
    var ignoreArray = ["custom"];
    eonJsonObject.ignore = ignoreArray;

    // Generate eon.json if it does not exist.
    if (neweonJson && packageVersion && !noSave) {
      var neweonJsonPath = path.join(".", "eon.json");

      fs.createFileSync(neweonJsonPath);
      fs.writeFileSync(neweonJsonPath, JSON.stringify(eonJsonObject, null, 2));
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
    if (this.readyState === 4) {
      if (this.status === 200) {
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
function getLatestEonRelease(cb) {
  var url = "https://api.github.com/repos/" + gh_owner + "/" + gh_repo + "/releases/latest";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
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

  // In case of core and ui look for the file version.json inside the eon directory
  if (fs.existsSync(localVersionPath)) {
    try {
      versionJsonObject = JSON.parse(fs.readFileSync(localVersionPath).toString());
      foundPackages.eon = versionJsonObject.eon;
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

    // Update current eon.json 
    // TODO: Update dependencies too
    if (fs.existsSync("eon.json")) {
      var eonJsonFileObject = JSON.parse(fs.readFileSync("eon.json").toString());
      eonJsonFileObject.eon = eonJsonObject.eon;
      fs.writeFileSync("eon.json", JSON.stringify(eonJsonFileObject, null, 2));
    }

    var summaryMessage = "";

    // Avoid checking things twice by using flags
    var isEon = eonJsonObject.eon && actualPackages.eon != eonJsonObject.eon;
    var isSinglePackageDependency = singlePackageMode && (!(singlePackageName in actualPackages.dependencies) || actualPackages.dependencies[singlePackageName] != eonJsonObject.dependencies[singlePackageName]);
    var isMultiplePackageDependency = !singlePackageMode && eonJsonObject.dependencies;

    // Log install summary message
    if (isEon) {
      summaryMessage += formatSummaryMessage("eon", actualPackages.eon, eonJsonObject.eon);
    }

    if (isSinglePackageDependency) {
      summaryMessage += formatSummaryMessage(singlePackageName, actualPackages.dependencies[singlePackageName], eonJsonObject.dependencies[singlePackageName]);
    }

    if (isMultiplePackageDependency) {
      var dependenciesKeys = Object.keys(eonJsonObject.dependencies);
      dependenciesKeys.forEach(function (dependencyKey) {
        if (!(dependencyKey in actualPackages.dependencies) || actualPackages.dependencies[dependencyKey] != eonJsonObject.dependencies[dependencyKey]) {
          summaryMessage += formatSummaryMessage(dependencyKey, actualPackages.dependencies[dependencyKey], eonJsonObject.dependencies[dependencyKey]);
        }
      });
    }

    if (summaryMessage) {
      console.log('\nInstalling:\n' + summaryMessage + "\n");
    } else {
      console.log('\nNothing to install\n');
    }

    // eon
    if (isEon) {

      cleanLocal("eon");

      try {
        var url = getGitHubDownloadURL.sync(null, eonCoreFileName, eonJsonObject.eon);
        downloadAndExtract.sync(null, url, localPath, eonJsonObject.eon);
      } catch (error) {
        cb(error);
      }

      try {
        var url = getGitHubDownloadURL.sync(null, eonUIFileName, eonJsonObject.eon);
        downloadAndExtract.sync(null, url, localPath, eonJsonObject.eon);
      } catch (error) {
        cb(error);
      }

      updateeonVersion("eon", eonJsonObject.eon);
    }

    if (isSinglePackageDependency) {
      // Clean old if exist and install
      cleanLocal(singlePackageName);
      //TODO: coming soon
      console.log("coming soon!");
      // downloadAndExtract(packageUrl, path.join(localCustomPath, singlePackageName), eonJsonObject.dependencies[singlePackageName]);
    }

    if (isMultiplePackageDependency) {
      var dependenciesKeys = Object.keys(eonJsonObject.dependencies);
      dependenciesKeys.forEach(function (dependencyKey) {
        if (!(dependencyKey in actualPackages.dependencies) || actualPackages.dependencies[dependencyKey] != eonJsonObject.dependencies[dependencyKey]) {
          // Clean old if exist and install
          cleanLocal(dependencyKey);
          console.log("coming soon!");
          // downloadAndExtract(packageUrl, path.join(localCustomPath, dependencyKey), eonJsonObject.dependencies[dependencyKey]);
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

// Searches on GitHub the url to download the required version file
function getGitHubDownloadURL(name, version, cb) {
  var url = "https://api.github.com/repos/" + gh_owner + "/" + gh_repo + "/releases/tags/" + version;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
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

    if (name == "eon") {
      var ignoreArray = eonJsonObject.ignore;
      fs.readdirSync(localPath).forEach(function (file) {

        // Files that are specified in the ignore file of the eon.json will not be deleted
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
  // Create local eon storage path
  var downloadPath = path.join(os.homedir(), ".eon", "eon-" + version);
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
    commons.request.download(file_url, dest, {}, function (error) {
      if (!error) {
        // Extract
        commons.compress.unpack(dest, extractPath, {}, function (error) {
          cb(error);
        });
      } else {
        cb(error);
      }
    });

  } else {
    // Extract
    commons.compress.unpack(dest, extractPath, {}, function (error) {
      cb(error);
    });
  }

}

// Updates core and ui version of the version.json file
function updateeonVersion(name, version) {
  versionJsonObject[name] = version;
  fs.writeFileSync(localVersionPath, JSON.stringify(versionJsonObject, null, 2));
}