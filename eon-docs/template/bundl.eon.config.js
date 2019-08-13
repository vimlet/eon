module.exports = {
  "outputBase": "build",
  "inputBase": "src",
  "clean": true,
  "log": false,
  "output": {
      "eon/**": {
          "clean": true,
          "order": 2,
          "input": {
              "**": {
                  "watch": "**"
              },
              "!less/**": true
          }
      },
      "eon/framework/**": {
          "order": 1,
          "input": {
              "less/**.less": {
                "use": async function (entry) {
                  try {
                    entry.fileName = entry.fileName.replace(".less", ".css");
                    entry.content = (await require("less").render(entry.content.toString("utf8"), {
                      filename: require("path").resolve(entry.file),
                    })).css;
                  } catch (error) {
                    console.log(error);
                  }
                  return entry;
                }
              }
          }
      }
  }
};

