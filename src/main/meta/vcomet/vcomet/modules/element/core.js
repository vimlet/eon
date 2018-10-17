
vcomet.element = function (name, stylePath, config) {

    stylePath = stylePath ? stylePath : "";
    config = config ? config : {};

    // If the user provided a style path then we create its link and append it
    if (stylePath != "") {

        var link = document.createElement("link");

        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", vcomet.imports.paths[name.toLowerCase()] + stylePath);

        document.head.appendChild(link);

    }

    if (config.constructor === Object) {

        vcomet.imports.config[name.toLowerCase()] = config;
        vcomet.triggerCallback('onScriptsReady', vcomet);

    } else if (config) {

        vcomet.amd.require([vcomet.imports.paths[name.toLowerCase()] + config], function (config) {

            vcomet.imports.config[name.toLowerCase()] = config;
            vcomet.triggerCallback('onScriptsReady', vcomet);

        });

    }

};

vcomet.define = function (config) {
    vcomet.amd.define(function () {
        return config;
    });
};

vcomet.createElement = function (name, config) {

    var el = document.createElement(name);

    if (config) {

        var callbacks = ["onCreated", "onInit", "onTransformed", "onRender", "onBubbleRender", "onReady"];

        for (var i = 0; i < callbacks.length; i++) {
            if (config[callbacks[i]]) {
                el[callbacks[i]](config[callbacks[i]]);
            }
        }

        if (config.functions) {

            var functions = Object.keys(config.functions);

            for (var j = 0; j < functions.length; j++) {
                el[functions[j]] = config.functions[functions[j]];
            }

        }

        if (config.properties) {

            var properties = Object.keys(config.properties);

            for (var k = 0; k < properties.length; k++) {
                el[properties[k]] = config.properties[properties[k]];
            }

        }

    }

    return el;

};

vcomet.hideElement = function (el) {
    el.classList.add("vcomet-until-rendered");
};

vcomet.unhideElement = function (el) {
    el.classList.remove("vcomet-until-rendered");
};

vcomet.declareCallbacks = function (el) {
    // Creates the callback needed for the element
    vcomet.createCallback("onCreated", el, "ready");
    vcomet.createCallback("onInit", el, "ready");
    vcomet.createCallback("onTransformed", el, "ready");
    vcomet.createCallback("onRender", el, "ready");
    vcomet.createCallback("onBubbleRender", el, "ready");
    vcomet.createCallback("onReady", el, "ready");
    vcomet.createCallback("onPropertyChanged", el);
    vcomet.createCallback("onAttributeChanged", el);
    vcomet.createCallback("onDataChanged", el);
};

