// ############################################################################################
// IMPORT ELEMENTS
// ############################################################################################

// Create imports reade callback
eon.createCallback("onImportsReady", eon, "ready");
eon.createCallback("onScriptsReady", eon, "ready");

// Imports the requested custom element file, admits arrays and strings
eon.import = function (param) {

    if (param.constructor === Array) {

        for (var i = 0; i < param.length; i++) {
            eon.insertImport(param[i]);
        }

    } else if (param.constructor === String) {

        eon.insertImport(param);

    }

};

eon.insertImport = function (href) {

    var elementName;

    elementName = (href.indexOf(".html") > -1) ? href.match(/[^\/]*$/g)[0].replace(".html", "").toLowerCase() : href.match(/[^\/]*$/g)[0].toLowerCase();
    href = (href.indexOf(".html") > -1) ? href : href + "/" + elementName + ".html";

    eon.imports = eon.imports || {
        count: 0,
        total: 0,
        ready: false
    };

    eon.imports.style = eon.imports.style || "";

    eon.imports.scripts = eon.imports.scripts || {};
    eon.imports.links = eon.imports.links || {};
    eon.imports.templates = eon.imports.templates || {};
    eon.imports.paths = eon.imports.paths || {};
    eon.imports.config = eon.imports.config || {};

    if (!(elementName in eon.imports.templates)) {

        // Increment total
        eon.imports.total++;

        // Avoid duplicated imports while waiting XMLHttpRequest callback.
        eon.imports.templates[elementName] = null;

        // Saves the paths of the imported elements
        eon.imports.paths[elementName] = href.substring(0, href.length - href.match(/[^\/]*$/g)[0].length);

        // Declare element
        eon.declare(elementName);

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                var importFragment = eon.fragmentFromString(this.responseText);
                var i;

                // Store combined styles
                var styles = importFragment.querySelectorAll("style");

                for (i = 0; i < styles.length; i++) {
                    eon.imports.style += styles[i].innerHTML;
                }

                // Store scripts
                var scripts = importFragment.querySelectorAll("script");

                if (scripts.length > 0) {

                    eon.imports.scripts[elementName] = {};

                    for (i = 0; i < scripts.length; i++) {


                        if (scripts[i].getAttribute("data-src")) {
                            scripts[i].src = eon.imports.paths[elementName] + scripts[i].getAttribute("data-src");
                            scripts[i].removeAttribute("data-src");
                        }

                        eon.imports.scripts[elementName][i] = scripts[i];

                    }

                }

                // Store links
                var links = importFragment.querySelectorAll("link");

                if (links.length > 0) {

                    eon.imports.links[elementName] = {};

                    for (i = 0; i < links.length; i++) {
                        eon.imports.links[elementName][i] = links[i];
                    }

                }

                // Store template
                var template = importFragment.querySelector("template");

                if (template) {
                    eon.imports.templates[elementName] = template;
                }

                // Wait unity domReady to ensure all imports are done and total value is accurate
                eon.domReady(function () {

                    eon.imports.count++;

                    if (!eon.imports.ready && eon.imports.count == eon.imports.total) {

                        // Appends all elements combined style
                        eon.handleStyleAppend();
                        // Appends the imported links
                        eon.handleLinksAppend();
                        // Appends the imported scripts
                        eon.handleScriptsAppend();
                        // When all the scripts are properly appended and ready then we import dependencies and see if we have finished all the imports
                        eon.onScriptsReady(function () {

                            // Handles the dependencies and returns a boolean for whether there are pendings imports or not
                            var hasPendingImports = eon.handleDependencies();

                            // If there are no more dependencies to handle trigger onImportsReady
                            if (!hasPendingImports && !eon.imports.ready && eon.imports.count == eon.imports.total && eon.imports.total == Object.keys(eon.imports.config).length) {

                                eon.imports.ready = true;

                                // Here we will register the main theme, the one declared by the user or our default one
                                eon.importMainTheme(eon.theme);
                                // Reads the themeSchema and imports the requested files
                                eon.importSchemaThemes();

                                eon.triggerCallback('onImportsReady', eon);

                            } else {
                                eon.__onScriptsReady__triggered = false;
                            }

                        });

                    }

                });

            }
        };

        xhttp.open("GET", href);
        xhttp.send();

    }

};

