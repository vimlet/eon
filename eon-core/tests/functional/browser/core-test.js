const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("eon-core", () => {
  test("Imports", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      importsTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });

  });
  test("Data diffing instance", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      dataDiffingInstanceTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
  test("Data diffing commit", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      dataDiffingCommitTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
  test("Resize", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      resizeTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
  test("Template references", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      templateReferencesTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
  test("Binding", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      bindingTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
  test("Data & Locale changes", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      dataChangedTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
  test("Property changes", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      propertyChangedTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });

  });
  test("Slot", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      slotTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
  test("Custom creation", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      slotTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
  test("Theme listener", ({ remote }) => {
    remote.setExecuteAsyncTimeout(20000);
    return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
      themeListenerTest(callback);
    }).then(function (value) {
      assert.strictEqual(value, true);
    });
  });
});