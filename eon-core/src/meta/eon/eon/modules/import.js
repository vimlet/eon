// ############################################################################################
// IMPORT ELEMENTS
// ############################################################################################

// Create imports reade callback
eon.createCallback("onImportsReady", eon, "ready");
eon.createCallback("onScriptsReady", eon, "ready");

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
eon.imports.errors = eon.imports.errors || {};

/*
@function import
@description Imports the requested custom element file, admits arrays and strings
@param {Object} param
*/
eon.import = function (param) {

    if (param.constructor === Array) {

        for (var i = 0; i < param.length; i++) {
            eon.requestImport(param[i]);
        }

    } else if (param.constructor === String) {

        eon.requestImport(param);

    }

};

/*
@function requestImport
@description Takes the component name and path, then declares the component and requests the .html file with ajax
@param {Object} href
*/
eon.requestImport = function (href) {

    var elementName;

    elementName = (href.indexOf(".html") > -1) ? href.match(/[^\/]*$/g)[0].replace(".html", "").toLowerCase() : href.match(/[^\/]*$/g)[0].toLowerCase();

    href = (href.indexOf(".html") > -1) ? href : href + "/" + elementName + ".html";
    href = href.charAt(0) === "@" ? eon.getBasePathUrl(href) : href;

    if (!(elementName in eon.imports.templates)) {

        // Everytime a new import is requested we reset the onReady and onImportsReady triggered state
        eon.__onImportsReady__triggered = false;
        eon.__onReady__triggered = false;

        // Increment total
        eon.imports.total++;

        // Avoid duplicated imports while waiting XMLHttpRequest callback.
        eon.imports.templates[elementName] = null;

        // Saves the paths of the imported elements
        eon.imports.paths[elementName] = href.substring(0, href.length - href.match(/[^\/]*$/g)[0].length);

        // Declare element
        eon.declare(elementName);

        eon.ajax(href, { cacheBusting: eon.cacheBusting || eon.importCacheBusting }, function (success, obj) {

            if (success) {

                // Cache
                eon.cache.add(obj.url, { name: elementName });

                if (obj.xhr.status === 200) {

                    eon.prepareComponent(elementName, obj.responseText);

                } else {

                    // Since this element can't be imported, we reduce the total components amount so that the execution may continue
                    eon.imports.total--;

                    // Removes it from the already saved objects
                    delete eon.imports.templates[elementName];
                    delete eon.imports.paths[elementName];

                    // Saves it into the erros object
                    eon.imports.errors[elementName] = obj.xhr.status;

                }

            }

        });

    }

};

/*
@function prepareComponent
@description Creates a fragment from the responseText and stores the scripts, links and template to append them when the DOM is ready
@param {Object} elementName
@param {String} content
*/
eon.prepareComponent = function (elementName, content) {

    var importFragment = eon.fragmentFromString(content);

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

        if (!eon.imports.ready && eon.imports.count === eon.imports.total) {

            // Appends all elements combined style
            eon.handleStyleAppend();
            // Appends the imported links
            eon.handleLinksAppend();
            // Appends the imported scripts
            eon.handleScriptsAppend();
            // When all the scripts are properly appended and ready then we import dependencies and see if we have finished all the imports
            eon.onScriptsReady(function () {

                // Handles the dependencies and returns a boolean for whether there are pending imports or not
                var hasPendingImports = eon.handleDependencies();

                // If there are no more dependencies to handle trigger onImportsReady
                if (!hasPendingImports && !eon.imports.ready && eon.imports.count === eon.imports.total && eon.imports.total === Object.keys(eon.imports.config).length) {

                    eon.imports.ready = true;

                    // Here we will register the main theme, the one declared by the user or our default one
                    eon.importMainTheme(eon.theme);
                    // Reads the themeSchema and imports the requested files
                    eon.importSchemaThemes();

                    eon.triggerCallback('onImportsReady', eon);
                    // Once the imports are done, if all the registered elements are ready then it we trigger the onReady callback
                    if (eon.registry.registeredElements === eon.registry.elementStatus.ready.length) {
                        eon.triggerCallback("onReady", eon);
                    }

                } else {
                    eon.__onScriptsReady__triggered = false;
                }

            });

        }

    });
};

/*
@function handleDependencies
@description Loops through the stored configs to search for independencies and it also parses the component template
*/
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
        eon.parseTemplate(elementNames[i]);
    }

    return hasPendingImports;

};


/*
@function parseTemplate
@description Parses the component template
@param {String} name
*/
eon.parseTemplate = function (name) {
    if (eon.imports.config[name].parse) {
        eon.interpolation.prepare(eon.imports.templates[name]);
    }
};


/*
@function importSchemaThemes
@description Takes eon's themaSchema and reads it to import the requested specific themes
*/
eon.importSchemaThemes = function () {

    if (eon.themeSchema) {

        var themes = Object.keys(eon.themeSchema);
        var documentHead = document.querySelector("head");
        var theme, themeElements, themeLink, themePath;

        // For each theme
        for (var i = 0; i < themes.length; i++) {

            theme = themes[i];
            themeElements = eon.themeSchema[theme];

            // Imports the main theme file
            eon.importMainTheme(theme);

            // Loops through the elements
            for (var j = 0; j < themeElements.length; j++) {

                eon.registry.registerTheme(themeElements[j], theme);
                themePath = eon.basePath + "/theme/" + theme + "/" + themeElements[j].toLowerCase() + ".css";

                themeLink = document.createElement("link");
                themeLink.setAttribute("rel", "stylesheet");
                themeLink.setAttribute("href", themePath);

                // Cache
                eon.cache.add(themePath, { name: themeElements[j].toLowerCase() });

                documentHead.appendChild(themeLink);

            }

        }

    }

};

