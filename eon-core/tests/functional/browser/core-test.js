const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("eon-core", () => {
    test("Imports", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
            importsTest(callback);
        }).then(function (value) {
            assert.strictEqual(value, true);
        });

    });
    test("Performance", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
            performanceTest(callback);
        }).then(function (value) {
            assert.strictEqual(value, true);
        });

    });
    test("Data diffing instance", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
          dataDiffingInstanceTest(callback);
        }).then(function (value) {
          assert.strictEqual(value, true);
        });
      });
      test("Data diffing commit", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
          dataDiffingCommitTest(callback);
        }).then(function (value) {
          assert.strictEqual(value, true);
        });
      });
      test("Resize", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
          resizeTest(callback);
        }).then(function (value) {
          assert.strictEqual(value, true);
        });
      });
      test("Template references", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
          templateReferencesTest(callback);
        }).then(function (value) {
          assert.strictEqual(value, true);
        });
      });
      test("Binding", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
          bindingTest(callback);
        }).then(function (value) {
          assert.strictEqual(value, true);
        });
      });
      test("Data & Locale changes", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
          dataChangedTest(callback);
        }).then(function (value) {
          assert.strictEqual(value, true);
        });
      });
      test("Property changes", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
            propertyChangedTest(callback);
        }).then(function (value) {
            assert.strictEqual(value, true);
        });

    });
});