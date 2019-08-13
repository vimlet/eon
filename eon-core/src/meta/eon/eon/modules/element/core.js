/*
@function  element
@description This function comes with the element script, it handles the element style insertion and saves the config,
it accepts two parameters to accept a wider variety of calls
@param {Object} param1
@param {Object} param2
*/
eon.element = function (param1, param2) {

    var config, stylePath, name;

    // If a second parameter is provided then we check if its an object with the config inside, or 
    // it is the config itself, if its none then we assign an empty object as the config,
    // in this case the first parameter will always be the component name
    if (param2) {

        config = param2.config ? param2.config : param2.constructor === Object ? param2 : {};
        name = param1;

        // If no second paremeter is provided then the first parameter may either be an object with the name and config inside 
        // or be the config itself with the name as one of its keys
    } else {

        config = param1.config ? param1.config : param1.constructor === Object ? param1 : {};
        name = config.name ? config.name : param1;

    }

    stylePath = config.style ? config.style : "";

    // If the user provided a style path then we create its link and append it
    // If the element is being part of a builded file then the style will come with it so we wont import it
    if (stylePath !== "" && !eon.declared.build[name]) {

        var link = document.createElement("link");

        stylePath = eon.imports.paths[name.toLowerCase()] + stylePath;
        stylePath = eon.cacheBusting || eon.themeCacheBusting ? eon.getCacheBustedUrl(stylePath) : stylePath;

        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", stylePath);

        // Cache
        eon.cache.add(stylePath, { name: name });

        document.head.appendChild(link);

    }

    eon.imports.config[name.toLowerCase()] = config;
    eon.triggerCallback("onScriptsReady", eon);

};

/*
@function {Object} define
@description Wrapper function of the define function
@param {Object} config
*/
eon.define = function (config) {
    eon.amd.define(function () {
        return config;
    });
};

/*
@function {Object} createElement
@description Allows the user to create custom elements directly providing a config object to add aditional functions, properties and callbacks
@param {String} name
@param {Object} config
*/
eon.createElement = function (name, config) {

    var el = document.createElement(name);

    if (config) {

        eon.importPublic(el, config);

        var callbacks = ["onCreated", "onInit", "onTransformed", "onRender", "onBubbleRender", "onReady"];

        for (var i = 0; i < callbacks.length; i++) {

            if (config[callbacks[i]]) {
                el[callbacks[i]](config[callbacks[i]]);
            }

        }

    }

    return el;

};

/*
@function  hideElement
@description Assigns the class to the element to hide it
@param {Object} el
*/
eon.hideElement = function (el) {
    el.classList.add("eon-until-rendered");
};

/*
@function  unhideElement
@description Removes the class to the element to make it visible
@param {Object} el
*/
eon.unhideElement = function (el) {
    el.classList.remove("eon-until-rendered");
};

/*
@function  declareCallbacks
@description Creates all the callbacks that the element may trigger through its life cycle
@param {Object} el
*/
eon.declareCallbacks = function (el) {

    // Creates the callback needed for the element
    eon.createCallback("onCreated", el, "ready");
    eon.createCallback("onInit", el, "ready");
    eon.createCallback("onTransformed", el, "ready");
    eon.createCallback("onRender", el, "ready");
    eon.createCallback("onBubbleRender", el, "ready");
    eon.createCallback("onReady", el, "ready");
    eon.createCallback("onPropertyChanged", el);
    eon.createCallback("onAttributeChanged", el);
    eon.createCallback("onDataChanged", el);
    eon.createCallback("onLocaleChanged", el);

    eon.createResizeCallbacks(el);

};

