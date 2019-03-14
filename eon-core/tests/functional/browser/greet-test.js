const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("hello", () => {
    test("greet", ({ remote }) => {
        return remote.get(intern.config.remoteUrl + "/index.html").sleep(1000).executeAsync(function (callback) {
            // Example of internTest function:
            // -------------------------------
            // function internTest(callback) {
            //   setTimeout(function(){
            //     callback(true);
            //   }, 1000);
            // }

            // internTest is an async function on the remote site that actually does the testing and returns a result
            internTest(callback);
        }).then(function (value) {
            // value is the returned value of internTest callback
            assert.strictEqual(value, "Hello, Murray!", "greet should return a greeting for the person named in the first argument");
        });

    });
});