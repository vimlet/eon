var watch = require('glob-watcher');
var path = require("path");
var io = require("@vimlet/io");
var fs = require("fs-extra");

exports.watch = function (include, output, options) {
  var meta = require("../index.js");
  options = options || {};
  options.clean = false;
  console.log("Watching:", include);
  var watcher = watch(include, {
    events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir']
  });
  watcher.on('change', function (filePath, stat) {
    if (!isExcluded(options.exclude, filePath)) {
      // Relative output is where the template will be saved after parsed
      var relativeOutput = getRelativeOutput(include, output, filePath);      
      fs.copy(path.join(filePath), path.join(relativeOutput, path.basename(filePath)), function (err) {
        console.log("Changed --> ", filePath + " => " + path.join(relativeOutput, path.basename(filePath)));
    });
    }
  });
  watcher.on('add', function (filePath, stat) {
    if (!isExcluded(options.exclude, filePath)) {
      // Relative output is where the template will be saved after parsed
      var relativeOutput = getRelativeOutput(include, output, filePath);
      // Parse modified file      
      fs.copy(path.join(filePath), path.join(relativeOutput, path.basename(filePath)), function (err) {
        console.log("Added --> ", filePath + " => " + path.join(relativeOutput, path.basename(filePath)));
    });
    }
  });
  watcher.on('unlink', function (filePath, stat) {
    if (!isExcluded(options.exclude, filePath)) {
      // Relative output is where the template will be saved after parsed
      var relativeOutput = getRelativeOutput(include, output, filePath, true);
      var parsedPath = path.join(relativeOutput, path.basename(filePath, ".vmt"));
      if (fs.existsSync(parsedPath)) {
        fs.unlinkSync(parsedPath);
        console.log("Removed --> ", parsedPath);
      }
    }
  });
  watcher.on('addDir', function (filePath, stat) {
    var relativeOutput = getRelativeOutput(include, output, filePath);
    fs.mkdirs(path.join(relativeOutput, path.basename(filePath)), function () {
      console.log("Folder created --> ", filePath, "=>", path.join(relativeOutput, path.basename(filePath)));
    });
  });
  watcher.on('unlinkDir', function (filePath, stat) {
    var relativeOutput = getRelativeOutput(include, output, filePath, true);
    fs.remove(path.join(relativeOutput, path.basename(filePath)), function () {
      console.log("Folder removed --> ", path.join(relativeOutput, path.basename(filePath)));
    });
  });
  watcher.on('error', function (error) {
    if (process.platform === 'win32' && error.code === 'EPERM') {
      // Deleting an empty folder doesn't fire on windows
    } else {
      broadcastErr(error);
    }
  });
};

exports.watchDirectory = function (include, exclude, callback) {
  var meta = require("../index.js");
  var watcher = watch(include, {
    events: ['add', 'change', 'unlink', 'unlinkDir']
  });
  watcher.on('change', function (filePath, stat) {
    if (!isExcluded(exclude, filePath)) {
      console.log("Changed --> ", filePath);
      callback();
    }
  });
  watcher.on('add', function (filePath, stat) {
    if (!isExcluded(exclude, filePath)) {
      console.log("Added --> ", filePath);
      callback();
    }
  });
  watcher.on('unlink', function (filePath, stat) {
    if (!isExcluded(exclude, filePath)) {
      console.log("Removed --> ", filePath);
      callback();
    }
  });
  watcher.on('unlinkDir', function (filePath, stat) {
    if (!isExcluded(exclude, filePath)) {
      console.log("Directory removed --> ", filePath);
      callback();
    }
  });
  watcher.on('error', function (error) {
    if (process.platform === 'win32' && error.code === 'EPERM') {
      // Deleting an empty folder doesn't fire on windows
    } else {
      broadcastErr(error);
    }
  });
};


/*
@function getRelativeOutput [Get path relative to output]
@param include [Include patterns]
@param output
@param filePath
@param deleted [Flag to know if the file was deleted so it skips files in pattern check]
*/
function getRelativeOutput(include, output, filePath, deleted) {
  var relativeOutput;
  if (!Array.isArray(include)) {
    if (io.isInPattern(filePath, include) || deleted) {
      var rootFromPattern = io.getRootFromPattern(include);
      // Relative output is where the template will be saved after parse
      relativeOutput = path.dirname(path.relative(rootFromPattern, filePath));
      relativeOutput = path.join(output, relativeOutput);
    }
  } else {
    include.forEach(function (incl) {
      if (io.isInPattern(filePath, incl) || deleted) {
        var rootFromPattern = io.getRootFromPattern(incl);
        // Relative output is where the template will be saved after parse
        relativeOutput = path.dirname(path.relative(rootFromPattern, filePath));
        relativeOutput = path.join(output, relativeOutput);
      }
    });
  }
  return relativeOutput;
}

/*
@function isExcluded [Check if a file is excluded. This function is used because watch doesn't accept exclude patterns]
@param excluded [exclude patterns]
@param filePath
@return boolean
*/
function isExcluded(excluded, filePath) {
  if (!excluded) {
    return false;
  }
  if (!Array.isArray(excluded)) {
    return io.isInPattern(filePath, excluded);
  } else {
    var isIn = false;
    excluded.forEach(function (excl) {
      if (io.isInPattern(filePath, excl)) {
        isIn = true;
      }
    });
    return isIn;
  }
}