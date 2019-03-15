const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("hello", () => {
    test("Dependencies", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
            dependenciesTest(callback);
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