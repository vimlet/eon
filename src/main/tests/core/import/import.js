var vcomet = vcomet || {};
vcomet.tests = vcomet.tests || {};
vcomet.tests.core = vcomet.tests.core || {

}

vcomet.onReady(function () {

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

    console.log('imports', JSON.stringify(imports, null, 2));

})