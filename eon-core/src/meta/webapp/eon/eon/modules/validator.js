
eon.validator = eon.validator || {};
eon.validator.schemas = eon.validator.schemas = {};
eon.validator.defaultErrorMessage = "Does not meet the requirements.";

eon.validator.addSchema = function (id, schema) {
    if (schema) {
        // Saves the schema with the given id
        eon.validator.schemas[id] = schema;
    }
}

eon.validator.containsSchema = function (id) {
    // Returns whether there is already a schema id or not
    return eon.validator.schemas[id] ? true : false;
}

eon.validator.validate = function (data, schema) {

    // If the parameter is a string then we assume its the id of the schema, else we take for granted its a schema object
    schema = schema.constructor === String ? eon.validator.schemas[schema] : schema;

    if (data && schema) {

        var errorObj = {};

        // Loops all the properties for the given schema and for each property validates the field type, if it does not meet
        // the schema requirements the errorObj gets filled with the proper information
        eon.validator.loopProperties(schema, function (property) {

            eon.validator.validateRequiredField(property, schema, data, errorObj);
            eon.validator.validateStringField(property, schema, data, errorObj);
            eon.validator.validateDateField(property, schema, data, errorObj);
            eon.validator.validateNumericField(property, schema, data, errorObj);
            eon.validator.validateArrayField(property, schema, data, errorObj);
            eon.validator.validateObjectField(property, schema, data, errorObj);

        });

        // If there are errors collected then returns the errorObj, else just returns undefined
        return Object.keys(errorObj).length > 0 ? errorObj : undefined;

    }

    return undefined;

}

eon.validator.loopProperties = function (schema, callback) {

    // We take the schema properties
    var properties = schema.properties;
    var fields = Object.keys(properties);

    // And loop through them
    for (var i = 0; i < fields.length; i++) {

        // Call the callback passing the field
        callback(fields[i]);

    }

}

eon.validator.validateRequiredField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];
    var isRequired = (schema.required && schema.required.indexOf(property) > -1) || eon.util.isTrue(propertySchema.required);

    var isInvalid = ((!data[property] || data[property] == "") && isRequired);

    // If if does not meet any of the requirements then it fills the error object with the proper information
    if (isInvalid) {
        eon.validator.fillErrorObj(property, "Required", errorObj);
    }

}

eon.validator.validateStringField = function (property, schema, data, errorObj) {

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

        // If if does not meet any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : eon.validator.defaultErrorMessage;
            eon.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

eon.validator.validateDateField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if (propertySchema.type == "date" && data.hasOwnProperty(property)) {

        // Takes the format of the schema, if there is no format in the schema it takes a default format work with
        var format = propertySchema.format ? propertySchema.format : "YYYY-MM-DD";

        // Takes the data value
        var value = data[property];
        // Turns that value into an object with day,month and year properties
        var valueObj = eon.time.getDateObjectFromString(value, format);
        // Takes the object and applies the schema format to see if both values (the value and the schema value) are the same,
        // that would mean if follows the same format
        var schemaValue = eon.time.generateOutput(valueObj, format);

        var isInvalid;

        // If it does not follow the same format then it is no valid
        if (value != schemaValue) {

            isInvalid = true;

        } else {

            var year = valueObj.year != undefined ? valueObj.year : 0;
            var month = valueObj.month != undefined ? (valueObj.month - 1) : 0;
            var day = valueObj.day != undefined ? valueObj.day : 1;

            // Turns the date into epoch so that we are able to compare dates
            var epochDate = new Date(year, month, day).getTime();
            var minEpochDate, maxEpochDate;

            // Checks if there is a minimum specified in the schema
            if (propertySchema.hasOwnProperty("minimum")) {

                var minDateObj = eon.time.getDateObjectFromString(propertySchema.minimum, format);

                var minYear = minDateObj.year != undefined ? minDateObj.year : 0;
                var minMonth = minDateObj.month != undefined ? (minDateObj.month - 1) : 0;
                var minDay = minDateObj.day != undefined ? minDateObj.day : 1;

                minEpochDate = new Date(minYear, minMonth, minDay).getTime();
                
                isInvalid = epochDate < minEpochDate ? true : isInvalid;

            }

            // Checks if there is a maximum specified in the schema
            if (propertySchema.hasOwnProperty("maximum")) {

                var maxDateObj = eon.time.getDateObjectFromString(propertySchema.minimum, format);

                var maxYear = maxDateObj.year != undefined ? maxDateObj.year : 0;
                var maxMonth = maxDateObj.month != undefined ? (maxDateObj.month - 1) : 0;
                var maxDay = maxDateObj.day != undefined ? maxDateObj.day : 1;

                maxEpochDate = new Date(maxYear, maxMonth, maxDay).getTime();
                isInvalid = epochDate > maxEpochDate ? true : isInvalid;

            }

        }

        // If if does not meet any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : eon.validator.defaultErrorMessage;
            eon.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

eon.validator.validateNumericField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if ((propertySchema.type == "integer" || propertySchema.type == "number") && data.hasOwnProperty(property)) {

        var value = parseFloat(data[property]);

        // MultipleOf
        var hasMultipleOf = propertySchema.hasOwnProperty("multipleOf");
        var isMultipleOf = value % propertySchema.multipleOf === 0;

        // Maximum
        var hasMaximum = propertySchema.hasOwnProperty("maximum");
        var exceedsMaximum = propertySchema.exclusiveMaximum ? (value >= propertySchema.maximum) : (value > propertySchema.maximum);
        
        // Minimum
        var hasMinimum = propertySchema.hasOwnProperty("minimum");
        var exceedsMinimum = propertySchema.exclusiveMinimum ? (value <= propertySchema.minimum) : (value < propertySchema.minimum);

        var isInvalid = (hasMultipleOf && !isMultipleOf) || (hasMaximum && exceedsMaximum) || (hasMinimum && exceedsMinimum);

        // If if does not meet any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : eon.validator.defaultErrorMessage;
            eon.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

eon.validator.validateArrayField = function (property, schema, data, errorObj) {

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

        // If if does not meet any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : eon.validator.defaultErrorMessage;
            eon.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

eon.validator.validateObjectField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if (propertySchema.type == "object" && data.hasOwnProperty(property)) {

        var propertyData = data[property];
        var nestedErrorObj = {};

        errorObj[property] = nestedErrorObj;

        // Loops through the new schema and validates against the property data
        eon.validator.loopProperties(propertySchema, function (property) {

            eon.validator.validateRequiredField(property, propertySchema, propertyData, nestedErrorObj);
            eon.validator.validateStringField(property, propertySchema, propertyData, nestedErrorObj);
            eon.validator.validateNumericField(property, propertySchema, propertyData, nestedErrorObj);
            eon.validator.validateArrayField(property, propertySchema, propertyData, nestedErrorObj);
            eon.validator.validateObjectField(property, propertySchema, propertyData, nestedErrorObj);

        });

        if (Object.keys(errorObj[property]) == 0) {
            delete errorObj[property];
        }

    }

}

eon.validator.fillErrorObj = function (property, errorMessage, errorObj) {
    !errorObj[property] ? errorObj[property] = [errorMessage] : errorObj[property].push(errorMessage);
}
