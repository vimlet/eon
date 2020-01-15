
eon.domReady(function () {

    eon.imports.total++;
    eon.imports.count++;

    eon.element({

        name: "eon-variable",

        display: "inline-block",

        properties: {
            bind: {
                value: "",
                reflect: true
            },
            global: {
                value: "",
                reflect: true
            }
        },

        privateFunctions: {},

        onTransformed: function () {
            
            if (!this.__bound) {
                eon.interpolation.bindWildVariable(this);
            }

        }

    });

    // Declare element
    eon.declare("eon-variable");

});