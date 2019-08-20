#!/usr/bin/env node

var path = require("path");
var cli = require("@vimlet/cli").instantiate();
var init = require("./bin/init");
var install = require("./bin/install");
var prune = require("./bin/prune");
var publish = require("./bin/publish");
var clear = require("./bin/clear");
var build = require("./bin/build");

var pjson = require(path.join(__dirname, "../package.json"));

cli
.value("i", "install", "Installs eon or dependency")
.value("p", "path", "Specifies dependency path")
.value(null, "clear", "Removes various elements")
.value(null, "base", "Main path from which input, base and output are relative to")
.value(null, "location", "Path to the folder where eon.js is located, relative to the base path")
.value(null, "prefix", "Path prefix for the input path")
.value(null, "input", "Path of the file to be compiled")
.value(null, "output", "Path for the compiled file")
.flag(null, "build", "Reads the given file to read its imports and build a file")
.flag(null, "init", "Initializes an eon project")
.flag(null, "prune", "Removes unused dependencies")
.flag("-v", "--version", "Displays eon-cli version")
.flag(null, "--no-save", "Prevents eon.json generation")
.flag(null, "help", "Displays this help")
.parse(process.argv);

if (Object.keys(cli.result).length === 0 || cli.result.help) {
    cli.printHelp();
} else if(cli.result.init) {
    init(cli.result);
} else if(cli.result.install) {
    install(cli.result);
} else if(cli.result.prune) {
    prune();
} else if(cli.result.clear) {
    clear(cli.result);
} else if(cli.result.publish) {
    publish(cli.result);
} else if(cli.result.build) {
    build(cli.result.base, cli.result.location, cli.result.input, cli.result.output, cli.result.prefix);
} else if(cli.result.version) {
    console.log(pjson.version);
}

