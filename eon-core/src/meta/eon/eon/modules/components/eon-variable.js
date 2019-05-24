
eon.domReady(function () {

    eon.imports.total++;
    eon.imports.count++;

    // Declare element
    eon.declare("eon-variable");

    eon.element({

        name: "eon-variable",

        display: "inline-block",

        properties: {},

        privateFunctions: {},

        onTransformed: function () {
            console.log('transformed', this, this.__binded);
            if (!this.__binded) {
                eon.interpolation.bindWildVariable(this);
            }

        }

    });

});