/*
@function  generateSourceFragment
@description Creates the source fragment and moves all the child elements into it
@param {Object} el
*/
eon.generateSourceFragment = function (el) {

    el.source = document.createDocumentFragment();

    // If there are no childs, its means whether that it doesnt and wont have childs, or that it has not been processed by the browser yet,
    // either way we create a mutation observer to listen to child node changes, this observer will be disconnected on the "onAttached" callback.
    // Else just loops through its nodes and append them to the source fragment
    if (el.childNodes.length === 0) {

        var observer = new MutationObserver(function (mutations) {

            mutations.forEach(function (mutation) {

                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    el.source.appendChild(mutation.addedNodes[i]);
                }

            });

        });

        // Start observing
        observer.observe(el, {
            attributes: false,
            childList: true,
            characterData: false
        });

        el.__onCreatedObserver = observer;

    } else {

        // Move child to source fragment
        while (el.childNodes.length > 0) {
            el.source.appendChild(el.childNodes[0]);
        }

    }

};

/*
@function  prepareElement
@description Recieves a callback for the element creation process and waits until all the imports are ready to trigger it
@param {Object} el
@param {Function} callback
*/
eon.prepareElement = function (el, callback) {

    // Mark element as first attach
    el.isFirstAttach = true;

    // Runs the callback provided when all imports are ready
    eon.onImportsReady(function () {
        callback();
    });

};

/*
@function  parse
@description Assigns all the properties, attributes and some usefull functions to the element
@param {Object} el
@param {Object} config
*/
eon.parse = function (el, config) {
    // Creates object properties for the element with data about the properties/attributes to be observed
    eon.collectObserveData(el, config);

    // Imports Data and Public/Private properties and functions
    eon.importData(el, config);
    eon.importLocale(el, config);
    eon.importPublic(el, config);
    eon.importPrivate(el, config);

    // Defines usefull functions for the component
    eon.definePath(el);
    eon.defineParentComponent(el);
    eon.defineOverlayCreation(el);
    eon.definePlaceholderCreation(el);

    // Creates a proxy so that when the user changes the attribute it will take care of the callbacks
    eon.createAttributesObserver(el, config);

    eon.triggerAllCallbackEvents(el, config, "onParsed");
    eon.registry.updateElementStatus(el, "parsed");

};

/*
@function  definePath
@description Assigns the importPath property to the component
@param {Object} el
*/
eon.definePath = function (el) {
    el.importPath = eon.imports.paths[el.nodeName.toLowerCase()];
};

/*
@function  defineParentComponent
@description Assigns the parentComponent property that will provide the nearest enclosing eon component
@param {Object} el
*/
eon.defineParentComponent = function (el) {

    var propDescriptor = {};

    propDescriptor.get = function () {
        el.__parentComponent = el.__parentComponent ? el.__parentComponent : eon.getEnclosingComponent(el);
        return el.__parentComponent;
    };

    propDescriptor.set = function () { };

    Object.defineProperty(el, "parentComponent", propDescriptor);

};

/*
@function  defineOverlayCreation
@description Provides the component with a function that will allow an overlay creation
@param {Object} el
*/
eon.defineOverlayCreation = function (el) {

    // Defines the function for the element
    el.generateOverlayNode = function (overlay) {

        // If an overlay is provided we will prepare that one, otherwise we just create a new one
        overlay = overlay ? overlay : document.createElement("eon-overlay");

        // The properties assignation takes place in the onRender callback since if we assign a theme to the overlay
        // it will search a theme file for the overlay, and we just want to assign a theme so that the overlay can recieve
        // the main theme classes
        overlay.onRender(function () {

            // Assigns properties for the overlay
            overlay.owner = el;
            overlay.type = el.nodeName.toLowerCase();
            overlay.ownerId = eon.registry.getUidFull(el);

            if (el.hasAttribute("theme")) {
                overlay.setAttribute("theme", el.getAttribute("theme"));
            }

        })

        return overlay;

    };

};

