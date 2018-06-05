var fs = require("fs-extra");
var path = require("path");
var compressing = require("compressing");
var pipe = require("multipipe");
var util = require("./util.js");
var progress = require("./progress.js");

// Hook _onEntryFinish(err) of stream.js
function hookOnEntryFinish(stream, fn) {
  // NOTE this might break on future releases of compressing module,
  // Using exact version on package.json is recommended to stay safe
  // (Compressing Module Version: 1.2.3)

  var originalFunction = stream._onEntryFinish;

  stream._onEntryFinish = function (err) {
    // Current entries befire shift()
    if (this._waitingEntries && this._waitingEntries.length > 0) {
      fn(this._waitingEntries[0][0]);
    }

    originalFunction.apply(this, arguments);
  };
}

/*
@function pack
@description Packs files
@param {string} file [Source file or directory]
@param {string} dest [Destination file]
@param {string} format [The compression format, must exactly match one of these "zip", "tar", "tgz"]
@param-optional {function} packHandler [Entry callback function(error, entry, entrySize, totalSize, totalCount)]
@param-optional {function} outputHandler [Default output callback function(out), redirects stdout when provided]
@param-optional {function} doneHandler [Default done callback function(error, data)]
*/
exports.pack = function (file, dest, format, packHandler, outputHandler, doneHandler) {
  if (isValidFormat(format)) {
    packHelper(file, dest, format, packHandler, outputHandler, doneHandler);
  } else {
    util.output("Unsupported format", outputHandler);
  }
};

/*
@function unpack
@description Unpack files
@param {string} file [Source file or directory]
@param {string} dest [Destination file]
@param {string} format [The compression format, must exactly match one of these "zip", "tar", "tgz"]
@param-optional {function} unpackHandler [Entry callback function(error, entry, entrySize, totalSize, totalCount)]
@param-optional {function} outputHandler [Default output callback function(out), redirects stdout when provided]
@param-optional {function} doneHandler [Default done callback function(error)]
*/
exports.unpack = function (file, dest, format, unpackHandler, outputHandler, doneHandler) {
  if (isValidFormat(format)) {
    unpackHelper(file, dest, format, unpackHandler, outputHandler, doneHandler);
  } else {
    util.output("Unsupported format", outputHandler);
  }
};

function isValidFormat(format) {
  format = format.toLowerCase();
  return format === "zip" || format === "tar" || format === "tgz";
}

function getStreamObject(stream) {
  var baseStream = stream;

  if (!baseStream._onEntryFinish) {
    // Must be tgz
    baseStream = stream._tarStream;
  }

  return baseStream;
}

function packHelper(file, dest, format, packHandler, outputHandler, doneHandler) {
  util.output("\nPacking " + file + "\n", outputHandler);

  var sizeObject = getPackSizeObject(getFileList(file));
  var fileStream = new compressing[format].Stream();
  var streamObject = getStreamObject(fileStream);

  var totalCount = sizeObject.count;
  var totalSize = sizeObject.totalSize;
  var totalProgress = 0;

  var currentEntry;
  var currentEntrySize;

  var progressHandler = packHandler ? null : progress.progressHandler(totalSize, 99, null, outputHandler);

  hookOnEntryFinish(streamObject, function (entry) {
    if (!util.isDirectory(entry)) {
      // Store currentEntry
      currentEntry = entry;

      // Update size
      currentEntrySize = sizeObject.files[entry];

      if (packHandler) {
        // Custom progress
        packHandler(null, currentEntry, currentEntrySize, totalSize, totalCount);
      }

      // File count fallback
      if (sizeObject.useFileCount) {
        totalProgress += 1;
        totalSize = totalCount;
      } else {
        totalProgress += currentEntrySize;
      }

      // Default progress
      progressHandler.showProgressChange(totalProgress);

    }
  });

  // Add file or directories
  if (util.isDirectory(file)) {
    fileStream.addEntry(file, {
      ignoreBase: true
    });
  } else {
    fileStream.addEntry(file);
  }

  var destStream = fs.createWriteStream(dest);

  pipe(fileStream, destStream, function (error) {
    if (error) {
      // Make sure we return something
      if (error == "") {
        error = "true";
      }

      if (packHandler) {
        packHandler(error);
      }

      util.output(error, outputHandler);

    } else {
      if (packHandler) {
        packHandler(true);
      }

      // Show 100%;
      progressHandler.showProgress(100);
      util.output("\n", outputHandler);

    }

    if (doneHandler) {
      doneHandler(error);
    }

  });
}

