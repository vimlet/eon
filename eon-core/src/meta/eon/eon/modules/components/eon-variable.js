
eon.domReady(function () {

    eon.imports.total++;
    eon.imports.count++;

    // Declare element
    eon.declare("eon-variable");

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
            
            if (!this.__binded) {
                eon.interpolation.bindWildVariable(this);
            }

        }

    });

});