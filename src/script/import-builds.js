var copy = require("@vimlet/copy");

// Copying core will clean directory
copy.copy("eon-core/build/eon", "build/webapp/eon", {
  clean: true
}, function (error, data) {
  if (!error) {
    copy.copy("eon-ui/build/eon", "build/webapp/eon", {
    }, function (error, data) {
      if (!error) {
        console.log("eon-core imported successfully!");
      }
    });
  }
});