/*
@function  definePlaceholderCreation
@description Provides the component with a function that will allow an overlay creation
@param {Object} el
*/
eon.definePlaceholderCreation = function (el) {

    // Defines the function for the element
    el.generatePlaceholderNode = function (placeholder) {

        // If a placeholder is provided we will prepare that one, otherwise we just create a new one
        placeholder = placeholder ? placeholder : document.createElement("eon-placeholder");

        // The properties assignation takes place in the onRender callback since we want to make sure the owner has an uid for the ownerId property
        placeholder.onRender(function () {

            // Assigns properties for the overlay
            placeholder.owner = el;
            placeholder.type = el.nodeName.toLowerCase();
            placeholder.ownerId = eon.registry.getUidFull(el);

        });

        return placeholder;

    };

};

/*
@function  collectObserveData
@description Loops through the private and public properties to save the ones that will be observed/reflected in their corresponding arrays
@param {Object} el
@param {Object} config
*/
eon.collectObserveData = function (el, config) {

    el.__observeProperties = {};
    el.__observeAttributes = {};
    el.__reflectProperties = {};

    // Adds theme as reflected property
    config.properties = config.properties ? config.properties : {};
    config.properties.theme = {
        value: "",
        reflect: true
    };

    // Reads properties object to add them to the observe object if needed
    if (config.properties) {

        var propertiesKeys = Object.keys(config.properties);

        for (var i = 0; i < propertiesKeys.length; i++) {
            // Add observe to observeProperties
            if (config.properties[propertiesKeys[i]].observe) {
                el.__observeProperties[propertiesKeys[i]] = true;
            }

            // If the property has reflect active but it has no value we set an empty string
            if (config.properties[propertiesKeys[i]].reflect && !config.properties[propertiesKeys[i]].hasOwnProperty("value")) {
                config.properties[propertiesKeys[i]].value = "";
            }

            // If the property has reflect but its value is of type object we set reflect to false
            if (config.properties[propertiesKeys[i]].reflect && typeof config.properties[propertiesKeys[i]].value === "object") {
                config.properties[propertiesKeys[i]].reflect = false;
            }

            // Add reflect to observeAttributes
            if (config.properties[propertiesKeys[i]].reflect) {
                el.__observeAttributes[eon.util.camelToHyphenCase(propertiesKeys[i])] = true;
                el.__reflectProperties[propertiesKeys[i]] = true;
            }
        }
    }

    // Reads private properties object to add them to the observe object if needed
    if (config.privateProperties) {

        var privatePropertiesKeys = Object.keys(config.privateProperties);

        for (var j = 0; j < privatePropertiesKeys.length; j++) {
            // Add observe to observeProperties
            if (config.privateProperties[privatePropertiesKeys[j]].observe) {
                el.__observeProperties["_" + privatePropertiesKeys[j]] = true;
            }

            // Add reflect to observeAttributes
            if (config.privateProperties[privatePropertiesKeys[j]].reflect) {
                el.__observeAttributes[eon.util.camelToHyphenCase(privatePropertiesKeys[j])] = true;
                el.__reflectProperties["_" + privatePropertiesKeys[j]] = true;
            }
        }
    }

};

