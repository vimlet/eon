#!/usr/bin/env node

/*

init -  Initialize a project and creates vcomet.json file, ask template project, core and ui

install -   Install or updated latest or specific version of core, ui or component from hub, also checks and download vcomet.json dependencies.
            Command line syntax should be component@version - e.g. core@1.0.0
            Note: core and ui are github releases

            In vcomet.json dependencies should be written like so:

            dependencies {
                custom-test: "1.0.0"
            }

            github release url and normal urls should be also supported - vcomet install github.com/vimlet/release/latest/file.zip
            In vcomet.json github and normal url should also be supported like so:
                
            dependencies {
                custom-test: "github.com/vimlet/release/latest/file.zip"
            }

            a full example of vcomet.json will be (this should be generated with init):

            {
                "path": "src/webapp/framework/vcomet",
                "core": "1.0.0",
                "ui": "1.0.0",
                "dependencies": {
                    "custom-test1": "1.0.0",
                    "custom-test2": "github.com/vimlet/release/latest/file.zip"
                }                
            }


path -  Specifies the path where dependencies will be downloaded

publish -   (future) allows component publishing to vcomet hub.

prune - Removes packages that are actually installed but does not match vcomet.json wanted packages.

*/

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

