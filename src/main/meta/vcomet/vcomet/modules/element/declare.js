vcomet.declare = function (name, baseElement) {

    // Specifies HTML element interface
    var baseElement = baseElement ? baseElement : HTMLElement;

    // Constructs the element class
    var elementClass = vcomet.constructClass(baseElement);

    // Element constructor: Important! never modify element attributes or children here
    elementClass.onCreated(function () {

        var el = this;
        
        vcomet.declareCallbacks(el);

        vcomet.generateSourceFragment(el);

        vcomet.initSourceCallbacks(el); 

        vcomet.prepareElement(el, function () {
            
            var config = vcomet.imports.config[el.nodeName.toLowerCase()];

            // Adds vcomet element default config properties and functions 
            vcomet.parse(el, config);

            // Generates an instance of the element template and assigns it as a property of the element so we can easily access from anywhere
            vcomet.generateElementTemplate(el);

            // Sets a css rule with the provided display by the config, if no display is provided it will have display block by default
            vcomet.initializeDisplay(el, config);
            
            vcomet.triggerAllCallbackEvents(el, config, "onCreated");
            vcomet.registry.updateElementStatus(el, "created");
            
        });
        
        vcomet.registry.updateElementStatus(el, "declared");

    });

    elementClass.onAttached(function () {

        var el = this;

        el.onCreated(function () {

            var config = vcomet.imports.config[el.nodeName.toLowerCase()];

            // TODO: should also provide attribute check
            if (el.isFirstAttach) {
                
                el.isFirstAttach = false;

                vcomet.importTemplateClasses(el);

                vcomet.hideElement(el);

                // If it has an observer for the declaration of the element we disconnect it as we will no longer need it
                if (el.__onCreatedObserver) {
                    el.__onCreatedObserver.disconnect();
                }

                // Registers the element and generates uid
                vcomet.registry.registerElement(el);

                vcomet.createAttributesObserver(el, config);

                // Updates the references for the source nodes
                vcomet.updateSourceCallbacks(el);
                
                // Moves source-template elements to vc-template-clone elements by slot attribute query selector string
                // Unslotted source-template elements will be appended to vc-clone root
                // Note dynamic things that should be slotted must be added onCreated
                vcomet.slot(el);

                // Callback for the first time that the element has been attached, no template imported, only created and parsed
                vcomet.triggerAllCallbackEvents(el, config, "onInit");

                // Interpolation data bind
                vcomet.interpolation.handleInterpolationVariables(el, config);

                // Creates the on resize callbacks handler for the element
                vcomet.registerResizeListeners(el, config);

                // Begins the transformation process
                vcomet.transform(el, config);

            }

            vcomet.triggerAllCallbackEvents(el, config, "onAttached");

            vcomet.registry.updateElementStatus(el, "attached");
            vcomet.debug.log("adapterEvents", "onAttached");

        });

    });

    elementClass.onDetached(function () {

    });

    elementClass.onAttributeChanged(function (attrName, oldVal, newVal) {

    });

    customElements.define(name, elementClass);

};