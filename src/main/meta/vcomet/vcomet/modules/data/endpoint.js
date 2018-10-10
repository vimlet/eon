
vcomet.endpoint = function(type){
  var el = this;
  /**/
  this.type = type;
  /* Resources url */
  this.url = "";

  //
  createCallbacks();

  /* 
      ##########
      Functions
      ##########
  */
  //-- REST API --
  /*
    @function get
    @description Read data resource // Read all data resources
  */
  this.get = type =="rest" ? function(id, cb) {
    // Check resource id and set url
    this.url += id ? "/" + id : "";
    // Set up request
    var options = {
      method: "GET"
    };
    // Send request
    vcomet.ajax(this.url, options, cb);
  } : "";
  /*
    @function put
    @description Overwrite data resource // create if not exists
  */
  this.put = type =="rest" ? function(id, data) {
    
  } : "";
  /*
    @function post
    @description Create data resource
  */
  this.post = type =="rest" ? function(data) {
    
  } : "";
  /*
    @function delete
    @description Delete data resource
  */
  this.delete = type =="rest" ? function(id) {
    
  } : "";

  //-- GraphQL HTTP API --
  //-- GraphQL Web sockets API --

  /*
    @function _createCallbacks
    @description 
  */
  function createCallbacks () {
    vcomet.createCallback("onLoaded", el, "ready");
  }
  // ** TEMP
  vcomet.triggerCallback("onLoaded", el, el, [el]);
  

}