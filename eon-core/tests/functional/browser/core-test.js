const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("eon-core", () => {
    // test("Imports", ({ remote }) => {
    //     return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
    //         importsTest(callback);
    //     }).then(function (value) {
    //         assert.strictEqual(value, true);
    //     });

    // });
    // test("Property changes", ({ remote }) => {
    //     return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
    //         propertyChangedTest(callback);
    //     }).then(function (value) {
    //         assert.strictEqual(value, true);
    //     });

    // });
    test("Data Diffing", ({ remote }) => {
      return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
        dataDiffingTest(callback);
      }).then(function (value) {
          assert.strictEqual(value, true);
      });

  });
});