eon.handleDependencies = function () {

    // Automated dependencies and interpolation
    var elementNames = Object.keys(eon.imports.config);
    var hasPendingImports = false;
    var hasDependencies;

    // For every element config imported we check if it needs dependencies and interpolation
    for (var i = 0; i < elementNames.length; i++) {

        // Handle dependencies
        hasDependencies = eon.handleConfigDependencies(elementNames[i]);

        if (hasDependencies) {
            hasPendingImports = true;
        }

        // Handle interpolation
        eon.handleTemplateInterpolation(elementNames[i]);
    }

    return hasPendingImports;

};


// Handle template interpolation
eon.handleTemplateInterpolation = function (name) {
    if (eon.imports.config[name].interpolation) {
        eon.interpolation.prepare(eon.imports.templates[name]);
    }
};

// Imports specific componentes themesif specified
eon.importSchemaThemes = function () {

    if (eon.themeSchema) {

        var themes = Object.keys(eon.themeSchema);
        var documentHead = document.querySelector("head");
        var theme, themeElements, themeLink;

        // For each theme
        for (var i = 0; i < themes.length; i++) {

            theme = themes[i];
            themeElements = eon.themeSchema[theme];

            // Imports the main theme file
            eon.importMainTheme(theme);

            // Loops through the elements
            for (var j = 0; j < themeElements.length; j++) {

                eon.registry.registerTheme(themeElements[j], theme);

                themeLink = document.createElement("link");
                themeLink.setAttribute("rel", "stylesheet");
                themeLink.setAttribute(
                    "href",
                    eon.basePath + "/theme/" + theme + "/" + themeElements[j].toLowerCase() + ".css"
                );

                documentHead.appendChild(themeLink);

            }

        }

    }

};

eon.importMainTheme = function (theme) {

    if (theme && !eon.registry.isThemeRegistered("main", theme)) {

        var documentHead = document.querySelector("head");
        var mainLink = document.createElement("link");

        eon.registry.registerTheme("main", theme);

        mainLink.setAttribute("rel", "stylesheet");
        mainLink.setAttribute("href", eon.basePath + "/theme/" + theme + "/main.css");

        documentHead.appendChild(mainLink);

    }

};

eon.importElementTheme = function (config, name, theme) {

    if (theme && config.themed && !eon.registry.isThemeRegistered(name, theme)) {

        var importedDocumentHead = document.querySelector("head");

        eon.registry.registerTheme(name, theme);

        var elementLink = document.createElement("link");
        elementLink.setAttribute("rel", "stylesheet");
        elementLink.setAttribute(
            "href",
            eon.basePath + "/theme/" + theme + "/" + name.toLowerCase() + ".css"
        );

        importedDocumentHead.appendChild(elementLink);

    }
};

eon.handleStyleAppend = function () {

    if (eon.imports.style != "") {

        var combinedStyle = document.createElement("style");

        combinedStyle.setAttribute("data-eon", "element-styles")
        combinedStyle.innerHTML = eon.imports.style;

        // Resets style to avoid css rules style replication
        eon.imports.style = "";

        document.head.appendChild(combinedStyle);

    }

};

