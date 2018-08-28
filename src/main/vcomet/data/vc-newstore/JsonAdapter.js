// Define a new QueryObject with facade pattern
function JsonQueryObject(config, data) {
    return vcomet.data.QueryObject(data, function (data, cb) {
        // NOTE: Implements all build logic here

        // console.log("data", data);
        // Read action
        switch (data.action) {
            case "read":
                // Read a single element
                if(data.id) {
                    var entry = vcomet.data.dummy[data.id];
                    if(entry) {
                        cb(null, entry);
                    } else {
                        cb("Item with id '" + data.id + "' not found");
                    }
                } else {
                    // Read all 
                    cb(null, vcomet.data.dummy);
                }
                break;

            case "create":
                // Check item id 
                var entry = data.data;
                if(entry[vcomet.data.idProperty]) {
                    // Check if the item already exists
                    if(vcomet.data.dummy[entry[vcomet.data.idProperty]]) {
                        cb("Item already exists");
                    } else {
                        // Create new item
                        vcomet.data.dummy[entry[vcomet.data.idProperty]] = entry;
                        cb(null, entry);
                    }
                } else {
                    // TODO Add an id to the item (what if it is not a numeric id)
                    if (vcomet.data.dummy[Object.keys(vcomet.data.dummy).length.toString()]) {
                        cb("Cannot set an item id automatically");
                    } else {
                        entry[vcomet.data.idProperty] = Object.keys(vcomet.data.dummy).length.toString();
                    }
                    cb(null, entry);
                }
                break;
        
            default:
                break;
        }

    });
}

// Define a new Adapter with facade pattern
vcomet.data.JsonAdapter = function (config) {
    return vcomet.data.Adapter(config, JsonQueryObject);
};
