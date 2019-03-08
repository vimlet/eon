// ############################################################################################
// DEBUG
// ############################################################################################

eon.warn = eon.warn || {};
eon.error = eon.error || {};

eon.debug.log = function(condition, message) {
  if (eon.debug[condition]) {
    console.log(condition + ": " + message);
  }
};

eon.warn.log = function(condition, message) {
  if (eon.warn[condition]) {
    console.warn(condition + ": " + message);
  }
};

eon.error.log = function(condition, message) {
  if (eon.error[condition]) {
    console.error(condition + ": " + message);
  }
};

eon.debug.adapterEvents = "adapterEvents" in eon.debug ? eon.debug.adapterEvents : false;
eon.debug.configEvents = "configEvents" in eon.debug ? eon.debug.configEvents : false;
eon.debug.elementEvents = "elementEvents" in eon.debug ? eon.debug.elementEvents : false;

eon.warn.store = "store" in eon.warn?  eon.warn.store : true;
eon.error.store = "store" in eon.error? eon.error.store : true;
