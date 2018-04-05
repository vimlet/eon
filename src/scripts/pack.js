var fs = require("fs-extra");
var path = require("path");
var commons = require("@vimlet/commons");
var minify = require("minify");
var glob = require("glob");
var Sync = require("sync");
var rimraf = require("rimraf");

var projectRoot = path.join(__dirname, "../..");
var packageObject = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json")));

// Ensure meta files are up to data
commons.run.exec("npm", ["run", "meta"], projectRoot, null, function (error, data) {
  release(function (error, data) {
    if (!error) {
      releaseMin();
    }
  });
});

function release(cb) {

  console.log("### RELEASE " + packageObject.version + " ###");

  // Remove old directory
  var rootPath = path.join("release/vcomet-" + packageObject.version);

  rimraf(rootPath, function () {
    glob("src/main/vcomet/**/*", null, function (error, files) {

      if (error) {
        console.log(error.message);
      }

      files.forEach(function (file) {

        var src = file;
        var dest = path.join("release/vcomet-" + packageObject.version, file.substring("src/main/vcomet".length));

        if (fs.lstatSync(src).isFile()) {
          console.log("Copy: " + src + " => " + dest);
          fs.mkdirsSync(path.dirname(dest));
          fs.copySync(src, dest);
        }

      });

      // Zip directory     
      commons.compress.pack(rootPath, rootPath + ".zip", "zip", null, null, cb);

    });
  });
}


function releaseMin(cb) {

  console.log("### RELEASE-MIN " + packageObject.version + " ###");

  var rootPath = path.join("release/vcomet-" + packageObject.version + "-min");

  // Remove old directory
  rimraf(rootPath, function () {
    glob("src/main/vcomet/**/*", null, function (error, files) {

      if (error) {
        console.log(error.message);
      }

      files.forEach(function (file) {

        var src = file;
        var dest = path.join("release/vcomet-" + packageObject.version + "-min", file.substring("src/main/vcomet".length));

        if (fs.lstatSync(src).isFile()) {

          var extension = path.extname(src).toLowerCase();

          if (extension == ".html" || extension == ".css" || extension == ".js") {
            console.log("Minify: " + src + " => " + dest);

            minify(src, function (error, data) {
              if (error) {
                console.log(error.message);
              }
              fs.mkdirsSync(path.dirname(dest));
              fs.writeFileSync(dest, data);
            });
          } else {
            console.log("Copy: " + src + " => " + dest);

            fs.mkdirsSync(path.dirname(dest));
            fs.copySync(src, dest);
          }

        }

      });

      // Zip directory     
      commons.compress.pack(rootPath, rootPath + ".zip", "zip", null, null, cb);

    });
  });
}
