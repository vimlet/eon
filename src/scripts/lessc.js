var path = require("path");
var fs = require("fs-extra");
var glob = require("glob");
var less = require("less");

// TODO: use process.argv
var inputPath = path.join(process.cwd(), "src/main/less/**/*.less");
var inputRoot = path.join(process.cwd(), "src/main/less");
var outputPath = path.join(process.cwd(), "src/main");

glob(inputPath, {}, function (error, files) {

  var outputFile;

  files.forEach(function (file) {
   
    less.render(fs.readFileSync(file).toString(), {
      filename: file
    }, function (e, output) {

      if (output && output.css) {
        outputFile = path.join(outputPath, path.resolve(file).replace(inputRoot, "")).replace(".less", ".css");
        fs.mkdirsSync(path.dirname(outputFile));
        fs.writeFileSync(outputFile, output.css);
        console.log(file + " => " + outputFile);
      }

    });

  });

})
