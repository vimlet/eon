module.exports = {
  "clean": true,
  "log": true,
  "output": {
    "build/**": {
      "use": async function (entry) {
        entry.fileName = entry.fileName.replace(".vmt", "");
        return entry;
      },
      "input": {
        "src/meta/**.vmt": {
          "parse": true
        }
      }
    },
    "build/**": {
      "input": {
        "src/copy/**": true
      }
    }
  }
};