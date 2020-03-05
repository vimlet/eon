/*
  @function importBuild
  @description Takes either the eon.build and declares its components or it does it after requesting a build file provided by the user
  @param {String} filePath
*/
eon.importBuild = function (filePath) {

  if (eon.build && filePath && (!eon.processedBuilds || eon.processedBuilds.indexOf(filePath) == -1)) {
    // Initiate the buildsQueue
    eon.buildsQueue = eon.buildsQueue ? eon.buildsQueue : [];
    // If its not already in the queue then push the given filePath
    if (eon.buildsQueue.indexOf(filePath) == -1) {
      eon.buildsQueue.push(filePath);
    }
    // Request the file only if its the first on queue, otherwise it will be called once our first build is finished processing
    if (eon.buildsQueue.length <= 1) {

      eon.ajax(filePath, null, function (success, obj) {

        if (success) {

          eon.processedBuilds = eon.processedBuilds || [];
          eon.processedBuilds.push(filePath);

          if (obj.xhr.status === 200) {

            var script = document.createElement("script");
            // Create the script and fill it with its content, also remove the build path from the queue and process the next
            // build thats waiting on the builds queue and resume the imports
            script.innerHTML = obj.responseText + "eon.buildsQueue.splice(eon.buildsQueue.indexOf('" + filePath + "'), 1);";
            script.innerHTML = script.innerHTML + "if (eon.buildsQueue[0]) {eon.importBuild(eon.buildsQueue[0]);}; eon.declareBuildComponents(); eon.resumeImports();";

            document.head.appendChild(script);

          }

        } else {
          // Remove the build path from the queue and process the next build thats waiting on the buildQueue and resume the imports
          eon.buildsQueue.splice(eon.buildsQueue.indexOf(filePath), 1);
          eon.resumeImports();
        }

      });

    }

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

      if (!eon.declared.all[name] && !eon.declared.build[name]) {

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

        if (document.readyState === 'loading') {  // Loading hasn't finished yet
          document.addEventListener('DOMContentLoaded', function () {
            eon.declareBuildComponent(name);
          });
        } else {  // `DOMContentLoaded` has already fired
          eon.declareBuildComponent(name);
        }

      }

    }

  }

}

/*
@function declareBuildComponent
@description Declares a single build component
*/
eon.declareBuildComponent = function (name) {

  eon.declare(name);
  eon.prepareComponent(name, eon.build[name].content);

  // Removes it from eon.build so that in the next for loop we iterate less time
  delete eon.build[name];
}