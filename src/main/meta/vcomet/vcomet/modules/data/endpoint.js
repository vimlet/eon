
vcomet.endpoint = function(){
  var el = this;

  createCallbacks();
  /*
    @function _createCallbacks
    @description 
  */
   function createCallbacks () {
    vcomet.createCallback("onLoaded", el, "ready");
  }

  vcomet.triggerCallback("onLoaded", el, el, [el]);

}