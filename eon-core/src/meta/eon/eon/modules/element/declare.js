/*
@function  declare
@description First function to get fired when an import is requested but before the import ajax request is 
actually triggered, constructs the elements class, hides the element and prepares its structure and processes that the element will go through
@param {String} name
@param {Object} baseElement
*/
eon.declare = function (name, baseElement) {

    // Specifies HTML element interface
    var baseElement = baseElement ? baseElement : HTMLElement;

    // Constructs the element class
    var elementClass = eon.constructClass(baseElement);

    // Element constructor: Important! never modify element attributes or children here
    elementClass.onCreated(function () {

        var el = this;

        eon.declareCallbacks(el);

        eon.generateSourceFragment(el);

        eon.initSourceCallbacks(el);
        
        eon.prepareElement(el, function () {

            var config = eon.imports.config[el.nodeName.toLowerCase()];

            // Adds eon element default config properties and functions 
            eon.parse(el, config);

            // Generates an instance of the element template and assigns it as a property of the element so we can easily access from anywhere
            eon.generateElementTemplate(el);

            // Searches elements tagged to have its reference saved inside the component template 
            eon.generateElementReferences(el);

            // Sets a css rule with the provided display by the config, if no display is provided it will have display block by default
            eon.initializeDisplay(el, config);

            eon.triggerAllCallbackEvents(el, config, "onCreated");
            eon.registry.updateElementStatus(el, "created");

        });

        eon.registry.updateElementStatus(el, "declared");

    });

    elementClass.onAttached(function () {

        var el = this;

        el.onCreated(function () {

            var config = eon.imports.config[el.nodeName.toLowerCase()];

            if (el.isFirstAttach) {

                el.isFirstAttach = false;
                // Once a new element is attached for the first time we set the onReady 
                // callback triggered property to false until all the elements are ready again
                eon.__onReady__triggered = false;

                eon.importTemplateClasses(el);

                eon.hideElement(el);

                // If it has an observer for the declaration of the element we disconnect it as we will no longer need it
                if (el.__onCreatedObserver) {
                    el.__onCreatedObserver.disconnect();
                }

                // Registers the element and generates uid
                eon.registry.registerElement(el);

                // Updates the references for the source nodes
                eon.updateSourceCallbacks(el);

                // Moves source-template elements to eon-template-clone elements by slot attribute query selector string
                // Unslotted source-template elements will be appended to eon-clone root
                // Note dynamic things that should be slotted must be added onCreated
                eon.slot(el);

                // Callback for the first time that the element has been attached, no template imported, only created and parsed
                eon.triggerAllCallbackEvents(el, config, "onInit");

                // Interpolation data bind
                eon.interpolation.bind(el, config);

                // Begins the transformation process
                eon.transform(el, config);

            }

            eon.triggerAllCallbackEvents(el, config, "onAttached");

            eon.registry.updateElementStatus(el, "attached");
            eon.debug.log("adapterEvents", "onAttached");

        });

    });

    // The parentComponent property is set to null when detached of the DOM, but this value will be set again once the element is attached
    elementClass.onDetached(function () {
        this.__parentComponent = null;
    });

    elementClass.onAttributeChanged(function (attrName, oldVal, newVal) {});

    customElements.define(name, elementClass);

};