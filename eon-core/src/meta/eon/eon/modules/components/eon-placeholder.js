
eon.domReady(function () {

  eon.imports.total++;
  eon.imports.count++;

  // Declare element
  eon.declare("eon-placeholder");

  eon.element({

    name: "eon-placeholder",

    properties: {
      /*
      @property {String} value
      @description Node name of the owner component
      */
      type: {
        value: "",
        reflect: true
      },
      /*
      @property {String} ownerId
      @description Owner's unique identifier
      */
      ownerId: {
        value: "",
        reflect: true
      },
      /*
      @property {Object} owner
      @description Reference to the owner
      */
      owner: {
        value: {},
        reflect: false
      },
    }

  });

})
