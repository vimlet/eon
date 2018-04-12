var vcomet = vcomet || {};
vcomet.tests = vcomet.tests || {};
vcomet.tests.core = vcomet.tests.core || {
    importsExpected: [
        {
            "name": "vc-el1",
            "dependencies": []
        },
        {
            "name": "vc-el2",
            "dependencies": [
                "vc-el3",
                "vc-el1"
            ]
        },
        {
            "name": "vc-el3",
            "dependencies": [
                "vc-el4"
            ]
        },
        {
            "name": "vc-el4",
            "dependencies": []
        }
    ],

    importsTemplatesExpected: [
        {
          "name": "vc-el1",
          "template": ""
        },
        {
          "name": "vc-el2",
          "template": "<div class=\"vc-el2-div\"></div>"
        },
        {
          "name": "vc-el3",
          "template": "<div class=\"vc-el3-div\"></div>"
        },
        {
          "name": "vc-el4"
        }
      ]
}

function loadExpected() {
    // Expected life-cycle visualization
    document.querySelector("#importsExpected").value = JSON.stringify(vcomet.tests.core.importsExpected, null, 2);
    document.querySelector("#importsTemplatesExpected").value = JSON.stringify(vcomet.tests.core.importsTemplatesExpected, null, 2);
}

function fillCurrentImports() {

    var imports = [];
    var imported = Object.keys(vcomet.imports.config);
    var dependencies;

    for (var i = 0; i < imported.length; i++) {

        imports.push({});
        imports[i].name = imported[i];
        imports[i].dependencies = [];

        if (vcomet.imports.config[imported[i]].dependencies) {

            dependencies = vcomet.imports.config[imported[i]].dependencies;

            for (var j = 0; j < dependencies.length; j++) {
                imports[i].dependencies.push(dependencies[j].replace(".html", "").toLowerCase());
            }

        }

    }

    document.querySelector("#importsCurrent").value = JSON.stringify(imports, null, 2);

}

function fillTemplates() {

    var templates = [];
    var importedTemplates = Object.keys(vcomet.imports.templates);
    var tempDiv;

    for (var i = 0; i < importedTemplates.length; i++) {

        templates.push({});
        templates[i].name = importedTemplates[i];

        if (vcomet.imports.templates[importedTemplates[i]]) {

            tempDiv = document.createElement("div");
            tempDiv.appendChild(vcomet.imports.templates[importedTemplates[i]].cloneNode(true).content);

            templates[i].template = tempDiv.innerHTML;
        }

    }

    document.querySelector("#importsTemplatesCurrent").value = JSON.stringify(templates, null, 2);

}

function fillStyles() {
    
    var styles;

}


vcomet.onReady(function () {

    fillCurrentImports();
    fillTemplates();

})