/*
@function  createAttributesObserver
@description Takes the attributes that will be observed and creates a proxy for the setAttribute function to listen to their changes
@param {Object} el
@param {Object} config
*/
eon.createAttributesObserver = function (el, config) {

    var observeAttributesKeys = Object.keys(el.__observeAttributes);

    // First we check if we have attributes to observe
    if (observeAttributesKeys.length > 0) {

        var key, property, privateProperty;

        // For each observe attribute if check which value should be assign to it
        for (var i = 0; i < observeAttributesKeys.length; i++) {

            key = observeAttributesKeys[i].slice(0);
            property = eon.util.hyphenToCamelCase(key);
            privateProperty = "__" + property;

            // If the attribute already has a value we assign this value to its corresponding property
            if (el.getAttribute(key)) {

                el[privateProperty] = el.getAttribute(key);

                // If the attribute has no value we check if the property has it, if not we assign it an empty value
            } else {

                if (config.properties[property].reflectDefault) {
                    eon.handleReflectDefaultProperty(el, key, property);
                }

            }

        }

        // Here we override the setAttribute function for our element, to also call another callback when the user sets an attribute
        (function (proxied) {
            el.setAttribute = function () {
                setAttributeCallback(arguments[0], el.getAttribute(arguments[0]), arguments[1]);
                return proxied.apply(this, arguments);
            };
        })(el.setAttribute);

        // Callback to be triggered when the user calls to setAttribute
        var setAttributeCallback = function (attrName, oldVal, newVal) {

            var property = eon.util.hyphenToCamelCase(attrName);

            // The onAttributeChanged callback is triggered whether its observed or as a reflection of a property
            if (el.__observeAttributes[attrName] || el.__reflectProperties[property]) {
                eon.triggerAllCallbackEvents(el, config, "onAttributeChanged", [attrName, oldVal, newVal]);
            }

            // The onPropertyChanged callback is triggered when the attribute has changed and its reflect by a property
            if (el.__reflectProperties[property]) {
                el["__" + property] = newVal;
                eon.triggerAllCallbackEvents(el, config, "onPropertyChanged", [property, oldVal, newVal]);
            }

        };

    }

};

/*
@function  handleReflectDefaultProperty
@description For the default reflected properties, the element waits until the onInit callback to set the corresponding attribute, 
both attribute and property keys are provided since they can be different when having camel/hyphen cases
@param {Object} el
@param {String} key [Attribute key]
@param {String} property [Property key]
*/
eon.handleReflectDefaultProperty = function (el, key, property) {

    var value = el.hasOwnProperty("__" + property) ? el["__" + property] : "";

    // This is done in the onInit callback since we cannot set an attribute in the onCreated one
    el.onInit(function () {

        // Only sets the attribute if the value is not of object type
        if (typeof value !== "object") {
            el.setAttribute(key, value);
        } else {
            el.removeAttribute(key);
        }

    });

}

/*
@function handleProperty
@description Creates properties descriptors for all the properties to be observed or reflected
@param {Object} el
@param {Object} config
@param {Array} reflectProperties
@param {Array} observeProperties
@param {String} property
*/
eon.handleProperty = function (el, config, reflectProperties, observeProperties, property) {

    var key = property.key;
    var value = property.value;

    var observe = observeProperties[key];
    var reflect = reflectProperties[key];

    // Complex property
    if (typeof value === "object" && value.hasOwnProperty("value")) {
        if (typeof value.value === "object") {
            value = Object.assign({}, value.value);
        } else {
            value = value.value;
        }
    }

    // Define property value before to avoid setting attributes onCreated if reflect
    el[key] = value;

    if (observe || reflect) {
        // Define property descriptor with custom get and set
        Object.defineProperty(
            el,
            key,
            eon.createPropDescriptor(el, config, key, value, reflect)
        );
        el["__" + key] = value;
    }
};

/*
@function createPropDescriptor
@description Creates properties descriptors for all the properties to be observed or reflected
@param {Object} el
@param {Object} config
@param {String} key
@param {Value} value
@param {String} property
*/
eon.createPropDescriptor = function (el, config, key, value, reflect) {
    var propDescriptor = {};
    // Redirect get and set to __key
    propDescriptor.get = function () {
        return el["__" + key];
    };
    
    propDescriptor.set = function (value) {
        
        if (reflect) {
            // Trigger onAttributeChanged, note this will trigger also onPropertyChanged if needed
            // Only sets the attribute if the value is not of object type
            if (typeof value !== "object") {
                el.setAttribute(eon.util.camelToHyphenCase(key), value);
            } else {
                el.removeAttribute(eon.util.camelToHyphenCase(key));
            }

        } else {
            // Trigger onPropertyChanged
            eon.triggerAllCallbackEvents(el, config, "onPropertyChanged", [
                key,
                el["__" + key],
                value
            ]);
        }

        // Update property value
        el["__" + key] = value;
    };

    return propDescriptor;
};

