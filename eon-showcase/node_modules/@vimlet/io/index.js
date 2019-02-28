//@header Provide methods for listing, copying, deletion and moving files. Glob implemented.
var path = require("path");
var glob = require("glob");
var fs = require("fs-extra");
var rimraf = require("rimraf");

/*
@function getFiles {object[]} [Get included files, returns an object wich contains relative path and root folder]
@param dir {string[]} [Array of patterns to search or single pattern]
@param options [exclude: patterns to exclude from search, ignoreExtension: ignore file extensions, includeFolders: Boolean to include folders as paths, default false]
 */
exports.getFiles = function (dir, options) {
  options = options || {};
  if (options.ignoreExtension) {
    var noExtensionDir = [];
    if (Array.isArray(dir)) {
      dir.forEach(function (d) {
        noExtensionDir.push(exports.getRootFromPattern(d));
      });
      dir = noExtensionDir;
    } else {
      dir = exports.getRootFromPattern(dir);
    }
  }
  var result = [];
  if (!Array.isArray(dir)) {
    var fileObj = {
      root: exports.getRootFromPattern(dir),
      files: []
    };
    fileObj.files = getFileList(dir, options.exclude, options);
    result.push(fileObj);
  } else {
    dir.forEach(function (d) {
      var fileObj = {
        root: exports.getRootFromPattern(d),
        files: []
      };
      fileObj.files = getFileList(d, options.exclude, options);
      result.push(fileObj);
    });
  }
  return result;
};


/*
@function absoluteFiles {string[]} (public) [Return an array of absolute paths from a file index]
@param index {object} [Object with folders and relative paths]
 */
exports.absoluteFiles = function (index) {
  var result = [];
  index.forEach(function (folder) {
    folder.files.forEach(function (file) {
      var currentF = path.join(folder.root, file);
      result.push(currentF);
    });
  });
  return result;
};

/*
@function (private) getFileList [Get files recursively from directory] {string[]}
@param dir {string} [Directory to search]
@param exclude {string[]} [string[] of patterns to exclude from search]
@param options [includeFolders: Boolean to include folders as paths, default false]
 */
function getFileList(dir, exclude, options) {
  options = options || {};
  //If it gets a fonder instead of a pattern, take all files in folder
  if (!glob.hasMagic(dir)) {
    if (exports.isDirectory(dir)) {
      dir = path.join(dir, "**/*");
    }
  }
  if (exclude && !Array.isArray(exclude) && !glob.hasMagic(exclude)) {
    if (exports.isDirectory(exclude)) {
      exclude = path.join(exclude, "**/*");
    }
  } else if (exclude) {    
    for(var excludeIndex = 0; excludeIndex<exclude.length;excludeIndex++){
      if(!glob.hasMagic(exclude[excludeIndex])){
        exclude[excludeIndex] = path.join(exclude[excludeIndex], "**/*");
      }
    }
  }
  if(options.includeFolders){
    result = glob.sync(dir, {
      ignore: exclude
    });
  }else{
    result = glob.sync(dir, {
      ignore: exclude,
      nodir:true
    });
  }
  var clean = [];
  
  result.forEach(function (res) {
    clean.push(path.relative(exports.getRootFromPattern(dir), res));
  });  
  return clean;
}

/*
@function (public) getRootFromPattern {string} [Get root from a pattern] @param pattern {string}
 */
exports.getRootFromPattern = function (pattern) {
  if (!exports.isDirectory(pattern)) {
    if (glob.hasMagic(pattern)) {
      return pattern.substring(0, pattern.indexOf("*"));
    } else {
      return path.dirname(pattern);
    }
  } else {
    return pattern;
  }
};

/*
@function isDirectory (public) [Check if a path is directory or file]
@param filePath {string}
 */
exports.isDirectory = function (filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (e) {
    return false;
  }
};


