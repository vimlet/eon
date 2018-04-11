var vcomet = vcomet || {};
vcomet.tests = vcomet.tests || {};
vcomet.tests.core = vcomet.tests.core || {

}

vcomet.onReady(function () {

    console.log(JSON.stringify(Object.keys(vcomet.imports.config), null, 2));

    var obj = {};
    var imported = Object.keys(vcomet.imports.config);
    var dependencies;

    for (var i = 0; i < imported.length; i++) {
        
        obj[imported[i]] = {};
        obj[imported[i]].dependencies = [];

        if (vcomet.imports.config[imported[i]].dependencies) {

            dependencies = vcomet.imports.config[imported[i]].dependencies;
            
            for (var j = 0; j < dependencies.length; j++) {
                obj[imported[i]].dependencies.push(dependencies[j].replace(".html", "").toLowerCase());
            }

        }
        
    }

    console.log('obj', JSON.stringify(obj, null, 2));

})