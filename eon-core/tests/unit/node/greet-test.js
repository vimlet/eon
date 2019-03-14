const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

var example = require("../../example/node-example");

suite("examples", () => {
    test("greet", () => {
        assert.strictEqual(example.greet("Murray"), "Hello, Murray!",
            "greet should return a greeting for the person named in the first argument");
        assert.strictEqual(example.greet(), "Hello, world!",
            "greet with no arguments should return a greeting to \"world\"");
    });
});