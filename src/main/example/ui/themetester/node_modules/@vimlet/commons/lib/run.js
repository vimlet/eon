var spawn = require("child_process").spawn;
var os = require("./os.js");

/*
@function exec
@description Runs a file or command and streams its output
@param {string} command [File or command to be executed]
@param {string[]} args [Executable arguments]
@param {string} workingDirectory [The path from where the executable will run]
@param-optional {function} execHandler [Default output callback function(out, error), redirects stdout when provided]
@param-optional {function} doneHandler [Default done callback function(error, exitCode)]
*/
exports.exec = function (command, args, workingDirectory, execHandler, doneHandler) {
  var p;

  var config = {
    stdio: execHandler ? "pipe" : "inherit"
  };
  
  if (os.isWindows()) {
    var winArgs = ["/C", command];

    if (args) {
      winArgs = winArgs.concat(args);
    }

    p = runCommand("cmd", winArgs, workingDirectory, config);
  } else {
    p = runCommand(command, args, workingDirectory, config);
  }


  // Register spawn execHandlers
  if (execHandler) {

    p.stdout.on("data", function (data) {
      execHandler(data.toString());
    });

    p.stderr.on("data", function (data) {
      execHandler(null, data.toString());
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
@param {string[]} args [Executable arguments]
@param {string} workingDirectory [The path from where the executable will run]
@param-optional {function} doneHandler [Default done callback function(error, exitCode)]
*/
exports.fetch = function (command, args, workingDirectory, doneHandler) {
  var stringOutput = "";

  exports.exec(
    command,
    args,
    workingDirectory,
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
