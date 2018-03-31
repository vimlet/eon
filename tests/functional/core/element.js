const { registerSuite } = intern.getInterface("object");

registerSuite("vComet Core Suite", {
    testPage: function () {
        return this.remote.get("https://www.google.com");
    }
});