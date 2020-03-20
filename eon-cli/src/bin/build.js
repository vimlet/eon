var fs = require("fs");
var path = require("path");
var util = require("util");
var glob = require("@vimlet/commons-glob");
var readFile = util.promisify(fs.readFile);

var jsdom = require("jsdom");
var { JSDOM } = jsdom;

// Flat polyfill
require("array-flat-polyfill");

module.exports = async function (base, eonPath, input, output, prefix) {
    // TODO: Pass an actual path for the config, by default it will use eon.json
    var config = await readConfig(null);
    var build = {};
    var filePath, outputPath;

    if (input) {

        // Creates the build config with the data provided by the user
        var buildConfig = {
            base: base,
            location: eonPath,
            prefix: prefix,
            input: input,
            output: output
        };

        filePath = base + "/" + input;
        outputPath = output ? base + "/" + output : base + "/eon-build.js";
        build = {
            components: {},
            themes: {}
        };

        await includeFileImports(build, buildConfig, path.join(process.cwd(), filePath));
        await outputBuild(build, outputPath);

    } else if (config && config.build) {

        for (var i = 0; i < config.build.length; i++) {

            outputPath = config.build[i].output ? config.build[i].base + "/" + config.build[i].output : config.build[i].base + "/eon-build.js";
            build = {
                components: {},
                themes: {}
            };

            if (config.build[i].input) {

                filePath = config.build[i].base + "/" + config.build[i].input;
                await includeFileImports(build, config.build[i], path.join(process.cwd(), filePath));

            } else if (config.build[i].imports) {

                await includeImports(build, config.build[i].base, eonPath, config.build[i].base, config.build[i].imports);

            }

            await includeThemes(build, config.build[i]);
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

async function includeFileImports(build, buildConfig, filePath) {
    var imports = await readImports(filePath);

    // If there is a prefix, we loop through imports to add the prefix to each import
    // This is only needed in the root imports, not the dependencies
    if (buildConfig.prefix) {
        for (var i = 0; i < imports.length; i++) {
            imports[i] = buildConfig.prefix + imports[i];
        }
    }

    await includeImports(build, buildConfig.base, buildConfig.location, path.dirname(filePath), imports);
}

async function includeFileDependencies(build, basePath, eonPath, filePath) {
    var dependencies = await readDependencies(filePath);
    await includeImports(build, basePath, eonPath, path.dirname(filePath), dependencies, true);
}

async function readImports(filePath) {

    var fileContent;
    var matches = [];

    if (fs.existsSync(filePath)) {

        fileContent = (await readFile(filePath)).toString();

        // Removes the // comments
        fileContent = fileContent.replace(/^\s*\/\/(?:(?!(\r\n|\r|\n))[\s\S])*/gm, "");
        // Removes the /**/ comments
        fileContent = fileContent.replace(/^\s*\/\*(?:(?!\*\/)[\s\S])*\*\//gm, "");
        // Removes the <!-- --> comments
        fileContent = fileContent.replace(/^\s*\<\!--(?:(?!--\>)[\s\S])*--\>/gm, "");

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

async function includeImports(build, basePath, eonPath, dirname, imports) {

    await Promise.all(imports.map(async (entry) => {

        var entryHTML = await getCorrectedInputPath(eonPath, entry);
        var inputPath = await hasEonRoot(entry) ? path.join(basePath, entryHTML) : path.join(dirname, entryHTML);
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

            build.components[componentName] = {
                content: htmlFile + style,
                path: entryHTML
            };

            await includeFileDependencies(build, basePath, eonPath, inputPath);

        }

    }));

}

async function includeThemes(build, buildConfig) {

    if (buildConfig.themes) {

        var filePath, files;

        for (var i = 0; i < buildConfig.themes.length; i++) {

            filePath = buildConfig.base + "/" + buildConfig.location + "/" + buildConfig.themes[i];
            filePath = filePath.replace(/\\/g, "/");

            if (glob.isPattern(filePath)) {

                files = await glob.files(filePath);

                for (var j = 0; j < files.length; j++) {

                    filePath = files[j].match;
                    filePath = filePath.replace(/\\/g, "/");

                    await includeTheme(build, filePath);

                }

            } else {

                await includeTheme(build, filePath);

            }

        }

    }

}

async function includeTheme(build, filePath) {

    var themeRegex = /.*\/([^\\]+)\//;
    var fileNameRegex = /[^\/]+$/;
    var themeName, themeContent;

    fileName = filePath.match(fileNameRegex)[0];
    fileName = fileName.split('.')[0];

    themeContent = (await readFile(filePath)).toString();
    themeName = filePath.match(themeRegex)[1];
    
    build.themes[themeName] = build.themes[themeName] || {};
    build.themes[themeName][fileName] = themeContent;

}

async function getCorrectedInputPath(eonPath, inputPath) {

    inputPath = inputPath.replace(/\\/g, "/");
    inputPath = inputPath.charAt(0) !== "/" && inputPath.charAt(0) !== "@" && inputPath.charAt(0) !== "." ? "/" + inputPath : inputPath;
    inputPath = path.basename(inputPath).endsWith(".html") ? inputPath : path.join(inputPath, path.basename(inputPath) + ".html");

    if (await hasEonRoot(inputPath)) {
        inputPath = inputPath.substring(1);
        inputPath = eonPath + "/" + inputPath;
        inputPath = inputPath.replace(/\\/g, "/");
    }

    return inputPath;

}

async function hasEonRoot(inputPath) {
    return inputPath.charAt(0) === "@";
}

async function outputBuild(build, outputPath) {

    var txt = "";

    txt += "var eon = eon || {};\n";
    txt += "eon.builds = eon.builds || {components: {}, themes:{}};";
    txt += "eon.builds.components = Object.assign(eon.builds.components,";
    txt += JSON.stringify(build.components);
    txt += ");";
    txt += "eon.builds.themes = Object.assign(eon.builds.themes,";
    txt += JSON.stringify(build.themes);
    txt += ");";

    fs.writeFileSync(outputPath, txt);

    console.log("File " + outputPath + " created, includes:");
    console.log(Object.keys(build.components), Object.keys(build.themes));

}