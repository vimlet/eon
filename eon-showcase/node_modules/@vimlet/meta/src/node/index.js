#!/usr/bin/env node
 //@header Parse templates into files.
var io = require("@vimlet/io");
var path = require("path");
var glob = require("glob");
var fs = require("fs-extra");
var cli = require("@vimlet/cli").instantiate();
var watch = require("./lib/watch");

// Node require
var require_fs;
var require_vm;

// Make base accessible from the required scope
// @property meta [Access to meta]
module.exports = require("./lib/meta-base").instance();

// Switch to node engine mode
// @property engine [Engine to run (node|browser)]
module.exports.engine = "node";

// Override sandboxProvider;
module.exports.__sandboxProvider = function (sandbox) {

  if (!require_vm) {
    require_vm = require("vm");
  }

  // Clone node global scope to baseContext
  var baseContext = Object.assign({}, sandbox);

  // Add other node global modules to baseContext

  // exports
  // require
  // module
  // __filename
  // __dirname

  baseContext.exports = exports;
  baseContext.require = require;
  baseContext.module = module;
  baseContext.__filename = __filename;
  baseContext.__dirname = __dirname;

  return require_vm.createContext(baseContext);
};

// Override evalProvider for node
module.exports.__evalProvider = function (s, sandbox) {
  var script = new require_vm.Script(s);
  script.runInContext(sandbox);
};

// Override fileProvider for node
module.exports.__fileProvider = function (filePath, callback) {
  var fixedPath = filePath;
  if (!path.isAbsolute(filePath)) {
    fixedPath = "./" + filePath;
  }
  if (callback) {
    // Must be asynchronous
    fs.readFile(fixedPath, "utf8", function (error, buf) {
      if (!error) {
        callback(buf.toString());
      }
    });
  } else {
    // Must be synchronous    
    try {
      return fs.readFileSync(fixedPath, "utf8").toString();
    } catch (error) {   
      if(error.path){
        console.log();        
        console.log("Error, file not found: ", error.path);
        console.log();        
      }else{
        console.log(error);
        
      }
    }
  }
};

// Function overloading and node standard(error, data) callbacks 
var baseParse = module.exports.parse;
var baseParseTemplate = module.exports.parseTemplate;

// Converts any callback to a standard(error, data) callback
// NOTE: Only single param callback is supported
// NOTE: Callback must be the last param
// @function (private) converToNodeCallback [Converts any callback to a standard(error, data) callback, only single param callback is supported.] @param fn
function convertToNodeCallback(fn) {
  return function () {
    var lastArgPosition = arguments.length - 1;
    var callback = arguments[lastArgPosition];
    try {
      arguments[lastArgPosition] = function (data) {
        callback(null, data);
      }
      fn.apply(null, arguments);
    } catch (error) {
      callback(error);
    }
  };
}
// @function parse (public) [Parse a template and return the result] @param template @param data @param callback
module.exports.parse = function () {
  convertToNodeCallback(baseParse).apply(null, arguments);
};

module.exports.parseTemplate = function () {
  convertToNodeCallback(baseParseTemplate).apply(null, arguments);
};


// Node engine specific functions
// @function parseTemplateGlob (public) [Parse templates from glob patterns and return a result object containing relativePath and result] @param include @param options [exclude: to skip files, data] @param callback
module.exports.parseTemplateGlob = function (include, options, callback) {
  options = options || {};
  var rootsArray = io.getFiles(include, options);
  rootsArray.forEach(function (rootObject) {
    rootObject.files.forEach(function (relativePath) {
      module.exports.parseTemplate(path.join(rootObject.root, relativePath), options, function (error, data) {
        callback(error, {
          relativePath: relativePath,
          result: data
        });
      });
    });
  });
};

// @function parseTemplateGlobAndWrite (public) [Parse templates from glob patterns and write the result to disk] @param include @param output [Output folder, it respects files structure from include pattern] @param options [exclude: to skip files, data and clean: to empty destination folder] @param callback
module.exports.parseTemplateGlobAndWrite = function (include, output, options, callback) {
  options = options || {};
  if (options.clean) {
    fs.removeSync(output);
  }
  module.exports.parseTemplateGlob(include, options, function (error, data) {
    if (error) {
      console.error(error);
    } else {
      if (data && output) {
        // Write data to output without .vmt extension
        var fileOutput = path.join(output, data.relativePath).replace(".vmt", "");
        fs.mkdirsSync(path.dirname(fileOutput));
        fs.writeFileSync(fileOutput, data.result);
      }
    }
  });
  if (callback) {
    callback();
  }
};


// @function watch (public) [Parse templates from glob patterns and keep listen for changes] @param include @param output [Output folder, it respects files structure from include pattern] @param options [exclude: to skip files, data and clean: to empty destination folder, watchdirectory:watch directories for changes and compile watch files] @param callback
module.exports.watch = function (include, output, options) {
  module.exports.parseTemplateGlobAndWrite(include, output, options);
  watch.watch(include, output, options);
  if (options && options.watchdirectory) {
    watch.watchDirectory(options.watchdirectory, include, function () {
      module.exports.parseTemplateGlobAndWrite(include, output, options);
    });
  }
};


// Command mode
if (!module.parent) {

  function list(value) {
    var result = value.split(",");
    for (var i = 0; i < result.length; i++) {
      result[i] = result[i].trim();
    }
    return result;
  }

  cli
    .value("-i", "--include", "Include patterns", list)
    .value("-e", "--exclude", "Exclude patterns", list)
    .value("-o", "--output", "Output path")
    .value("-d", "--data", "Json file path")
    .flag("-c", "--clean", "Clean output directory")
    .flag("-p", "--preventCommented", "Prevent removal of wrapped templates")
    .value("-w", "--watch", "Keeps watching for changes")
    .flag("-h", "--help", "Shows help")
    .parse(process.argv);

  var cwd = process.cwd();

  var readData = null;
  if (cli.result.data) {
    if (fs.existsSync(path.join(cwd, cli.result.data))) {
      readData = JSON.parse(fs.readFileSync(path.join(cwd, cli.result.data)));
    }
  }
  if (cli.result.preventCommented) {
    module.exports.parseCommented = false;    
  }

  var include = cli.result.include || path.join(cwd, "**/*.vmt");
  var exclude = cli.result.exclude || "**node_modules**";
  var data = readData || {};
  var output = cli.result.output || cwd;
  var clean = cli.result.clean || false;


  var options = {};
  options.exclude = exclude;
  options.data = data;
  options.clean = clean;

  if (cli.result.help) {
    cli.printHelp();
  } else {
    if (cli.result.watch) {
      if (typeof (cli.result.watch) != "boolean") {
        options.watchdirectory = cli.result.watch;
      }
      module.exports.watch(include, output, options);
    } else {
      module.exports.parseTemplateGlobAndWrite(include, output, options);
    }
  }

}