const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");

registerSuite("vComet Core Suite", {
    testPage: function () {
        return this.remote.get("http://localhost:8081/tests/core/life-cycle.html").sleep(500).execute("test()");
    }
});