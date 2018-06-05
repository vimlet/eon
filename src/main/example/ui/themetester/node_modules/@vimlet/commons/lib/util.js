var fs = require("fs-extra");
var path = require("path");

/*
@function {boolean} isDirectory
@description Asserts if a path is a directory
@param {string} filePath [Path of the file]
*/
exports.isDirectory = function(filePath) {
  return fs.statSync(filePath).isDirectory();
};

/*
@function {number} getFileSize
@description Returns the size of a file
@param {string} filePath [Path of the file]
*/
exports.getFileSize = function(filePath) {
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
@function {object} resolveObject
@description Access nested object properties by path
@param {string} path [Path of the property]
@param {object} obj [The object that contains the property]
*/
exports.resolveObject = function(path, obj) {
  return path.split(".").reduce(function(prev, curr) {
    return prev ? prev[curr] : undefined;
  }, obj || self);
};

/*
@function output
@description Outputs a string to the stdout unless an outputHandle is provided
@param {string} s [The string to output]
@param-optional {function} outputHandler [The callback(out) that will receive output instead of stdout]
*/
exports.output = function(s, outputHandler) {
  if (outputHandler) {
    outputHandler(s);
  } else {
    process.stdout.write(s);
  }
};