var spawn = require("child_process").spawn;
// var os = require("@vimlet/os");
var os = require("@vimlet/os");

/*
@function exec
@description Runs a file or command and streams its output
@param {string} command [File or command to be executed]
@param-optional {object} options [execHandler: Default output callback function(out, error), redirects stdout when provided. args: Executable arguments(string[]). workingDirectory: The path from where the executable will run]
@param-optional {function} doneHandler [Default done callback function(error, exitCode)]
*/
exports.exec = function (command, options, doneHandler) {
  options = options || {};
  var p;

  var config = {
    stdio: options.execHandler ? "pipe" : "inherit"
  };
  
  if (os.isWindows()) {
    var winArgs = ["/C", command];

    if (options.args) {
      winArgs = winArgs.concat(options.args);
    }

    p = runCommand("cmd", winArgs, options.workingDirectory, config);
  } else {
    p = runCommand(command, options.args, options.workingDirectory, config);
  }


  // Register spawn execHandlers
  if (options.execHandler) {

    p.stdout.on("data", function (data) {
      options.execHandler(data.toString());
    });

    p.stderr.on("data", function (data) {
      options.execHandler(null, data.toString());
    });

  }

  p.on("exit", function (exit) {
    // Exit code to string
    exit = exit + "";

    if (doneHandler) {
      doneHandler(null, exit);
    }

  });

};

/*
@function {string} fetch
@description Runs a file or command and buffers its output
@param {string} command [File or command to be executed]
@param-optional {object} options [args: Executable arguments(string[]). workingDirectory: The path from where the executable will run]
@param-optional {function} doneHandler [Default done callback function(error, exitCode)]
*/
exports.fetch = function (command, options, doneHandler) {
  var stringOutput = "";

  exports.exec(
    command,
    options,
    function (out, error) {
      if (out) {
        stringOutput += out;
      }

      if (error) {
        stringOutput += error;
      }
    },
    function () {
      if (doneHandler) {
        doneHandler(null, stringOutput);
      }
    }
  );
};

function runCommand(command, args, workingDirectory, config) {

  if(!config) {
    config = {};
  }

  if (!args) {
    args = [];
  }

  if (workingDirectory) {
    config.cwd = workingDirectory;
  }

  var p = spawn(command, args, config);

  return p;
}