/*
@function {number} getFileSize
@description Returns the size of a file
@param {string} filePath [Path of the file]
*/
exports.getFileSize = function (filePath) {
  try {
    if (!exports.isDirectory(filePath)) {
      return fs.statSync(filePath).size;
    }
  } catch (error) {
    return -1;
  }

  return 0;
};

/*
@function (public) deleteFolderRecursive [Delete a folder and its content] @param folderPath {string} [Folder path] @param callback
 */
exports.deleteFolderRecursive = function (folderPath, callback) {
  callback = callback || function () {}; // rimraf doesn't accept null options nor null callback
  rimraf(folderPath, {}, callback);
};
/*
@function (public) deleteFolderRecursiveSync [Delete a folder and its content] @param folderPath {string} [Folder path]
 */
exports.deleteFolderRecursiveSync = function (folderPath) {
  rimraf.sync(folderPath);
};


/*
@function isInPattern {boolean} (public) [Check if a given path belongs to a pattern]
@param filePath {string} [Path to file]
@param pattern {string}
@param options {object} [exlude:files to exclude from search]
 */
exports.isInPattern = function (filePath, pattern, options) {
  options = options || {};
  var result = false;
  if(exports.isDirectory(filePath)){
    options.includeFolders = true;
  }
  filePath = path.resolve(filePath);    
  var filesInPattern = exports.getFiles(pattern, options);  
  filesInPattern.forEach(function (files) {
    files.files.forEach(function (file) {
      var currentFile = path.resolve(path.join(files.root, file));
      if (currentFile === filePath) {
        result = true;
      }
    });
  });
  return result;
};

/*
@function writeToDisk (private)
@param output {string} [Output folder]
@param data {string} [Data to write]
@param callback
 */
exports.writeToDisk = function (output, data, callback) {
  fs.mkdirp(path.dirname("" + output), function (err) {
    if (err) {
      if (callback) {
        callback(err);
      }
      return console.log(err);
    }

    fs.writeFile("" + output, data, function (err) {
      if (err) {
        if (callback) {
          callback(err);
        }
        return console.log(err);
      } else {
        if (callback) {
          callback();
        }
      }
    });
  });
};


// @function getCommonBasePath (public) {string} [Return base path, what all have in common, for given paths] @param paths {string[]} [String with multiple path to compare]
exports.getCommonBasePath = function (paths) {
  var separator = path.sep;
  for (var pathI = 0; pathI < paths.length; pathI++) {
    paths[pathI] = paths[pathI].replace(new RegExp("(\\/+|\\\\+)", "g"), path.sep);
  }
  while (paths.length > 1) { // While there are more than 1 paths we keep mixing them
    for (var pathIndex = 1; pathIndex < paths.length; pathIndex = pathIndex + 1) { // We start on index 1 in order to take always index and the previous one
      // We need the path to end with "/" to take as folders
      var s1 = paths[pathIndex - 1];
      if (s1[s1.length - 1] != separator) {
        s1 += separator;
      }
      var s2 = paths[pathIndex];
      if (s2[s2.length - 1] != separator) {
        s2 += separator;
      }
      var result = "";
      // While we have folders in both paths keep comparing
      while (s1.indexOf(separator) >= 0 && s2.indexOf(separator) >= 0) {
        var s1NextDir = s1.substring(0, s1.indexOf(separator)); // First folder
        s1 = s1.substring(s1.indexOf(separator), s1.length); // Path without first folder        
        if (s1[0] === separator) {
          s1 = s1.substring(1, s1.length);
        }
        var s2NextDir = s2.substring(0, s2.indexOf(separator)); // First folder
        s2 = s2.substring(s2.indexOf(separator), s2.length); // Path without first folder
        if (s2[0] === separator) {
          s2 = s2.substring(1, s2.length);
        }

        if (s1NextDir === s2NextDir) { // If both folders are equals, we add them
          result = path.join(result, s1NextDir);
        }
      }
      paths[pathIndex - 1] = result; // Replace the first one at paths array
      paths.splice(pathIndex, 1); // Delete the last one because we mix them both
    }
  }
  return paths[0];
};