var copy = require("@vimlet/copy");
var run = require("@vimlet/run");

// Core: install, build and copy
run.exec("cd ../eon-core && npm i", {}, function (error, data) {
  run.exec("cd ../eon-core && npm run build", {}, function (error, data) {
    copy.copy("../eon-core/build/eon", "build/webapp/eon");
  });
});

// UI: install, build and copy
run.exec("cd ../eon-ui && npm i", {}, function (error, data) {
  run.exec("cd ../eon-ui && npm run build", {}, function (error, data) {
    copy.copy("../eon-ui/build/eon", "build/webapp/eon");
  });
});