vcomet.generateSourceFragment = function (el) {

    el.source = document.createDocumentFragment();

    if (el.childNodes.length == 0) {
        // Chrome only
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

vcomet.prepareElement = function (el, callback) {

    // Mark element as first attach
    el.isFirstAttach = true;

    // Runs the callback provided when all imports are ready
    vcomet.onImportsReady(function () {
        callback();
    });

};

vcomet.parse = function (el, config) {
    // Creates object properties for the element with data about the properties/attributes to be observed
    vcomet.collectObserveData(el, config);

    // Imports Data and Public/Private properties and functions
    vcomet.importData(el, config);
    vcomet.importPublic(el, config);
    vcomet.importPrivate(el, config);

    vcomet.defineParentComponent(el);
    vcomet.defineOverlayCreation(el);
    vcomet.definePlaceholderCreation(el);

    vcomet.triggerAllCallbackEvents(el, config, "onParsed");
    vcomet.registry.updateElementStatus(el, "parsed");

};

vcomet.defineParentComponent = function (el) {

    var propDescriptor = {};

    propDescriptor.get = function () {
        el.__parentComponent = el.__parentComponent ? el.__parentComponent : vcomet.getEnclosingComponent(el);
        return el.__parentComponent;
    };

    propDescriptor.set = function () { };

    Object.defineProperty(el, "parentComponent", propDescriptor);

};

vcomet.defineOverlayCreation = function (el) {

    // Defines the function for the element
    el.generateOverlayNode = function (overlay) {

        // If an overlay is provided we will prepare that one, otherwise we just create a new one
        overlay = overlay ? overlay : document.createElement("vc-overlay");

        // The properties assignation takes place in the onRender callback since if we assign a theme to the overlay
        // it will search a theme file for the overlay, and we just want to assign a theme so that the overlay can recieve
        // the main theme classes
        overlay.onRender(function () {

            // Assigns properties for the overlay
            overlay.owner = el;
            overlay.type = el.nodeName.toLowerCase();
            overlay.ownerId = vcomet.registry.getUidFull(el);

            if (el.hasAttribute("theme")) {
                overlay.setAttribute("theme", el.getAttribute("theme"));
            }

        })

        return overlay; 

    };

};
vcomet.definePlaceholderCreation = function (el) {

    // Defines the function for the element
    el.generatePlaceholderNode = function (placeholder) {

        // If a placeholder is provided we will prepare that one, otherwise we just create a new one
        placeholder = placeholder ? placeholder : document.createElement("vc-placeholder");

        // The properties assignation takes place in the onRender callback since we want to make sure the owner has an uid for the ownerId property
        placeholder.onRender(function () {

            // Assigns properties for the overlay
            placeholder.owner = el;
            placeholder.type = el.nodeName.toLowerCase();
            placeholder.ownerId = vcomet.registry.getUidFull(el);

        })

        return placeholder;

    };

};

vcomet.collectObserveData = function (el, config) {

    el.__observeProperties = {};
    el.__observeAttributes = {};
    el.__reflectProperties = {};

    // Assigns each index of the array to the object
    vcomet.addObserveFromArray(el.__observeProperties, config.observeProperties);
    vcomet.addObserveFromArray(el.__observeAttributes, config.observeAttributes);

    // Reads properties object to add them to the observe object if needed
    if (config.properties) {

        var propertiesKeys = Object.keys(config.properties);

        for (i = 0; i < propertiesKeys.length; i++) {
            // Add observe to observeProperties
            if (config.properties[propertiesKeys[i]].observe) {
                el.__observeProperties[propertiesKeys[i]] = true;
            }

            // If the property has reflect active but it has no value we set an empty string
            if (config.properties[propertiesKeys[i]].reflect && !config.properties[propertiesKeys[i]].hasOwnProperty("value")) {
                config.properties[propertiesKeys[i]].value = "";
            }

            // If the property has reflect but its value is of type object we set reflect to false
            if (config.properties[propertiesKeys[i]].reflect && typeof config.properties[propertiesKeys[i]].value == "object") {
                config.properties[propertiesKeys[i]].reflect = false;
            }

            // Add reflect to observeAttributes
            if (config.properties[propertiesKeys[i]].reflect) {
                el.__observeAttributes[vcomet.util.camelToHyphenCase(propertiesKeys[i])] = true;
                el.__reflectProperties[propertiesKeys[i]] = true;
            }
        }
    }

    // Reads private properties object to add them to the observe object if needed
    if (config.privateProperties) {

        var privatePropertiesKeys = Object.keys(config.privateProperties);

        for (i = 0; i < privatePropertiesKeys.length; i++) {
            // Add observe to observeProperties
            if (config.privateProperties[privatePropertiesKeys[i]].observe) {
                el.__observeProperties["_" + privatePropertiesKeys[i]] = true;
            }

            // Add reflect to observeAttributes
            if (config.privateProperties[privatePropertiesKeys[i]].reflect) {
                el.__observeAttributes[vcomet.util.camelToHyphenCase(privatePropertiesKeys[i])] = true;
                el.__reflectProperties["_" + privatePropertiesKeys[i]] = true;
            }
        }
    }

};

vcomet.addObserveFromArray = function (observeObj, observeArray) {

    observeArray = observeArray ? observeArray : [];

    for (var i = 0; i < observeArray.length; i++) {
        observeObj[observeArray[i]] = true;
    }

};

vcomet.createAttributesObserver = function (el, config) {

    var observeAttributesKeys = Object.keys(el.__observeAttributes);

    // First we check if we have attributes to observe
    if (observeAttributesKeys.length > 0) {

        var property, privateProperty, value;

        // For each observe attribute if check which value should be assign to it
        for (var i = 0; i < observeAttributesKeys.length; i++) {

            property = vcomet.util.hyphenToCamelCase(observeAttributesKeys[i]);
            privateProperty = "__" + property;

            // If the attribute already has a value we assign this value to its corresponding property
            if (el.getAttribute(observeAttributesKeys[i])) {

                el[privateProperty] = el.getAttribute(observeAttributesKeys[i]);

                // If the attribute has no value we check if the property has it, if not we assign it an empty value
            } else {

                if (config.properties[property].reflectDefault) {

                    value = el.hasOwnProperty(privateProperty) ? el[privateProperty] : "";

                    // Only sets the attribute if the value is not of object type
                    if (typeof value != "object") {
                        el.setAttribute(observeAttributesKeys[i], value);
                    } else {
                        el.removeAttribute(observeAttributesKeys[i]);
                    }

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

            var property = vcomet.util.hyphenToCamelCase(attrName);

            // The onAttributeChanged callback is triggered whether its observed or as a reflection of a property
            if (el.__observeAttributes[attrName] || el.__reflectProperties[property]) {
                vcomet.triggerAllCallbackEvents(el, config, "onAttributeChanged", [attrName, oldVal, newVal]);
            }

            // The onPropertyChanged callback is triggered when the attribute has changed and its reflect by a property
            if (el.__reflectProperties[property]) {
                el["__" + property] = newVal;
                vcomet.triggerAllCallbackEvents(el, config, "onPropertyChanged", [property, oldVal, newVal]);
            }

        };

    }

};

vcomet.handleProperty = function (el, config, reflectProperties, observeProperties, property) {

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
            vcomet.createPropDescriptor(el, config, key, value, reflect)
        );
        el["__" + key] = value;
    }
};

vcomet.createPropDescriptor = function (el, config, key, value, reflect) {
    var propDescriptor = {};
    // Redirect get and set to __key
    propDescriptor.get = function () {
        return el["__" + key];
    };

    propDescriptor.set = function (value) {
        if (reflect) {
            // Trigger onAttributeChanged, note this will trigger also onPropertyChanged if needed
            // Only sets the attribute if the value is not of object type
            if (typeof value != "object") {
                el.setAttribute(vcomet.util.camelToHyphenCase(key), value);
            } else {
                el.removeAttribute(vcomet.util.camelToHyphenCase(key));
            }

        } else {
            // Trigger onPropertyChanged
            vcomet.triggerAllCallbackEvents(el, config, "onPropertyChanged", [
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

vcomet.importData = function (el, config) {

    el.data = {};

    if (config.data) {
        el.data = config.data;
    }

}

vcomet.importPublic = function (el, config) {

    if (config.properties) {
        var keys = Object.keys(config.properties);
        var attributeKey;

        for (var i = 0; i < keys.length; i++) {
            attributeKey = vcomet.util.camelToHyphenCase(keys[i]);
            // If the element has one of the reflected attributes we send that value as the value of the property
            vcomet.handleProperty(el, config, el.__reflectProperties, el.__observeProperties, {
                key: keys[i],
                value: el.hasAttribute(attributeKey) ? el.getAttribute(attributeKey) : config.properties[keys[i]]
            });
        }
    }

    if (config.functions) {
        var keys = Object.keys(config.functions);

        for (var i = 0; i < keys.length; i++) {
            el[keys[i]] = config.functions[keys[i]];
        }
    }

};

vcomet.importPrivate = function (el, config) {

    if (config.privateProperties) {
        var keys = Object.keys(config.privateProperties);

        for (var i = 0; i < keys.length; i++) {
            vcomet.handleProperty(el, config, el.__reflectProperties, el.__observeProperties, {
                key: "_" + keys[i],
                value: config.privateProperties[keys[i]]
            });
        }
    }

    if (config.privateFunctions) {
        var keys = Object.keys(config.privateFunctions);

        for (var i = 0; i < keys.length; i++) {
            el["_" + keys[i]] = config.privateFunctions[keys[i]];
        }
    }

};

vcomet.importTemplateClasses = function (el) {

    var template = vcomet.imports.templates[el.tagName.toLowerCase()];

    if (template && template.classList.length != 0) {

        var elClassesArray = Array.prototype.slice.call(el.classList);
        var templateClassesArray = Array.prototype.slice.call(template.classList);

        elClassesArray = templateClassesArray.concat(elClassesArray);

        el.setAttribute("class", elClassesArray.join(" "));

    }


};

vcomet.triggerAllCallbackEvents = function (el, config, callback, params) {

    vcomet.debug.log("triggerAllCallbackEvents", callback);

    // This "if" is created for the porpuse of not allowing onPropertyChanged and onAttributeChanged
    // to be triggered once the element is render, this is so we dont have to use el.onRender() inside this callback to not crash
    if (!((callback == "onPropertyChanged" || callback == "onAttributeChanged") && vcomet.registry.isRendered(el) != true)) {

        if (config[callback]) {
            config[callback].apply(el, params);
        }

        vcomet.debug.log("elementEvents", callback);
        vcomet.triggerCallback(callback, el, el, params);

    }

};

vcomet.transform = function (el, config) {

    if (!vcomet.registry.isTransformed(el)) {

        // Gets the theme that will be used for this element, if it has none we set a default theme and return it
        // We pass the config so that if the element has themed: "false" but the element has a theme specified by the user it turns it into "true"
        var theme = vcomet.getElementTheme(el, config);
        var name = el.nodeName.toLowerCase();

        // Imports the template of the element
        vcomet.appendElementTemplate(el);

        // Registers the main theme of this theme if its not yet registered
        vcomet.importMainTheme(theme);

        // If the element has not yet registered its theme it will proceed on importing it
        vcomet.importElementTheme(config, name, theme);

        // Adds the element to the transformQueue
        setTimeout(function () {
            vcomet.triggerTransformed(el, config);
        }, 0);

    }

};

vcomet.getElementTheme = function (el, config) {

    var userSpecifiedTheme = el.hasAttribute("theme") || el.theme ? true : false;
    var theme = vcomet.theme;

    theme = document.body.dataset.theme ? document.body.dataset.theme : theme;
    theme = document.body.hasAttribute("theme") ? document.body.getAttribute("theme") : theme;
    theme = el.hasAttribute("theme") ? el.getAttribute("theme") : theme;
    theme = el.theme ? el.theme : theme;

    // If the user has specified a theme but the element is not themeable then we turn themed: "true" so
    // that it can now import a theme
    config.themed = userSpecifiedTheme && !config.themed ? true : config.themed;

    // Whether it has the attribute or not, we set it
    el.setAttribute("theme", theme);

    return theme;
}

vcomet.slot = function (el) {

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

vcomet.fragmentFromString = function (str) {
    // Test createContextualFragment support
    if (!("__supportsContextualFragment" in vcomet)) {
        try {
            document.createRange().createContextualFragment("test");
            vcomet.__supportsContextualFragment = true;
        } catch (error) {
            vcomet.__supportsContextualFragment = false;
        }
    }
    if (vcomet.__supportsContextualFragment) {
        return document.createRange().createContextualFragment(str);
    } else {
        var temp = document.createElement("template");
        temp.innerHTML = str;
        return temp.content;
    }
};

vcomet.generateElementTemplate = function (el) {
    var name = el.nodeName.toLowerCase();
    var template = vcomet.imports.templates[name];
    var clone = document.createElement("template");

    // All the content related checks are made to improve compatibility with browsers that do not support template
    clone.content = document.createDocumentFragment();

    if (template) {

        if (!template.content) {
            template.content = vcomet.fragmentFromString(template.innerHTML);
        }

        clone = template.cloneNode(true);

        if (!clone.content) {
            clone.content = vcomet.fragmentFromString(clone.innerHTML);
        }

    }

    el.template = clone.content;
};

vcomet.appendElementTemplate = function (el) {
    el.appendChild(el.template);
    delete el.template;
};

vcomet.initSourceCallbacks = function (el) {
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
            if (sourceNodes[i].nodeType == 1) {
                sourceElements.push(sourceNodes[i]);
            }

        }

        return Array.prototype.slice.call(sourceElements);
    }

};

vcomet.updateSourceCallbacks = function (el) {

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
            if (sourceNodes[i].nodeType == 1) {
                sourceElements.push(sourceNodes[i]);
            }

        }

        return Array.prototype.slice.call(sourceElements);
    }

}

vcomet.triggerTransformed = function (el, config) {

    vcomet.domReady(function () {

        // Triggered when it has imported the template, it doesnt care of the state
        // of the other elements
        vcomet.registry.updateElementStatus(el, "transformed");
        vcomet.triggerAllCallbackEvents(el, config, "onTransformed");

        // Triggered when all registered elements are transformed,
        // the execution is descendant, parent -> child
        vcomet.registry.addToRenderQueue(el, function () {
            vcomet.triggerAllCallbackEvents(el, config, "onRender");
            vcomet.registry.updateElementStatus(el, "rendered");
        });

        // Triggered when all registered elements are transformed,
        // the execution is ascendant, parent <- child
        vcomet.registry.addToBubbleRenderQueue(el, function () {
            vcomet.triggerAllCallbackEvents(el, config, "onBubbleRender");
            vcomet.registry.updateElementStatus(el, "bubbleRendered");
        });

        // This callback is meant only for the users,
        // so that they can hook when the component finished rendering
        vcomet.registry.addToReadyQueue(el, function () {
            vcomet.triggerAllCallbackEvents(el, config, "onReady");
            vcomet.registry.updateElementStatus(el, "ready");
        });

        // Timeout forces triggerRender to wait child onTransformed
        // When render and bubbleRender are finished, it triggers onReady
        setTimeout(function () {
            vcomet.registry.triggerRenders();
        }, 0);

    });

};

vcomet.initializeDisplay = function (el, config) {

    var name = el.nodeName.toLowerCase();
    var display = config.display ? config.display : "block";
    var ruleIndex;

    if (!vcomet.rules[name]) {

        ruleIndex = vcomet.style.sheet.insertRule(name + " { display: " + display + "; }", 0);
        vcomet.rules[name] = vcomet.style.sheet.cssRules[ruleIndex];

    }

    // Remove opacity 0 rule
    el.onBubbleRender(function () {
        vcomet.unhideElement(this);
    });

};

vcomet.registerResizeListeners = function (el, config) {

    // If it has onResize callback on its config we create the onResize callback
    if (config.onResize) {

        el.onReady(function () {

            vcomet.createCallback("onResize", el);

            vcomet.addResizeListener(el, el.nodeName.toLowerCase(), function () {
                vcomet.triggerAllCallbackEvents(el, config, "onResize", []);
            });

        });

    } else {

        // Else all vcomet elements will have this pseudo onResize callback, this callback will create
        // the real resize callback once its called for the first time
        el.onResize = function (callback) {
            // Once the pseudo callback has been called we set it to null so that it can create the real one
            el.onResize = null;

            vcomet.createCallback("onResize", el);

            // Once the element is ready, it will add the listener
            el.onReady(function () {

                vcomet.addResizeListener(el, el.nodeName.toLowerCase(), function () {
                    vcomet.triggerAllCallbackEvents(el, config, "onResize", []);
                });

                el.onResize(callback);

            });

        }

    }

    // Once the element is ready, it will add the listener
    el.onReady(function () {

        vcomet.createCallback("onWindowResize", el);

        vcomet.onResize(function () {
            vcomet.triggerAllCallbackEvents(el, config, "onWindowResize", []);
        }, el);

    });

};