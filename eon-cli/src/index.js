#!/usr/bin/env node

var cli = require("@vimlet/cli").instantiate();
var init = require("./bin/init");
var install = require("./bin/install");
var prune = require("./bin/prune");
var publish = require("./bin/publish");
var clear = require("./bin/clear");

cli
.value("i", "install", "Installs eon or dependency")
.value("p", "path", "Specifies dependency path")
.value(null, "clear", "Removes various elements")
.flag(null, "init", "Initialize a vComet project")
.flag(null, "prune", "Removes unused dependencies")
.flag(null, "--no-save", "Prevents eon.json generation")
.flag(null, "help", "Display this help")
.parse(process.argv);

if (Object.keys(cli.result).length == 0 || cli.result.help) {
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
}

