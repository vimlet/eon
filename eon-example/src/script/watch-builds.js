var copy = require("@vimlet/copy");
var run = require("@vimlet/run");

// Core: install, build, copy and double watch
run.exec("cd ../eon-core && npm i", null, function (error, data) {
  run.exec("cd ../eon-core && npm run build", null, function (error, data) {
    copy.copy("../eon-core/build/eon", "build/webapp/eon", null, function (error, data) {
      run.exec("cd ../eon-core && npm run build:watch");
      copy.watch("../eon-core/build/eon", "build/webapp/eon", {
        watchDirectory: "../eon-core/build/eon"
      });
    });
  });
});

// UI: install, build, copy and double watch
run.exec("cd ../eon-ui && npm i", null, function (error, data) {
  run.exec("cd ../eon-ui && npm run build", null, function (error, data) {
    copy.copy("../eon-ui/build/eon", "build/webapp/eon", null, function (error, data) {
      run.exec("cd ../eon-ui && npm run build:watch");
      copy.watch("../eon-ui/build/eon", "build/webapp/eon", {
        watchDirectory: "../eon-ui/build/eon"
      });
    });
  });
});