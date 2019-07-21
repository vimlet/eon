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
        "parse": true,
        "src/meta/**.vmt": true
      }
    },
    //   "**": [
    //     {
    //       "clean": false,
    //       "input": {
    //         "less/**.less": {
    //           "use": async function (entry) {
    //             try {
    //               entry.fileName = entry.fileName.replace(".less", ".css");
    //               entry.content = (await require("less").render(entry.content.toString("utf8"), {
    //                 filename: require("path").resolve(entry.file),
    //               })).css;
    //             } catch (error) {
    //               console.log(error);
    //             }
    //             return entry;
    //           }
    //         }
    //       }
    //     },
    //     {
    //       "clean": false,
    //       "input": {
    //         "copy/**": true
    //       }
    //     }
    //   ]
  }
};