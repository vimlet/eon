
eon.store = function () {
    var el = this;
    /* Resources representation */
    this.data = {};
    
    // Create useful callbacks
    createCallbacks();

    // Import Memory Adapter
    importAdapter();

    /* 
        ##########
        Private Functions
        ##########
    */
    /*
        @function _createCallbacks
        @description 
    */
    function createCallbacks() {
        eon.createCallback("onLoaded", el, "ready");
    }
    /*
        ** TO BE REMOVED
        @function importAdapter
        @description 
    */
    function importAdapter() {
        // Import vpa memory adapter
        eon.vpa.use(eon.basePath + "/data/eon-newstore/adapters/MemoryAdapter.js", function (adapter) {
            // Clone adapter functions
            cloneFunctions(adapter());
            //
            createDataDescriptor();
            // Trigger user callback once VPA has been loaded
            eon.triggerCallback("onLoaded", el, el, [el]);
        });
    };
    /*
        @function (private) _cloneFunctions
        @description 
    */
    function cloneFunctions(adapter) {
        // Clone adapter data object
        Object.assign(el, adapter);
        // Get BaseAdapter prototype functions
        Object.assign(el, adapter.constructor.prototype);
    };
    /*
        @function (private) _cloneFunctions
        @description 
    */
    function createDataDescriptor() {
        // Define property descriptor with custom get and set
        Object.defineProperty(
            el,
            "data",
            {
                get: function () {
                    return el._memory.data;
                },
                set: function (value) {
                    // Update property value
                    el._memory.data = value;
                    el._memory.keys = Object.keys(value);
                }
            }
        );
    }
}