
vcomet.store = function () {
    var el = this;
    this.data;

    createCallbacks();

    //
    importAdapter();

    /*
        @function _createCallbacks
        @description 
    */
    function createCallbacks() {
        vcomet.createCallback("onLoaded", el);
        vcomet.createCallback("onDataLoaded", el);
    }
    /*
        ** TO BE REMOVED
        @function _importVPA
        @description 
    */
    function importAdapter() {
        //
        vcomet.vpa.use(vcomet.basePath + "/data/vc-newstore/adapters/MemoryAdapter.js", function (adapter) {
            // Clone adapter functions
            cloneFunctions(adapter());
            //
            createDataDescriptor();
            // Trigger user callback once VPA has been loaded
            vcomet.triggerCallback("onLoaded", el, el, [el]);
        });
    };
    /*
        @function _cloneFunctions
        @description 
    */
    function cloneFunctions(adapter) {
        // Clone adapter data object
        Object.assign(el, adapter);
        // Get BaseAdapter prototype functions
        Object.assign(el, adapter.constructor.prototype);
    };
    // TODO - store.data on propertyChanged listener
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
                }
            }
        );
    }
}