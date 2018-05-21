#!/usr/bin/env node

var cli = require("@vimlet/cli").instantiate();
var init = require("./bin/init");
var install = require("./bin/install");
var prune = require("./bin/prune");
var publish = require("./bin/publish");
var clear = require("./bin/clear");

cli
.value("i", "install", "Installs vcomet or dependency")
.value("p", "path", "Specifies dependency path")
.value("", "clear", "Removes various elements")
.flag("", "init", "Initialize a vComet project")
.flag("", "prune", "Removes unused dependencies")
.flag("", "--no-save", "Prevents vcomet.json generation")
.flag("h", "help", "Display this help")
.parse(process.argv);
// .value("u", "publish", "Publish components to vcomet hub")

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

