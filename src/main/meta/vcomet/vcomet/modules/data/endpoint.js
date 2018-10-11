
vcomet.endpoint = function(type){
  var el = this;
  /**/
  this.type = type;
  /* Resources root url */
  this.composedUrl = "";
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
    this.composedUrl = this.url;
    this.composedUrl += id ? "/" + id : "";
    // Set up request
    var options = {
      method: "GET"
    };
    // Send request
    vcomet.ajax(this.composedUrl, options, cb);
  } : "";
  /*
    @function put
    @description Overwrite data resource // create if not exists
  */
  this.put = type =="rest" ? function(id, data, cb) {
    // Check resource id and set url
    this.composedUrl = this.url;
    this.composedUrl += id ? "/" + id : "";
    if(id) {
      // Set up request
      var options = {
        method: "PUT",
        payload: data
      };
      // Send request
      vcomet.ajax(this.composedUrl, options, cb);
    } else {
      console.error('No resource id found');
    }
  } : "";
  /*
    @function post
    @description Create data resource
  */
  this.post = type =="rest" ? function(data, cb) {
     // Check resource id and set url
     if(data) {
       // Set up request
       var options = {
         method: "POST",
         payload: data
       };
       // Send request
       vcomet.ajax(this.url, options, cb);
     } else {
       console.error('No resource data found');
     }
  } : "";
  /*
    @function delete
    @description Delete data resource
  */
  this.delete = type =="rest" ? function(id, cb) {
    // Check resource id and set url
    this.composedUrl = this.url;
    this.composedUrl += id ? "/" + id : "";
    if(id) {
      // Set up request
      var options = {
        method: "DELETE"
      };
      // Send request
      vcomet.ajax(this.composedUrl, options, cb);
    } else {
      console.error('No resource id found');
    }
  } : "";

  //-- GraphQL HTTP API --
  /*
    @function delete
    @description Delete data resource
  */
 this.send = type =="rest" ? function(id, cb) {
  // Check resource id and set url
  this.composedUrl = this.url;
  this.composedUrl += id ? "/" + id : "";
  if(id) {
    // Set up request
    var options = {
      method: "DELETE"
    };
    // Send request
    vcomet.ajax(this.composedUrl, options, cb);
  } else {
    console.error('No resource id found');
  }
} : "";
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