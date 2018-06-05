var os = require("os");
var path = require("path");
var fs = require("fs-extra");
var run = require("./run.js");

// Platform variables

// @property {string} linuxUserProfile [Linux user profile path]
exports.linuxUserProfile = path.join(os.homedir(), ".profile");
// @property {string} macUserProfile [Mac user profile path]
exports.macUserProfile = path.join(os.homedir(), ".bash_profile");

// Platform binaries
var windowsEnvironment = path.join(
  __dirname,
  "platform/windows_environment.exe"
);

/*
@function {boolean} isWindows
@description Asserts if platform is Windows
*/
exports.isWindows = function() {
  return os.platform() === "win32";
};

/*
@function {boolean} isLinux
@description Asserts if platform is Linux
*/
exports.isLinux = function() {
  return os.platform() === "linux";
};

/*
@function {boolean} isMac
@description Asserts if platform is Mac
*/
exports.isMac = function() {
  return os.platform() === "darwin";
};

/*
@function {boolean} is64Bit
@description Asserts if architecture is 64-bit
*/
exports.is64Bit = function() {
  return (
    process.arch === "x64" ||
    process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
  );
};

/*
@function {string} getUnixUserProfile
@description Returns Unix based system user profile path
*/
exports.getUnixUserProfile = function() {
  if (exports.isWindows()) {
    return null;
  } else {
    return exports.isMac() ? exports.macUserProfile : exports.linuxUserProfile;
  }
};

/*
@function setUserEnvironmentVariable
@description Sets environment variables without admin privileges
@param {string} key [Environment variable key]
@param {string} value [Environment variable value]
@param-optional {function} callback [Default done callback function(error, data)]
*/
exports.setUserEnvironmentVariable = function(key, value, callback) {
  // Check os
  if (exports.isWindows()) {
    run.exec(
      windowsEnvironment,
      ["setUserEnvironmentVariable", key, value],
      null,
      null,
      callback
    );
  } else {
    // Unix profile file
    var profileContent = fs.readFileSync(exports.getUnixUserProfile(), "utf8");

    // Write user variable
    if (profileContent.includes(key)) {
      // Erase existing variable
      profileContent = profileContent.replace(
        new RegExp(key + ".*"),
        key + "=" + '"' + value + '"'
      );
    } else {
      profileContent += key + "=" + '"' + value + '"' + "\n";
    }

    // Overwrite file with updated content
    fs.writeFileSync(exports.getUnixUserProfile(), profileContent, "utf8");

    // Call export
    var args = key + '="' + value + '"';

    callback();
  }
};

/*
@function addToUserPath
@description Sets path variables without admin privileges
@param {string} value [Path value to append]
@param-optional {function} callback [Default done callback function(error, data)]
*/
exports.addToUserPath = function(value, callback) {
  if (exports.isWindows()) {
    run.fetch(
      windowsEnvironment,
      ["getUserEnvironmentVariable", "Path"],
      null,
      function(error, userPath) {
        if (error) {
          callback(error);
        } else {
          userPath = userPath.trim();

          // Only add if does not exist
          if (!isInWindowsPath(userPath, value)) {
            if (userPath != "") {
              if (userPath.endsWith(";")) {
                value = userPath + value;
              } else {
                value = userPath + ";" + value;
              }
            }

            // Run windows command
            run.exec(
              windowsEnvironment,
              ["setUserEnvironmentVariable", "Path", value],
              null,
              null,
              callback
            );
          } else {
            callback();
          }
        }
      }
    );
  } else {
    // Unix profile file
    var profileContent = fs.readFileSync(exports.getUnixUserProfile(), "utf8");

    // Only add if does not exist, case sensitive check
    if (!profileContent.includes("PATH=" + '"' + value + ":$PATH" + '"')) {
      fs.appendFileSync(
        exports.getUnixUserProfile(),
        "PATH=" + '"' + value + ":$PATH" + '"' + "\n",
        "utf8"
      );
    }

    callback();
  }
};

/*
@function killProcessByName 
@description Kill a process by its name
@param {string} name [Name of the process to be killed]
@param-optional {function} execHandler [Default output callback function(out), redirects stdout when provided]
@param-optional {function} callback [Default done callback function(error, data)]
*/
exports.killProcessByName = function(name, execHandler, callback) {
  var command;
  var args;

  // TODO - COMMONS - Run output bug
  if (exports.isWindows()) {
    command = "taskkill";
    args = ["/f", "/im", name + "*"];
  } else {
    command = "killall";
    args = [name];
  }

  // Execute command
  run.exec(command, args, null, execHandler, callback);
};

/*
@function killProcessByName 
@description Creates a symbolic link without admin privileges
@param {string} dest [Symlink destination path]
@param {string} src [Symlink source path]
@param-optional {function} execHandler [Default output callback function(out), redirects stdout when provided]
@param-optional {function} callback [Default done callback function(error, data)]
*/
exports.createSymlink = function(dest, src, execHandler, callback) {

  // Windows symbolic link
  if (exports.isWindows()) {
    
    var command = "mklink";
    var args = ["/h", dest, src];

    // Check file type
    if (fs.lstatSync(src).isDirectory()) {
      args[0] = "/j";
    }
    
    run.exec(command, args, null, execHandler, callback);

  } else {
    // UNIX symbolic link
    fs.ensureSymlinkSync(src, dest);
    callback();
  }

};

/*
@function findExec
@description Asserts if a command is accessible from the command line
@param {string} binary [Symlink destination path]
@param-optional {function} callback [Default done callback function(error, data)]
*/
exports.findExec = function(binary, callback) {
  
  var command = "echo";
  var args = exports.isWindows() ? ["%PATH%"] : ["$PATH"];
  
  run.exec(command, args, null, function(out, error){

    if (!error) {
      // Binary paths array
      var binPaths = out.trim().split(";");
      var match;

      // Match binary
      match = matchBin(binary, binPaths);

      if(match){
        process.stdout.write(binary + " is already installed\n");
      } else {
        error = binary + " not found\n";
        process.stdout.write(binary + " not found\n");
      }

    } else {
      process.stdout.write(binary + " not found\n");
    }

    if (callback) {
      callback(error, match);
    }

  });

};

function isInWindowsPath(windowsPath, value) {
  windowsPath = windowsPath.toLowerCase();
  value = value.toLowerCase();

  if (!windowsPath.includes(";")) {
    return windowsPath == value;
  }

  var pathValues = windowsPath.split(";");
  var element;

  value = value.toLowerCase();

  for (var index = 0; index < pathValues.length; index++) {
    element = pathValues[index].toLowerCase();

    if (element == value) {
      return true;
      break;
    }
  }

  return false;
}

function matchBin(binary, binPaths) {
  
  var binPath, files, fileIndx, file, filename, match;

  // Loop through paths
  for (var i = 0; i < binPaths.length; i++) {
    binPath = binPaths[i];
    try {
      // Match binary with path directory binaries
      files = fs.readdirSync(path.resolve(binPath));

      for (fileIndx = 0; fileIndx < files.length; fileIndx++) {
        file = files[fileIndx];
        filename = file.split(".")[0].toLowerCase();
        // Check binary name
        if(filename === binary && binPath){
          match = path.join(binPath, file);
          break;
        }
      }
      if (match) { break; }

    } catch (err) {
      //do nothing
    }

  }

  return match;

}
