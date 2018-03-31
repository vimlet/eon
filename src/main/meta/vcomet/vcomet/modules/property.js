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

    if (observe || reflect) {

        vcomet.defineElementComplexProperty(el, config, key, value, reflect);

    } else {

        vcomet.defineElementProperty(el, key, value);

    }

};

vcomet.defineElementProperty = function (el, key, value) {

    // Define property descriptor with custom get and set
    Object.defineProperty(
        el,
        key,
        vcomet.createRegistryPropDescriptor(el, key, value)
    );

    vcomet.registry.elements[vcomet.registry.getUidFull(el)][key] = value;

}

vcomet.defineElementComplexProperty = function (el, config, key, value, reflect) {

    // Define property descriptor with custom get and set
    Object.defineProperty(
        el,
        key,
        vcomet.createComplexRegistryPropDescriptor(el, config, key, value, reflect)
    );

    vcomet.registry.elements[vcomet.registry.getUidFull(el)][key] = value;

};

vcomet.createRegistryPropDescriptor = function (el, key, value) {

    var propDescriptor = {};

    // Redirect get and set to __key
    propDescriptor.get = function () {
        return vcomet.registry.elements[vcomet.registry.getUidFull(el)][key];
    };

    // Update property value
    propDescriptor.set = function (value) {
        vcomet.registry.elements[vcomet.registry.getUidFull(el)][key] = value;
    };

    return propDescriptor;
};

vcomet.createComplexRegistryPropDescriptor = function (el, config, key, value, reflect) {

    var propDescriptor = {};

    // Redirect get and set to __key
    propDescriptor.get = function () {
        return vcomet.registry.elements[vcomet.registry.getUidFull(el)][key];
    };

    propDescriptor.set = function (value) {

        if (reflect) {

            // Trigger onAttributeChanged, note this will trigger also onPropertyChanged if needed
            el.setAttribute(vcomet.util.camelToHyphenCase(key), value);

        } else {

            // Trigger onPropertyChanged
            vcomet.triggerAllCallbackEvents(el, config, "onPropertyChanged", [
                key,
                vcomet.registry.elements[vcomet.registry.getUidFull(el)][key],
                value
            ]);

        }

        // Update property value
        vcomet.registry.elements[vcomet.registry.getUidFull(el)][key] = value;

    };

    return propDescriptor;
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
            el.setAttribute(vcomet.util.camelToHyphenCase(key), value);

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