eon.handleScriptsAppend = function (elementIndex, scriptIndex) {

    var elementNames = Object.keys(eon.imports.scripts);
    var resume = !isNaN(elementIndex - 1) && !isNaN(scriptIndex - 1) ? true : false;
    var elementScriptsKeys, elementScripts, script;

    // If it has to resume a previous scripts append we start from that index
    for (var i = resume ? elementIndex : 0; i < elementNames.length; i++) {

        elementScripts = eon.imports.scripts[elementNames[i]];
        elementScriptsKeys = Object.keys(elementScripts);

        // If it has to resume a previous scripts append we start from that index
        for (var j = (resume && i == elementIndex) ? scriptIndex : 0; j < elementScriptsKeys.length; j++) {

            resume = false;

            if (elementScripts[elementScriptsKeys[j]].src) {

                // If the script has a src then we import it via require
                eon.amd.require([elementScripts[elementScriptsKeys[j]].src], function () {
                    eon.handleScriptsAppend(i, j + 1);
                });

                // Since we have to wait for the require to resumen our loops we break all the function execution
                return;

            } else {

                // iPad fix, if we tried to append the script saved in elementScripts directly the script was not executing
                script = document.createElement("script");
                script.innerHTML = elementScripts[elementScriptsKeys[j]].innerHTML;
                elementScripts[elementScriptsKeys[j]] = script;

                // // Here we take the current script text and add our code to remove the script once its finished
                elementScripts[elementScriptsKeys[j]].innerHTML = elementScripts[elementScriptsKeys[j]].innerHTML;
                elementScripts[elementScriptsKeys[j]].innerHTML = elementScripts[elementScriptsKeys[j]].innerHTML +
                    "var elementNames = Object.keys(eon.imports.scripts);" +
                    "var elementScripts = eon.imports.scripts[elementNames[" + i + "]];" +
                    "var scriptKey = Object.keys(elementScripts)[" + j + "];" +
                    "elementScripts[scriptKey].parentNode.removeChild(elementScripts[scriptKey]);";

                document.head.appendChild(elementScripts[elementScriptsKeys[j]]);

            }

        }

    }

    // Since we are finished looping all the current element scripts we reset our scripts object to avoid looping through them again in case more elements are being imported after
    eon.imports.scripts = {};

    var scriptsReadyScript = document.createElement("script");

    scriptsReadyScript.setAttribute("scriptsready-script", "");
    scriptsReadyScript.innerHTML = "eon.triggerCallback('onScriptsReady', eon); eon.removeScriptsReadyScripts();";

    document.head.appendChild(scriptsReadyScript);

};

eon.removeScriptsReadyScripts = function () {
    var el = this;
    var scriptReadyScripts = document.head.querySelectorAll("script[scriptsready-script]");

    for (var i = 0; i < scriptReadyScripts.length; i++) {
        scriptReadyScripts[i].parentNode.removeChild(scriptReadyScripts[i]);
    }
};

eon.handleLinksAppend = function () {

    var elementNames = Object.keys(eon.imports.links);
    var elementLinksKeys, elementLinks, link;

    for (var i = 0; i < elementNames.length; i++) {

        elementLinksKeys = Object.keys(eon.imports.links[elementNames[i]]);
        elementLinks = eon.imports.links[elementNames[i]];

        for (var j = 0; j < elementLinksKeys.length; j++) {

            link = elementLinks[elementLinksKeys[j]];

            if (link.getAttribute("data-href")) {

                link.href = eon.imports.paths[elementNames[i]] + link.getAttribute("data-href");
                link.removeAttribute("data-href");

            }

            document.head.appendChild(link);

        }

    }

};

// Handle config dependencies
eon.handleConfigDependencies = function (name) {
    var hasDependencies = false;
    var elementConfig = eon.imports.config[name];
    var dependencyName, dependencyPath, dependencyFile;

    // Loop through dependencies path and import new ones
    if (elementConfig.dependencies) {
        for (var j = 0; j < elementConfig.dependencies.length; j++) {
            dependencyName = elementConfig.dependencies[j].match(/[^\/]*$/g)[0].replace(".html", "").toLowerCase();
            dependencyPath = elementConfig.dependencies[j];
            if (!(dependencyName in eon.imports.templates)) {
                hasDependencies = true;
                dependencyPath = (dependencyPath.indexOf(".html") > -1) ? dependencyPath : dependencyPath + "/" + dependencyName + ".html";
                dependencyFile = eon.imports.paths[name] + dependencyPath;
                eon.import(dependencyFile);
            }
        }
    }

    return hasDependencies;
}

// If there are no imports in the document we will trigger onImportsReady event immediately
eon.domReady(function () {
    if (!eon.imports || (eon.imports && eon.imports.total == 0)) {
        eon.triggerCallback("onImportsReady", eon);
    }
});