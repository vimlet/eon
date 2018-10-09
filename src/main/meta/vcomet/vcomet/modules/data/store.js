
vcomet.store = function(){
    var el = this;
    this.data;
  
    createCallbacks();

    // TODO - TO BE REMOVED
    importVPA();

    /*
        @function _createCallbacks
        @description 
    */
    function createCallbacks () {
      vcomet.createCallback("onLoaded", el);
      vcomet.createCallback("onDataLoaded", el);
    }
    /*
        ** TO BE REMOVED
        @function _importVPA
        @description 
    */
    function importVPA(){
      //
      window.define = vcomet.amd.define;
      window.require = vcomet.amd.require;
      // ** TODO - Make paths relative
      vcomet.amd.require([
        vcomet.basePath + "/data/vc-newstore/vpa-amd.js"
      ], function (vpa) {
        //
        vpa.use(vcomet.basePath + "/data/vc-newstore/adapters/MemoryAdapter.js", function (adapter) {
          // Clone adapter functions
          cloneFunctions(adapter());
          //
          createDataDescriptor();
          // Trigger user callback once VPA has been loaded
          vcomet.triggerCallback("onLoaded", el, el, [el]);
        });
      });
    };
    /*
        @function _cloneFunctions
        @description 
    */
    function cloneFunctions (adapter) { 
        // Clone adapter data object
        Object.assign(el, adapter);
        // Get BaseAdapter prototype functions
        Object.assign(el, adapter.constructor.prototype);
        // Make memory data accessible
        el.data = el._memory.data;
    };

    // TODO - store.data on propertyChanged listener
    function createDataDescriptor(){
        // Define property descriptor with custom get and set
        Object.defineProperty(
            el,
            "data",
            vcomet.createPropDescriptor(el, null, "data", el.data, false)
        );
    }

}