/*
@function importData
@description Assigns the data provided by the config to the component
@param {Object} el
@param {Object} config
*/
eon.importData = function (el, config) {

    el.data = {};

    if (config.data) {
        el.data = Object.assign({}, config.data);
    }

}


/*
@function importLocale
@description Assigns the locale provided by the config to the component
@param {Object} el
@param {Object} config
*/
eon.importLocale = function (el, config) {

    el.locale = {};

    if (config.locale) {
        el.locale = Object.assign({}, config.locale);
    }

}

/*
@function importPublic
@description Takes all the public functions/properties and assigns them to the component
@param {Object} el
@param {Object} config
*/
eon.importPublic = function (el, config) {

    if (config.properties) {
        var keys = Object.keys(config.properties);
        var attributeKey;

        for (var i = 0; i < keys.length; i++) {
            attributeKey = eon.util.camelToHyphenCase(keys[i]);
            // If the element has one of the reflected attributes we send that value as the value of the property
            eon.handleProperty(el, config, el.__reflectProperties, el.__observeProperties, {
                key: keys[i],
                value: el.hasAttribute(attributeKey) ? el.getAttribute(attributeKey) : config.properties[keys[i]]
            });
        }
    }

    if (config.functions) {
        var fnKeys = Object.keys(config.functions);

        for (var j = 0; j < fnKeys.length; j++) {
            el[fnKeys[j]] = config.functions[fnKeys[j]];
        }
    }

};

/*
@function importPrivate
@description Takes all the private functions/properties and assigns them to the component
@param {Object} el
@param {Object} config
*/
eon.importPrivate = function (el, config) {

    if (config.privateProperties) {
        var keys = Object.keys(config.privateProperties);

        for (var i = 0; i < keys.length; i++) {
            eon.handleProperty(el, config, el.__reflectProperties, el.__observeProperties, {
                key: "_" + keys[i],
                value: config.privateProperties[keys[i]]
            });
        }
    }

    if (config.privateFunctions) {
        var privateFnKeys = Object.keys(config.privateFunctions);

        for (var j = 0; j < privateFnKeys.length; j++) {
            el["_" + privateFnKeys[j]] = config.privateFunctions[privateFnKeys[j]];
        }
    }

};

/*
@function  importTemplateClasses
@description If classes are specified in the element template, these are moved into the actual element
@param {Object} el
*/
eon.importTemplateClasses = function (el) {

    var template = eon.imports.templates[el.tagName.toLowerCase()];

    if (template && template.classList.length !== 0) {

        var elClassesArray = Array.prototype.slice.call(el.classList);
        var templateClassesArray = Array.prototype.slice.call(template.classList);

        elClassesArray = templateClassesArray.concat(elClassesArray);

        el.setAttribute("class", elClassesArray.join(" "));

    }

};

/*
@function triggerAllCallbackEvents
@description Triggers all the functions for the callback, including the one provided by the config
@param {Object} el
@param {Object} config
@param {String} callback
@param {Array} params
*/
eon.triggerAllCallbackEvents = function (el, config, callback, params) {

    eon.debug.log("triggerAllCallbackEvents", callback);

    // This "if" is created for the porpuse of not allowing onPropertyChanged and onAttributeChanged
    // to be triggered once the element is render, this is so we dont have to use el.onRender() inside this callback to not crash
    if (!((callback === "onPropertyChanged" || callback === "onAttributeChanged") && eon.registry.isRendered(el) !== true)) {

        if (config && config[callback]) {
            config[callback].apply(el, params);
        }

        eon.debug.log("elementEvents", callback);
        eon.triggerCallback(callback, el, el, params);

    }

};

