module.exports = {
  "clean": true,
  "log": true,
  "output": {
    "build/**": [{
      "order": 0,
      "use": async function (entry) {
        entry.fileName = entry.fileName.replace(".vmt", "");
        return entry;
      },
      "input": {
        "src/meta/**.vmt": {
          "parse": true
        }
      }
    }, {
      "order": 0,
      "input": {
        "src/copy/**": true
      }
    }],
    "tests/webapp/**": [{
      "order": 1,
      "input": {
        "build/**": true
      }
    }, {
      "order": 1,
      "input": {
        "src/tests/**": true
      }
    }]
  }
};