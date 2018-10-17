var fs = require("fs-extra");
var path = require("path");
var commons = require("@vimlet/commons");
var minify = require("minify");
var CleanCSS = require("clean-css");
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
        console.log(error);
      } else {

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
      }

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

      var last
      if (files.length > 0) {
        last = files[files.length - 1];
      }

      files.forEach(function (file) {

        var src = file;
        var dest = path.join("release/vcomet-" + packageObject.version + "-min", file.substring("src/main/vcomet".length));

        if (fs.lstatSync(src).isFile()) {

          var extension = path.extname(src).toLowerCase();

          if (extension == ".html" || extension == ".js") {

            minify(src, function (error, data) {
              // Keep a copy of the variable in this scope
              var srcCopy = src;

              if (error) {
                console.log("Error found in " + srcCopy);
                console.log(error);
              } else {
                console.log("Minify: " + srcCopy + " => " + dest);

                fs.mkdirsSync(path.dirname(dest));
                fs.writeFileSync(dest, data);

                if (srcCopy === last) {
                  // Zip directory     
                  commons.compress.pack(rootPath, rootPath + ".zip", "zip", null, null, cb);
                }
              }

            });

          } else if(extension == ".css") {            
            try {
              var srcContent = fs.readFileSync(src).toString();
              var cssCleanOutput = new CleanCSS({}).minify(srcContent);
              var data = cssCleanOutput.styles;

              if(cssCleanOutput.errors && cssCleanOutput.errors.length > 0) {
                throw cssCleanOutput.errors;
              }

              console.log("Minify: " + src + " => " + dest);
  
              fs.mkdirsSync(path.dirname(dest));
              fs.writeFileSync(dest, data);
  
              if (src === last) {
                // Zip directory     
                commons.compress.pack(rootPath, rootPath + ".zip", "zip", null, null, cb);
              }

            }catch (error) {
              console.log("Error found in " + src);
              console.log(error);
            }
          } else {
            console.log("Copy: " + src + " => " + dest);

            fs.mkdirsSync(path.dirname(dest));
            fs.copySync(src, dest);

            if (src === last) {
              // Zip directory     
              commons.compress.pack(rootPath, rootPath + ".zip", "zip", null, null, cb);
            }
          }

        }

      });

    });
  });
}
