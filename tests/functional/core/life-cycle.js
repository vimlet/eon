const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");

registerSuite("vComet Core Suite", {
    testPage: function () {
        // Leadfoot API: https://theintern.io/leadfoot  
        return this.remote.get("http://localhost:8081/tests/core/life-cycle.html").sleep(500).executeAsync(function (callback) {

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
            assert.strictEqual(value, true);
        });
    }
});