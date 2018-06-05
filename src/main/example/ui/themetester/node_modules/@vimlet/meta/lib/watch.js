var watch = require('glob-watcher');
var path = require("path");
var commons = require("@vimlet/commons");
var meta = require("../index.js");
var fs = require("fs-extra");

exports.watch = function(include, exclude, data, output) {
  console.log("Watching:",include);
  var watcher = watch(include,{
    events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir']
  });
  watcher.on('change', function(filePath, stat) {
    if (!isExcluded(exclude, filePath)) {
      // Relative output is where the template will be saved after parsed
      var relativeOutput = getRelativeOutput(include, output, filePath);
      // Parse modified file
      meta.parseTemplateGlobAndWrite(null, filePath, null, data, relativeOutput, false);
      console.log("File modified:");
      console.log(filePath + " => " + path.join(relativeOutput,path.basename(filePath, ".vmt")));
    }
  });
  watcher.on('add', function(filePath, stat) {
    if (!isExcluded(exclude, filePath)) {
      // Relative output is where the template will be saved after parsed
      var relativeOutput = getRelativeOutput(include, output, filePath);
      // Parse modified file
      meta.parseTemplateGlobAndWrite(null, filePath, null, data, relativeOutput, false);
      console.log("File added:");
      console.log(filePath + " => " + path.join(relativeOutput, path.basename(filePath, ".vmt")));
    }
  });
  watcher.on('unlink', function(filePath, stat) {
    if (!isExcluded(exclude, filePath)) {
      // Relative output is where the template will be saved after parsed
      var relativeOutput = getRelativeOutput(include, output, filePath, true);
      var parsedPath = path.join(relativeOutput, path.basename(filePath, ".vmt"));
      if(fs.existsSync(parsedPath)){
        fs.unlinkSync(parsedPath);
        console.log("File deleted:");
        console.log(parsedPath);
      }
    }
  });
  watcher.on('addDir', function(filePath, stat) {
    var relativeOutput = getRelativeOutput(include, output, filePath);
    fs.mkdirs(path.join(relativeOutput, path.basename(filePath)), function(){
      console.log("Folder created:");
      console.log(filePath, "=>", path.join(relativeOutput, path.basename(filePath)));
    });
  });
  watcher.on('unlinkDir', function(filePath, stat) {
    var relativeOutput = getRelativeOutput(include, output, filePath, true);
    fs.remove(path.join(relativeOutput, path.basename(filePath)), function(){
      console.log("Folder removed:");
      console.log(path.join(relativeOutput, path.basename(filePath)));
    });
  });
  watcher.on('error', function(error) {
    if (process.platform === 'win32' && error.code === 'EPERM') {
      console.log("Deleting an empty folder doesn't fire on windows");      
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
    if (commons.io.isInPattern(filePath, include) || deleted) {
      var rootFromPattern = commons.io.getRootFromPattern(include);
      // Relative output is where the template will be saved after parse
      relativeOutput = path.dirname(path.relative(rootFromPattern, filePath));
      relativeOutput = path.join(output, relativeOutput);
    }
  } else {
    include.forEach(function(incl) {
      if (commons.io.isInPattern(filePath, incl) || deleted) {
        var rootFromPattern = commons.io.getRootFromPattern(incl);
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
  if(!excluded){
    return false;
  }
  if (!Array.isArray(excluded)) {
    return commons.io.isInPattern(filePath, excluded);
  } else {
    var isIn = false;
    excluded.forEach(function(excl) {
      if (commons.io.isInPattern(filePath, excl)) {
        isIn = true;
      }
    });
    return isIn;
  }
}