/*
@function transform
@description Appends the element template, imports the needed themes for the component and creates the eon.theme change listener
@param {Object} el
@param {Object} config
*/
eon.transform = function (el, config) {

    if (!eon.registry.isTransformed(el)) {

        // Gets the theme that will be used for this element, if it has none we set a default theme and return it
        // We pass the config so that if the element has themed: "false" but the element has a theme specified by the user it turns it into "true"
        var theme = eon.initElementTheme(el, config);
        var name = el.nodeName.toLowerCase();

        // Imports the template of the element
        eon.appendElementTemplate(el);

        // Registers the main theme of this theme if its not yet registered
        eon.importMainTheme(theme);

        // If the element has not yet registered its theme it will proceed on importing it
        eon.importElementTheme(config, name, theme);

        // Prepares th element to change its theme in case eon theme changes
        eon.setupEonThemeListener(el, config);

        // Adds the element to the transformQueue
        if (eon.registry.transformedQueueBreak) {

            eon.registry.transformedQueueBreak = false;

            setTimeout(function () {
                eon.triggerTransformed(el, config);
            }, 0);

        } else {

            eon.triggerTransformed(el, config);

        }

    }

};

/*
@function initElementTheme
@description Sets a theme to the component if non was specified
@param {Object} el
@param {Object} config
*/
eon.initElementTheme = function (el, config) {

    var theme = eon.theme;

    // This will allows us to know when the component theme is given manually by the user,
    // this will also help not to change the theme on eon.theme change
    el.__specificTheme = el.hasAttribute("theme") || el.theme ? true : false;

    theme = document.body.dataset.theme ? document.body.dataset.theme : theme;
    theme = document.body.hasAttribute("theme") ? document.body.getAttribute("theme") : theme;
    theme = el.hasAttribute("theme") ? el.getAttribute("theme") : theme;
    theme = el.theme ? el.theme : theme;

    // If the user has specified a theme but the element is not themeable then we turn themed: "true" so
    // that it can now import a theme
    config.themed = el.__specificTheme && !config.themed ? true : config.themed;

    // Whether it has the attribute or not, we set it
    el.setAttribute("theme", theme);

    return theme;
}

/*
@function setupEonThemeListener
@description Creates a callback to get fired when eon theme changes
@param {Object} el
@param {Object} config
*/
eon.setupEonThemeListener = function (el, config) {

    // When eon theme changes it also changes the element's theme attribute and 
    // if the theme file is not imported it also imports it
    eon._onThemeChanged(function (previousTheme, newTheme) {
        
        var elementName = el.nodeName.toLowerCase();
        var elementTheme = document.body.hasAttribute("theme") !== "" ? document.body.getAttribute("theme") : el.theme;

        // It will only change and attempt to import the new elements theme if matches the body one and 
        // if it is not strictly specified by the user
        if (elementTheme && !el.__specificTheme) {

            el.setAttribute("theme", newTheme);

            if (!eon.registry.isThemeRegistered(elementName, newTheme)) {
                eon.importElementTheme(config, elementName, newTheme);
            }

        }

    });

}

/*
@function slot
@description Takes the source nodes with the "slot" attribute and moves them into the target template element
@param {Object} el
*/
eon.slot = function (el) {

    var sourceNodes = el.getSourceNodes();
    var slotAttribute;
    var node;
    var slottedArray = [];

    // Initiates the slots object
    el._slots = {};

    for (var i = 0; i < sourceNodes.length; i++) {

        node = sourceNodes[i];

        // If the node can have attributes then we get/remove the slot one
        if (node.getAttribute) {
            slotAttribute = node.getAttribute("slot");
            node.removeAttribute("slot");
        }

        // If it hasn't been already slotted
        if (!node.__slotted) {

            // For each source node we check if it has a slot attribute and append it to its corresponding slot
            if (slotAttribute) {

                // If we have already queried this slot we just access it through the object, otherwise we call the querySelector and save its result
                el._slots[slotAttribute] = el._slots[slotAttribute] ? el._slots[slotAttribute] : el.template.querySelector(slotAttribute);

                if (el._slots[slotAttribute]) {

                    el._slots[slotAttribute].appendChild(node);
                    node.__slotted = true;

                    slottedArray.push(i);

                } else {

                    el.template.appendChild(node);

                }

            } else {

                // if it has no slot its appended to the template root.
                if (node.parentNode.isEqualNode(el.source)) {
                    el.template.appendChild(node);
                }

            }

        }

    }

};

