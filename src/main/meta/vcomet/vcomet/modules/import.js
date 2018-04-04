// ############################################################################################
// IMPORT ELEMENTS
// ############################################################################################

// Create imports reade callback
vcomet.createCallback("onImportsReady", vcomet, "ready");
vcomet.createCallback("onScriptsReady", vcomet, "ready");

// Imports the requested custom element file, admits arrays and strings
vcomet.import = function (param) {

    if (param.constructor === Array) {

        for (var i = 0; i < param.length; i++) {
            vcomet.insertImport(param[i]);
        }

    } else if (param.constructor === String) {

        vcomet.insertImport(param);

    }

};

vcomet.insertImport = function (href) {

    var elementName;
    
    elementName = (href.indexOf(".html") > -1) ? href.match(/[^\/]*$/g)[0].replace(".html", "").toLowerCase() : href.match(/[^\/]*$/g)[0].toLowerCase();
    href = (href.indexOf(".html") > -1) ? href : href + "/" + elementName + ".html";

    vcomet.imports = vcomet.imports || {
        count: 0,
        total: 0,
        ready: false
    };

    vcomet.imports.style = vcomet.imports.style || "";

    vcomet.imports.scripts = vcomet.imports.scripts || {};
    vcomet.imports.links = vcomet.imports.links || {};
    vcomet.imports.templates = vcomet.imports.templates || {};
    vcomet.imports.paths = vcomet.imports.paths || {};
    vcomet.imports.config = vcomet.imports.config || {};

    if (!(elementName in vcomet.imports.templates)) {

        // Increment total
        vcomet.imports.total++;

        // Avoid duplicated imports while waiting XMLHttpRequest callback.
        vcomet.imports.templates[elementName] = null;

        // Saves the paths of the imported elements
        vcomet.imports.paths[elementName] = href.substring(0, href.length - href.match(/[^\/]*$/g)[0].length);

        // Declare element
        vcomet.declare(elementName);

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                var importFragment = vcomet.fragmentFromString(this.responseText);
                var i;

                // Store combined styles
                var styles = importFragment.querySelectorAll("style");

                for (i = 0; i < styles.length; i++) {
                    vcomet.imports.style += styles[i].innerHTML;
                }

                // Store scripts
                var scripts = importFragment.querySelectorAll("script");

                if (scripts.length > 0) {

                    vcomet.imports.scripts[elementName] = {};

                    for (i = 0; i < scripts.length; i++) {


                        if (scripts[i].getAttribute("data-src")) {
                            scripts[i].src = vcomet.imports.paths[elementName] + scripts[i].getAttribute("data-src");
                            scripts[i].removeAttribute("data-src");
                        }

                        vcomet.imports.scripts[elementName][i] = scripts[i];

                    }

                }

                // Store links
                var links = importFragment.querySelectorAll("link");

                if (links.length > 0) {

                    vcomet.imports.links[elementName] = {};

                    for (i = 0; i < links.length; i++) {
                        vcomet.imports.links[elementName][i] = links[i];
                    }

                }

                // Store template
                var template = importFragment.querySelector("template");

                if (template) {
                    vcomet.imports.templates[elementName] = template;
                }

                // Wait unity domReady to ensure all imports are done and total value is accurate
                vcomet.domReady(function () {

                    vcomet.imports.count++;

                    if (!vcomet.imports.ready && vcomet.imports.count == vcomet.imports.total) {

                        // Appends all elements combined style
                        vcomet.handleStyleAppend();
                        // Appends the imported links
                        vcomet.handleLinksAppend();
                        // Appends the imported scripts
                        vcomet.handleScriptsAppend();
                        // When all the scripts are properly appended and ready then we import dependencies and see if we have finished all the imports
                        vcomet.onScriptsReady(function () {
                            
                            // Handles the dependencies and returns a boolean for whether there are pendings imports or not
                            var hasPendingImports = vcomet.handleDependencies();

                            // If there are no more dependencies to handle trigger onImportsReady
                            if (!hasPendingImports && !vcomet.imports.ready && vcomet.imports.count == vcomet.imports.total && vcomet.imports.total == Object.keys(vcomet.imports.config).length) {
                                vcomet.imports.ready = true;
                                vcomet.triggerCallback('onImportsReady', vcomet);
                            } else {
                                vcomet.__onScriptsReady__triggered = false;
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

vcomet.handleDependencies = function () {

    // Automated dependencies and interpolation
    var elementNames = Object.keys(vcomet.imports.config);
    var hasPendingImports = false;
    var hasDependencies;

    // For every element config imported we check if it needs dependencies and interpolation
    for (var i = 0; i < elementNames.length; i++) {

        // Handle dependencies
        hasDependencies = vcomet.handleConfigDependencies(elementNames[i]);

        if (hasDependencies) {
            hasPendingImports = true;
        }

        // Handle interpolation
        vcomet.handleTemplateInterpolation(elementNames[i]);
    }

    return hasPendingImports;

};


// Handle template interpolation
vcomet.handleTemplateInterpolation = function (name) {
    if (vcomet.imports.config[name].interpolation) {
        vcomet.interpolation.prepare(vcomet.imports.templates[name]);
    }
};

vcomet.handleStyleAppend = function () {

    var combinedStyle = document.createElement("style");
    combinedStyle.setAttribute("data-vcomet", "element-styles")
    combinedStyle.innerHTML = vcomet.imports.style;
    document.head.appendChild(combinedStyle);

};

vcomet.handleScriptsAppend = function (elementIndex, scriptIndex) {

    var elementNames = Object.keys(vcomet.imports.scripts);
    var resume = elementIndex && scriptIndex ? true : false;
    var elementScriptsKeys, elementScripts;
    
    // If it has to resume a previous scripts append we start from that index
    for (var i = resume ? elementIndex : 0; i < elementNames.length; i++) {

        elementScriptsKeys = Object.keys(vcomet.imports.scripts[elementNames[i]]);
        elementScripts = vcomet.imports.scripts[elementNames[i]];
        
        // If it has to resume a previous scripts append we start from that index
        for (var j = (resume && i == elementIndex) ? scriptIndex : 0; j < elementScriptsKeys.length; j++) {
            
            resume = false;

            if (elementScripts[elementScriptsKeys[j]].src) {
                
                // If the script has a src then we import it via require
                vcomet.amd.require([elementScripts[elementScriptsKeys[j]].src], function () {
                    vcomet.handleScriptsAppend(i, j + 1);
                });
                
                // Since we have to wait for the require to resumen our loops we break all the function execution
                return;

            } else {

                document.head.appendChild(elementScripts[elementScriptsKeys[j]]);

            }

        }

    }
    
    var scriptsReadyScript = document.createElement("script");
    
    scriptsReadyScript.innerHTML = "vcomet.triggerCallback('onScriptsReady', vcomet);";
    document.head.appendChild(scriptsReadyScript);

};

vcomet.handleLinksAppend = function () {

    var elementNames = Object.keys(vcomet.imports.links);
    var elementLinksKeys, elementLinks, link;

    for (var i = 0; i < elementNames.length; i++) {

        elementLinksKeys = Object.keys(vcomet.imports.links[elementNames[i]]);
        elementLinks = vcomet.imports.links[elementNames[i]];

        for (var j = 0; j < elementLinksKeys.length; j++) {

            link = elementLinks[elementLinksKeys[j]];

            if (link.getAttribute("data-href")) {

                link.href = vcomet.imports.paths[elementNames[i]] + link.getAttribute("data-href");
                link.removeAttribute("data-href");

            }

            document.head.appendChild(link);

        }

    }

};

// Handle config dependencies
vcomet.handleConfigDependencies = function (name) {
    var hasDependencies = false;
    var elementConfig = vcomet.imports.config[name];
    var dependencyName, dependencyPath, dependencyFile;
    
    // Loop through dependencies path and import new ones
    if (elementConfig.dependencies) {
        for (var j = 0; j < elementConfig.dependencies.length; j++) {
            dependencyName = elementConfig.dependencies[j].match(/[^\/]*$/g)[0].replace(".html", "").toLowerCase();
            dependencyPath = elementConfig.dependencies[j];
            if (!(dependencyName in vcomet.imports.templates)) {
                hasDependencies = true;
                dependencyFile = vcomet.imports.paths[name] + dependencyPath + ".html";
                vcomet.import(dependencyFile);
            }
        }
    }

    return hasDependencies;
}

// If there are no imports in the document we will trigger onImportsReady event immediately
vcomet.domReady(function () {
    if (!vcomet.imports || (vcomet.imports && vcomet.imports.total == 0)) {
        vcomet.triggerCallback("onImportsReady", vcomet);
    }
});