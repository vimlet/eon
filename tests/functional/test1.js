const { registerSuite } = intern.getPlugin("interface.object");

registerSuite("exampleSuite", {
    testPage: function () {
        return this.remote.get("https://www.google.com");
    }
});