function unpackHelper(file, dest, format, unpackHandler, outputHandler, doneHandler) {

  util.output("\nUnpacking " + file + "\n", outputHandler);

  // Make dest directory
  fs.mkdirsSync(dest);

  getUpackSizeObject(file, format, function (sizeObject) {
    var totalCount = sizeObject.count;
    var totalSize = sizeObject.totalSize;
    var totalProgress = 0;

    var currentEntry;
    var currentEntrySize;

    var progressHandler = unpackHandler ? null : progress.progressHandler(totalSize, 99, null, outputHandler);

    var fileStream = new compressing[format].UncompressStream({
      source: file
    });

    fileStream.on("finish", function () {
      if (unpackHandler) {
        handler(true);
      }

      // Show 100%;
      progressHandler.showProgress(100);
      util.output("\n", outputHandler);


      if (doneHandler) {
        doneHandler();
      }

    });

    fileStream.on("error", function (error) {
      // Make sure we return something
      if (!error || error == "") {
        error = "true";
      }

      if (unpackHandler) {
        unpackHandler(error);
      }

      util.output(error, outputHandler);


      if (doneHandler) {
        doneHandler(error);
      }
    });

    fileStream.on("entry", function (header, stream, next) {
      // Store currentEntry
      currentEntry = path.join(dest, header.name);

      // Update size
      currentEntrySize = getEntryUncompressedSize(header);

      // Write entry
      onUnpackEntryWrite(header, stream, next, dest);

      if (unpackHandler) {
        // Custom progress
        unpackHandler(
          null,
          currentEntry,
          currentEntrySize,
          totalSize,
          totalCount
        );
      }

      // File count fallback
      if (sizeObject.useFileCount) {
        totalProgress += 1;
        totalSize = totalCount;
      } else {
        totalProgress += currentEntrySize;
      }

      // Default progress
      progressHandler.showProgressChange(totalProgress);

    });

  }, outputHandler);

}

function getEntryUncompressedSize(header) {
  var sizeProperty = "size";
  var sizeValue;
  var size = 0;

  if (header.yauzl) {
    sizeProperty = "yauzl.uncompressedSize";
  }

  size = util.resolveObject(sizeProperty, header);

  return size == null || typeof size == "undefined" ? -1 : size;
}

function getUpackSizeObject(file, format, callback, outputHandler) {
  // Will attempt to find the total size in bytes of the UncompressStream, if not possible
  // file count will be provided instead

  var sizeObject = {
    useFileCount: false,
    totalSize: 0,
    count: 0
  };

  var fileStream = new compressing[format].UncompressStream({
    source: file
  });

  fileStream.on("finish", function () {
    callback(sizeObject);
  });

  fileStream.on("error", function (error) {
    sizeObject.count = -1;
    util.output(error, outputHandler);
  });

  fileStream.on("entry", function (header, stream, next) {
    var sizeValue = getEntryUncompressedSize(header);

    if (sizeValue != -1) {
      sizeObject.totalSize += sizeValue;
    } else {
      sizeObject.useFileCount = true;
    }

    sizeObject.count++;

    // Must resume to avoid stream block
    stream.resume();
    next();
  });
}

// Recursive function
function getFileList(dir, fileList) {
  fileList = fileList || [];
  files = fs.readdirSync(dir);

  files.forEach(function (file) {
    if (util.isDirectory(path.join(dir, file))) {
      fileList = getFileList(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  });

  return fileList;
}

function getPackSizeObject(fileList) {
  var sizeObject = {
    useFileCount: false,
    totalSize: 0,
    count: fileList.length,
    files: {}
  };

  var file;
  var size;

  for (var i = 0; i < fileList.length; i++) {
    file = fileList[i];
    size = util.getFileSize(file);

    if (size == -1) {
      sizeObject.useFileCount = true;
    }

    sizeObject.files[file] = size;
    sizeObject.totalSize += size;
  }

  return sizeObject;
}

function onUnpackEntryWrite(header, stream, next, dest) {
  // header.type => file | directory
  // header.name => path name

  stream.on("end", next);

  if (header.type === "file") {
    var file = path.join(dest, header.name);
    var parent = path.dirname(file);

    try {
      fs.mkdirsSync(parent);
    } catch (error) {
      // Do nothing
    }

    stream.pipe(fs.createWriteStream(file));
  } else {
    // directory
    // Note this is just per compressing API specification but never triggers
    fs.mkdirsSync(path.join(dest, header.name));
    stream.resume();
  }
}
