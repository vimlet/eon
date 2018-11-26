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

    if (observe || reflect) {

        eon.defineElementComplexProperty(el, config, key, value, reflect);

    } else {

        eon.defineElementProperty(el, key, value);

    }

};

eon.defineElementProperty = function (el, key, value) {

    // Define property descriptor with custom get and set
    Object.defineProperty(
        el,
        key,
        eon.createRegistryPropDescriptor(el, key, value)
    );

    eon.registry.elements[eon.registry.getUidFull(el)][key] = value;

}

eon.defineElementComplexProperty = function (el, config, key, value, reflect) {

    // Define property descriptor with custom get and set
    Object.defineProperty(
        el,
        key,
        eon.createComplexRegistryPropDescriptor(el, config, key, value, reflect)
    );

    eon.registry.elements[eon.registry.getUidFull(el)][key] = value;

};

eon.createRegistryPropDescriptor = function (el, key, value) {

    var propDescriptor = {};

    // Redirect get and set to __key
    propDescriptor.get = function () {
        return eon.registry.elements[eon.registry.getUidFull(el)][key];
    };

    // Update property value
    propDescriptor.set = function (value) {
        eon.registry.elements[eon.registry.getUidFull(el)][key] = value;
    };

    return propDescriptor;
};

eon.createComplexRegistryPropDescriptor = function (el, config, key, value, reflect) {

    var propDescriptor = {};

    // Redirect get and set to __key
    propDescriptor.get = function () {
        return eon.registry.elements[eon.registry.getUidFull(el)][key];
    };

    propDescriptor.set = function (value) {

        if (reflect) {

            // Trigger onAttributeChanged, note this will trigger also onPropertyChanged if needed
            el.setAttribute(eon.util.camelToHyphenCase(key), value);

        } else {

            // Trigger onPropertyChanged
            eon.triggerAllCallbackEvents(el, config, "onPropertyChanged", [
                key,
                eon.registry.elements[eon.registry.getUidFull(el)][key],
                value
            ]);

        }

        // Update property value
        eon.registry.elements[eon.registry.getUidFull(el)][key] = value;

    };

    return propDescriptor;
};

eon.createPropDescriptor = function (el, config, key, value, reflect) {
    var propDescriptor = {};
    // Redirect get and set to __key
    propDescriptor.get = function () {
        return el["__" + key];
    };

    propDescriptor.set = function (value) {
        if (reflect) {
            // Trigger onAttributeChanged, note this will trigger also onPropertyChanged if needed
            el.setAttribute(eon.util.camelToHyphenCase(key), value);

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