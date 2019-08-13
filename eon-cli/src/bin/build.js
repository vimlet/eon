var fs = require("fs");
var path = require("path");
var util = require("util");
var readFile = util.promisify(fs.readFile);

var jsdom = require("jsdom");
var { JSDOM } = jsdom;

// Flat polyfill
require("array-flat-polyfill");

module.exports = async function (base, eonPath, input, output) {
    // TODO: Pass an actual path for the config, by default it will use eon.json
    var config = await readConfig(null);
    var build = {};

    if (input) {

        build = {};

        var inputPath = base + "/" + input;
        var outputPath = output ? base + "/" + output : base + "/eon-build.js";

        await includeFileImports(build, eonPath, path.join(process.cwd(), inputPath));
        await outputBuild(build, outputPath);

    } else if (config && config.build) {

        for (var i = 0; i < config.build.length; i++) {

            var outputPath = config.build[i].output ? config.build[i].base + "/" + config.build[i].output : config.build[i].base + "/eon-build.js";
            var eonPath = config.build[i].location;

            build = {};

            if (config.build[i].input) {

                var inputPath = config.build[i].base + "/" + config.build[i].input;
                await includeFileImports(build, eonPath, path.join(process.cwd(), inputPath));

            } else if (config.build[i].imports) {

                await includeImports(build, eonPath, config.build[i].base, config.build[i].imports);

            }
            
            await outputBuild(build, outputPath);

        }

    }
    
};

async function readConfig(configPath) {

    var config;

    configPath = configPath || "eon.json";

    if (fs.existsSync(configPath)) {
        config = JSON.parse((await readFile(configPath)).toString());
    }

    return config || {};

}

async function includeFileImports(build, eonPath, filePath) {
    var imports = await readImports(filePath);
    await includeImports(build, eonPath, path.dirname(filePath), imports);
}

async function includeFileDependencies(build, eonPath, filePath) {
    var dependencies = await readDependencies(filePath);
    await includeImports(build, eonPath, path.dirname(filePath), dependencies, true);
}

async function readImports(filePath) {

    var fileContent;
    var matches = [];

    if (fs.existsSync(filePath)) {

        fileContent = (await readFile(filePath)).toString();
        matches = fileContent.match(/eon\.import\s*\([^\)]*\)/gs)
        matches = matches || [];

        // Regex based import parse
        matches = matches.map((entry) => {
            entry = entry.replace("eon.import", "");
            entry = entry.replace(/[\(\)\[\]\r\n\s\t'"`]/g, "");
            entry = entry.split(",");
            return entry;
        });

    }

    // Flat results
    matches = matches.flat();

    return matches;
}

async function readDependencies(filePath) {

    var fileContent;
    var config = {};

    if (fs.existsSync(filePath)) {

        var fileContent = (await readFile(filePath)).toString();
        var elementFunction = fileContent.match(/eon\.element\s*\(.*\)/gs);
        var div = '<div id="contentDiv">' + elementFunction[0] + '</div>';

        var helperScriptAppend = '<script>var contentDiv = document.querySelector("#contentDiv");' +
            'var newScript = document.createElement("script");' +
            'newScript.innerHTML = contentDiv.textContent;' +
            'document.body.appendChild(newScript);</script>';

        var script = '<script>var eon = {};' +
            'eon.element = function (param1, param2) {' +
            'if (param2) {' +
            'var config = param2.config ? param2.config : param2.constructor === Object ? param2 : {};' +
            '} else {' +
            'var config = param1.config ? param1.config : param1.constructor === Object ? param1 : {};' +
            '} window.config = config;}</script>';

        var scopeDOM = new JSDOM('<body>' + div + script + helperScriptAppend + '</body>', { runScripts: "dangerously" });
        var config = scopeDOM.window.config;
    }

    return config.dependencies || [];
}

async function includeImports(build, eonPath, dirname, imports) {

    await Promise.all(imports.map(async (entry) => {

        var entryHTML = await getCorrectedInputPath(eonPath, entry);
        var inputPath = path.join(dirname, entryHTML);
        var cssPath = inputPath.replace(".html", ".css");
        var componentName = path.basename(inputPath).replace(".html", "");
        var htmlFileExists = fs.existsSync(inputPath);
        var cssFileExists = fs.existsSync(cssPath);
        var htmlFile = "";
        var cssFile = "";
        var style = "";
        
        if (cssFileExists) {
            cssFile = (await readFile(cssPath)).toString();
            style = "<style>" + cssFile + "</style>"
        }

        if (htmlFileExists) {

            htmlFile = (await readFile(inputPath)).toString();

            build[componentName] = {
                content: htmlFile + style,
                path: entryHTML
            };

            await includeFileDependencies(build, eonPath, inputPath);

        }

    }));

}

async function getCorrectedInputPath(eonPath, inputPath) {

    inputPath = inputPath.replace(/\\/g, "/");
    inputPath = inputPath.charAt(0) !== "/" && inputPath.charAt(0) !== "@" && inputPath.charAt(0) !== "." ? "/" + inputPath : inputPath;
    inputPath = path.basename(inputPath).endsWith(".html") ? inputPath : path.join(inputPath, path.basename(inputPath) + ".html");

    if (inputPath.charAt(0) === "@") {
        inputPath = inputPath.substring(1);
        inputPath = eonPath + "/" + inputPath;
        inputPath = inputPath.replace(/\\/g, "/");
    }

    return inputPath;

}

async function outputBuild(build, outputPath) {

    var txt = "";

    txt += "var eon = eon || {};\n";
    txt += "eon.build = eon.build || {};";
    txt += "eon.build = Object.assign(eon.build,";
    txt += JSON.stringify(build);
    txt += ");";

    fs.writeFileSync(outputPath, txt);

    console.log("File " + outputPath + " created, includes:");
    console.log(Object.keys(build));

}