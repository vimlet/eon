
vcomet.validator = vcomet.validator || {};
vcomet.validator.schemas = vcomet.validator.schemas = {};
vcomet.validator.defaultErrorMessage = "Does not meet the requirements.";

vcomet.validator.addSchema = function (id, schema) {
    if (schema) {
        // Saves the schema with the given id
        vcomet.validator.schemas[id] = schema;
    }
}

vcomet.validator.containsSchema = function (id) {
    // Returns whether there is already a schema id or not
    return vcomet.validator.schemas[id] ? true : false;
}

vcomet.validator.validate = function (data, schema) {

    // If the parameter is a string then we assume its the id of the schema, else we take for granted its a schema object
    schema = schema.constructor === String ? vcomet.validator.schemas[schema] : schema;

    if (data && schema) {

        var errorObj = {};

        // Loops all the properties for the given schema and for each property validates the field type, if it does not meet
        // the schema requirements the errorObj gets filled with the proper information
        vcomet.validator.loopProperties(schema, function (property) {

            vcomet.validator.validateRequiredField(property, schema, data, errorObj);
            vcomet.validator.validateStringField(property, schema, data, errorObj);
            vcomet.validator.validateNumericField(property, schema, data, errorObj);
            vcomet.validator.validateArrayField(property, schema, data, errorObj);
            vcomet.validator.validateObjectField(property, schema, data, errorObj);

        });

        // If there are errors collected then returns the errorObj, else just returns undefined
        return Object.keys(errorObj).length > 0 ? errorObj : undefined;

    }

    return undefined;

}

vcomet.validator.loopProperties = function (schema, callback) {
    
    // We take the schema properties
    var properties = schema.properties;
    var fields = Object.keys(properties);
    
    // And loop through them
    for (var i = 0; i < fields.length; i++) {

        // Call the callback passing the field
        callback(fields[i]);

    }

}

vcomet.validator.validateRequiredField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];
    var isRequired = (schema.required && schema.required.indexOf(property) > -1) || vcomet.util.isTrue(propertySchema.required);

    var isInvalid = ((!data[property] || data[property] == "") && isRequired);
    
    // If if does not meat any of the requirements then it fills the error object with the proper information
    if (isInvalid) {
        vcomet.validator.fillErrorObj(property, "Required", errorObj);
    }

}

vcomet.validator.validateStringField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];
    
    if (propertySchema.type == "string" && data.hasOwnProperty(property)) {
        
        // MaxLength
        var hasMaxLength = propertySchema.hasOwnProperty("maxLength") && (parseInt(propertySchema.maxLength) > 0);
        var exceedsMaxLength = data[property].length > parseInt(propertySchema.maxLength);

        // MinLength
        var hasMinLength = propertySchema.hasOwnProperty("minLength") && (parseInt(propertySchema.maxLength) > 0);
        var exceedsMinLength = data[property].length < parseInt(propertySchema.minLength);

        // Pattern
        var hasPattern = propertySchema.hasOwnProperty("pattern");
        var matchesPattern = new RegExp(propertySchema.pattern).test(data[property]);

        var isInvalid = (hasPattern && !matchesPattern) || (hasMaxLength && exceedsMaxLength) || (hasMinLength && exceedsMinLength);

        // If if does not meat any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : vcomet.validator.defaultErrorMessage;
            vcomet.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

vcomet.validator.validateNumericField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if ((propertySchema.type == "integer" || propertySchema.type == "number") && data.hasOwnProperty(property)) {

        var value = parseFloat(data[property]);

        // MultipleOf
        var hasMultipleOf = propertySchema.hasOwnProperty("multipleOf");
        var isMultipleOf = value % propertySchema.multipleOf === 0;

        // Maximum
        var hasMaximum = propertySchema.hasOwnProperty("maximum");
        var exceedsMaximum = value >= propertySchema.maximum;
        var exceedsExclusiveMaximum = propertySchema.exclusiveMaximum && (value > propertySchema.maximum);

        // Minimum
        var hasMinimum = propertySchema.hasOwnProperty("minimum");
        var exceedsMinimum = value <= propertySchema.minimum;
        var exceedsExclusiveMinimum = propertySchema.exclusiveMinimum && (value < propertySchema.minimum);

        var isInvalid = (hasMultipleOf && !isMultipleOf) || (hasMaximum && (exceedsMaximum || exceedsExclusiveMaximum)) || (hasMinimum && (exceedsMinimum || exceedsExclusiveMinimum));

        // If if does not meat any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : vcomet.validator.defaultErrorMessage;
            vcomet.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

vcomet.validator.validateArrayField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if (propertySchema.type == "array" && data.hasOwnProperty(property)) {

        var valuesArray = data[property].filter(function (value) {
            return value != false;
        });

        var hasMinItems = propertySchema.hasOwnProperty("minItems");
        var exceedsMinItems = valuesArray.length < parseInt(propertySchema.minItems);

        var hasMaxItems = propertySchema.hasOwnProperty("maxItems");
        var exceedsMaxItems = valuesArray.length > parseInt(propertySchema.maxItems);

        var isInvalid = (hasMinItems && exceedsMinItems) || (hasMaxItems && exceedsMaxItems);

        // If if does not meat any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : vcomet.validator.defaultErrorMessage;
            vcomet.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

vcomet.validator.validateObjectField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];
    
    if (propertySchema.type == "object" && data.hasOwnProperty(property)) {
        
        var propertyData = data[property];
        var nestedErrorObj = {};

        errorObj[property] = nestedErrorObj;

        // Loops through the new schema and validates against the property data
        vcomet.validator.loopProperties(propertySchema, function (property) {

            vcomet.validator.validateRequiredField(property, propertySchema, propertyData, nestedErrorObj);
            vcomet.validator.validateStringField(property, propertySchema, propertyData, nestedErrorObj);
            vcomet.validator.validateNumericField(property, propertySchema, propertyData, nestedErrorObj);
            vcomet.validator.validateArrayField(property, propertySchema, propertyData, nestedErrorObj);
            vcomet.validator.validateObjectField(property, propertySchema, propertyData, nestedErrorObj);

        });

        if (Object.keys(errorObj[property]) == 0) {
            delete errorObj[property];
        }

    }

}

vcomet.validator.fillErrorObj = function (property, errorMessage, errorObj) {
    !errorObj[property] ? errorObj[property] = [errorMessage] : errorObj[property].push(errorMessage);
}