/*
@function {Object} fragmentFromString
@description Takes a string and returns a fragment with the string being part as its DOM
@param {Object} string
*/
eon.fragmentFromString = function (str) {
    // Crossbrowser compatibility
    // Test createContextualFragment support
    if (!("__supportsContextualFragment" in eon)) {
        try {
            document.createRange().createContextualFragment("test");
            eon.__supportsContextualFragment = true;
        } catch (error) {
            eon.__supportsContextualFragment = false;
        }
    }
    if (eon.__supportsContextualFragment) {
        return document.createRange().createContextualFragment(str);
    } else {
        var temp = document.createElement("template");
        temp.innerHTML = str;
        return temp.content;
    }
};

/*
@function  generateElementTemplate
@description Creates and assigns the template of the element
@param {Object} el
*/
eon.generateElementTemplate = function (el) {
    var name = el.nodeName.toLowerCase();
    var template = eon.imports.templates[name];
    var clone = document.createElement("template");

    // All the content related checks are made to improve compatibility with browsers that do not support template
    clone.content = document.createDocumentFragment();

    if (template) {

        if (!template.content) {
            template.content = eon.fragmentFromString(template.innerHTML);
        }

        clone = template.cloneNode(true);

        if (!clone.content) {
            clone.content = eon.fragmentFromString(clone.innerHTML);
        }

    }

    el.template = clone.content;
};

/*
@function  appendElementTemplate
@description Appends the element template
@param {Object} el
*/
eon.appendElementTemplate = function (el) {
    el.appendChild(el.template);
    delete el.template;
};

/*
@function generateElementReferences
@description Searches elements tagged inside the component template to have its reference saved
@param {Object} el
*/
eon.generateElementReferences = function (el) {

    var nodes = el.template.querySelectorAll("[eon-ref]");
    var node;

    el._refs = el._refs || {};

    for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        eon.object.assignToPath(el._refs, node.getAttribute("eon-ref"), node);
        node.removeAttribute("eon-ref");
    }

};

/*
@function  initSourceCallbacks
@description Creates callbacks so that the user can retrieve either the source nodes or the source elements
@param {Object} el
*/
eon.initSourceCallbacks = function (el) {
    // Creates the getSourceElements function even if it has no source elements
    el.getSourceNodes = function () {
        return Array.prototype.slice.call(el.source.childNodes);
    }

    // Creates the getSourceNodes function even if it has no source nodes
    el.getSourceElements = function () {
        var sourceNodes = el.getSourceNodes();
        var sourceElements = [];
        for (var i = 0; i < sourceNodes.length; i++) {
            // NodeType 1 means its an Html element
            if (sourceNodes[i].nodeType === 1) {
                sourceElements.push(sourceNodes[i]);
            }

        }

        return Array.prototype.slice.call(sourceElements);
    }

};

/*
@function updateSourceCallbacks
@description Updates the source callbacks in case some of the source nodes have been moved before
@param {Object} el
*/
eon.updateSourceCallbacks = function (el) {

    var sourceNodes = el.source.childNodes;

    sourceNodes = !sourceNodes[0] ? el.childNodes : sourceNodes;
    sourceNodes = Array.prototype.slice.call(sourceNodes);

    // Creates the getSourceElements function even if it has no source elements
    el.getSourceNodes = function () {
        return sourceNodes;
    }

    // Creates the getSourceNodes function even if it has no source nodes
    el.getSourceElements = function () {

        var sourceNodes = el.getSourceNodes();
        var sourceElements = [];

        for (var i = 0; i < sourceNodes.length; i++) {
            // NodeType 1 means its an Html element
            if (sourceNodes[i].nodeType === 1) {
                sourceElements.push(sourceNodes[i]);
            }

        }

        return Array.prototype.slice.call(sourceElements);
    }

};

