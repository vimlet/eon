
(function () {

    if (eon.build) {

        var names = Object.keys(eon.build);

        for (var i = 0; i < names.length; i++) {

            var name = names[i];
            var path = eon.build[name].path;

            path = (path.indexOf(".html") > -1) ? path : path + "/" + name + ".html";
            path = path.charAt(0) === "@" ? eon.getBasePathUrl(path) : path;
            
            eon.__onImportsReady__triggered = false;
            eon.__onReady__triggered = false;

            eon.imports.total++;

            // Avoid duplicated imports while waiting XMLHttpRequest callback.
            eon.imports.templates[name] = null;

            // Saves the paths of the imported elements
            eon.imports.paths[name] = path.substring(0, path.length - path.match(/[^\/]*$/g)[0].length);
            
            eon.declare(name);
            eon.prepareComponent(name, eon.build[name].content);

        }

    }

})();
