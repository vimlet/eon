/*
@function processBuild
@description Takes either the eon.build and declares its components or it does it after requesting a build file provided by the user
@param {String} filePath
*/
eon.processBuild = function (filePath) {

    if (filePath) {

      eon.pendingBuilds = eon.pendingBuilds ? eon.pendingBuilds + 1 : 1;

        eon.ajax(filePath, null, function (success, obj) {

            if (success) {

                if (obj.xhr.status === 200) {

                    var script = document.createElement("script");
                    script.innerHTML = obj.responseText + "eon.declareBuildComponents();eon.pendingBuilds--;eon.resumeImports();";
                    document.head.appendChild(script);

                }

            } else {
              eon.pendingBuilds--;
              eon.resumeImports();
            }

        });

    } else {
        eon.declareBuildComponents();
    }

}

/*
@function declareBuildComponents
@description Loops through eon.build and declares each component
*/
eon.declareBuildComponents = function () {

    eon.declaredComponents = eon.declaredComponents || {};

    if (eon.build) {

        var names = Object.keys(eon.build);

        for (var i = 0; i < names.length; i++) {

            var name = names[i];

            if (!eon.declared.all[name]) {

                eon.declared.build[name] = true;

                var path = eon.build[name].path;

                path = (path.indexOf(".html") > -1) ? path : path + "/" + name + ".html";
                path = path.charAt(0) === "@" ? eon.getBasePathUrl(path) : path;

                // Every time a new import is requested we reset the onReady and onImportsReady triggered state
                eon.imports.ready = false;

                eon.__onImportsReady__triggered = false;
                eon.__onReady__triggered = false;

                eon.imports.total++;

                // Avoid duplicated imports while waiting XMLHttpRequest callback.
                eon.imports.templates[name] = null;

                // Saves the paths of the imported elements
                eon.imports.paths[name] = path.substring(0, path.length - path.match(/[^\/]*$/g)[0].length);

                eon.declare(name);
                eon.prepareComponent(name, eon.build[name].content);

                // Removes it from eon.build so that in the next for loop we iterate less time
                delete eon.build[name];

            }

        }

    }

}

document.addEventListener("DOMContentLoaded", function (event) {
    eon.processBuild();
});

