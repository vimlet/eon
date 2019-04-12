const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("eon-core", () => {
    test("Performance", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
            performanceTest(callback);
        }).then(function (value) {
            assert.strictEqual(value, true);
        });

    });
});