// ############################################################################################
// DEBUG
// ############################################################################################

vcomet.debug = vcomet.debug || {};

vcomet.debug.polyfill = vcomet.debug.polyfill || false;

vcomet.warn = vcomet.warn || {};

vcomet.error = vcomet.error || {};

vcomet.debug.log = function(condition, message) {
  if (vcomet.debug[condition]) {
    console.log(condition + ": " + message);
  }
};

vcomet.warn.log = function(condition, message) {
  if (vcomet.warn[condition]) {
    console.warn(condition + ": " + message);
  }
};

vcomet.error.log = function(condition, message) {
  if (vcomet.error[condition]) {
    console.error(condition + ": " + message);
  }
};

vcomet.debug.adapterEvents = vcomet.debug.adapterEvents || false;
vcomet.debug.configEvents = vcomet.debug.configEvents || false;
vcomet.debug.elementEvents = vcomet.debug.elementEvents || false;

vcomet.warn.store = vcomet.warn.store || true;
vcomet.error.store = vcomet.error.store || true;