/*
@function importMainTheme
@description Imports the main css file of the specified theme
@param {String} theme
*/
eon.importMainTheme = function (theme) {

    if (theme && !eon.registry.isThemeRegistered("main", theme)) {

        var documentHead = document.querySelector("head");
        var mainLink = document.createElement("link");
        var themePath = eon.basePath + "/theme/" + theme + "/main.css";

        themePath = eon.cacheBusting || eon.themeBoostedCache ? eon.getCacheBustedUrl(themePath) : themePath;

        eon.registry.registerTheme("main", theme);

        mainLink.setAttribute("rel", "stylesheet");
        mainLink.setAttribute("href", themePath);

        // Cache
        eon.cache.add(themePath);

        documentHead.appendChild(mainLink);

    }

};

/*
@function importElementTheme
@description Imports the component css file of the specified theme
@param {Object} config
@param {String} name
@param {String} theme
*/
eon.importElementTheme = function (config, name, theme) {

    if (theme && config.themed && !eon.registry.isThemeRegistered(name, theme)) {

        var importedDocumentHead = document.querySelector("head");
        var elementLink = document.createElement("link");
        var themePath = eon.basePath + "/theme/" + theme + "/" + name.toLowerCase() + ".css";

        themePath = eon.cacheBusting || eon.themeBoostedCache ? eon.getCacheBustedUrl(themePath) : themePath;

        eon.registry.registerTheme(name, theme);

        elementLink.setAttribute("rel", "stylesheet");
        elementLink.setAttribute("href", themePath);

        // Cache
        eon.cache.add(themePath, { name: name });

        importedDocumentHead.appendChild(elementLink);

    }
};

/*
@function handleStyleAppend
@description Takes the style made of all the components style and appends it to the document
*/
eon.handleStyleAppend = function () {

    if (eon.imports.style !== "") {

        var combinedStyle = document.createElement("style");

        combinedStyle.innerHTML = eon.imports.style;

        // Resets style to avoid css rules style replication
        eon.imports.style = "";

        document.head.appendChild(combinedStyle);

    }

};

/*
@function handleScriptsAppend
@description Appends the components scripts, since this is a recursive function and it may stop to 
continue in another moment it uses its both paremeters to continue where it stopped
@param {Number} elementIndex
@param {Number} scriptIndex
*/
eon.handleScriptsAppend = function (elementIndex, scriptIndex) {

    var elementNames = Object.keys(eon.imports.scripts);
    var resume = !isNaN(elementIndex - 1) && !isNaN(scriptIndex - 1) ? true : false;
    var elementScriptsKeys, elementScripts, script;

    // If it has to resume a previous scripts append we start from that index
    for (var i = resume ? elementIndex : 0; i < elementNames.length; i++) {

        elementScripts = eon.imports.scripts[elementNames[i]];
        elementScriptsKeys = Object.keys(elementScripts);

        // If it has to resume a previous scripts append we start from that index
        for (var j = (resume && i === elementIndex) ? scriptIndex : 0; j < elementScriptsKeys.length; j++) {

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

/*
@function removeScriptsReadyScripts
@description Removes all the scripts from the head that are no longer needed
*/
eon.removeScriptsReadyScripts = function () {
    var el = this;
    var scriptReadyScripts = document.head.querySelectorAll("script[scriptsready-script]");

    for (var i = 0; i < scriptReadyScripts.length; i++) {
        scriptReadyScripts[i].parentNode.removeChild(scriptReadyScripts[i]);
    }
};

/*
@function handleLinksAppend
@description Appends the components links
*/
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

/*
@function {Boolean} handleConfigDependencies
@description Checks the dependencies for a given component config. If there are dependencies to import  path and requests an 
import, it will also return a Boolean representing whether it has dependencies or not
@param {String} name
*/
eon.handleConfigDependencies = function (name) {
    var hasDependencies = false;
    var elementConfig = eon.imports.config[name];
    var dependencyName, dependencyPath, dependencyFile, relativeToParent;

    // Loop through dependencies path and import new ones
    if (elementConfig.dependencies) {
        for (var j = 0; j < elementConfig.dependencies.length; j++) {
            dependencyName = elementConfig.dependencies[j].match(/[^\/]*$/g)[0].replace(".html", "").toLowerCase();
            dependencyPath = elementConfig.dependencies[j].charAt(0) === "@" ? eon.getBasePathUrl(elementConfig.dependencies[j]) : elementConfig.dependencies[j];
            if (!(dependencyName in eon.imports.templates)) {
                hasDependencies = true;
                relativeToParent = elementConfig.dependencies[j].charAt(0) === "@" || elementConfig.dependencies[j].charAt(0) === "/" ? false : true;
                dependencyPath = (dependencyPath.indexOf(".html") > -1) ? dependencyPath : dependencyPath + "/" + dependencyName + ".html";
                dependencyFile = !relativeToParent ? dependencyPath : eon.imports.paths[name] + dependencyPath;
                eon.import(dependencyFile);
            }
        }
    }

    return hasDependencies;
}

/*
@function {String} getBasePathUrl
@description Returns a new url created with the base path
@param {String} url
*/
eon.getBasePathUrl = function (url) {

    url = url.substring(1);
    return eon.basePath + "/" + url;
};

// If there are no imports in the document we will trigger onImportsReady event immediately
eon.domReady(function () {
    if (!eon.imports || (eon.imports && eon.imports.total === 0)) {
        eon.triggerCallback("onImportsReady", eon);
    }
});