/*
@function triggerTransformed
@description Triggers the onTransformed callback and adds the component to all the render queues
@param {Object} el
@param {Object} config
*/
eon.triggerTransformed = function (el, config) {

    eon.domReady(function () {

        // Triggered when it has imported the template, it doesnt care of the state
        // of the other elements
        eon.registry.updateElementStatus(el, "transformed");
        eon.triggerAllCallbackEvents(el, config, "onTransformed");

        // Triggered when all registered elements are transformed,
        // the execution is descendant, parent -> child
        eon.registry.addToRenderQueue(el, function () {
            eon.triggerAllCallbackEvents(el, config, "onRender");
            eon.registry.updateElementStatus(el, "rendered");
        });

        // Triggered when all registered elements are transformed,
        // the execution is ascendant, parent <- child
        eon.registry.addToBubbleRenderQueue(el, function () {
            eon.triggerAllCallbackEvents(el, config, "onBubbleRender");
            eon.registry.updateElementStatus(el, "bubbleRendered");
        });

        // This callback is meant only for the users,
        // so that they can hook when the component finished rendering
        eon.registry.addToReadyQueue(el, function () {
            eon.triggerAllCallbackEvents(el, config, "onReady");
            eon.registry.updateElementStatus(el, "ready");
        });

        // Timeout forces triggerRender to wait child onTransformed
        // When render and bubbleRender are finished, it triggers onReady
        eon.registry.triggerRenders();

    });

};

/*
@function initializeDisplay
@description Sets a css rule with the display provided by the config, if no display is provided it will have display block by default
@param {Object} el
@param {Object} config
*/
eon.initializeDisplay = function (el, config) {

    var name = el.nodeName.toLowerCase();
    var display = config.display ? config.display : "block";
    var ruleIndex;

    if (!eon.rules[name]) {

        ruleIndex = eon.style.sheet.insertRule(name + " { display: " + display + "; -webkit-tap-highlight-color: transparent;}", 0);
        eon.rules[name] = eon.style.sheet.cssRules[ruleIndex];

    }

    // Remove opacity 0 rule
    el.onBubbleRender(function () {
        eon.unhideElement(this);
    });

};


/*
@function createResizeCallbacks
@description Creates the onResize callbacks for the component
@param {Object} el
*/
eon.createResizeCallbacks = function (el) {

    // Else all eon elements will have this pseudo onResize callback, this callback will create
    // the real resize callback once its called for the first time
    el.onResize = function (callback) {
        // Once the pseudo callback has been called we set it to null so that it can create the real one
        el.onResize = null;

        eon.createCallback("onResize", el);

        // Once the element is ready, it will add the listener
        el.onReady(function () {

            var config = eon.imports.config[el.nodeName.toLowerCase()];

            eon.addResizeListener(el, el.nodeName.toLowerCase(), function () {
                eon.triggerAllCallbackEvents(el, config, "onResize", []);
            });

            el.onResize(callback);

        });

    };

    // If the pseudo onResize callback has not been triggered by the time the element is Ready 
    // and the element has an onResize callback in its config we create the proper callback
    el.onReady(function () {

        var config = eon.imports.config[el.nodeName.toLowerCase()];

        if (!el.__onResize && config.onResize) {

            eon.addResizeListener(el, el.nodeName.toLowerCase(), function () {
                eon.triggerAllCallbackEvents(el, config, "onResize", []);
            });

        }

    });

    // onWindowResize callback creation
    eon.createCallback("onWindowResize", el);

    el.onReady(function () {

        var config = eon.imports.config[el.nodeName.toLowerCase()];

        window.addEventListener("resize", function () {
            eon.triggerAllCallbackEvents(el, config, "onWindowResize", []);
        });

    });

};