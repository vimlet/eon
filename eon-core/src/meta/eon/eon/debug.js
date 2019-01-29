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

eon.debug.adapterEvents = eon.debug.adapterEvents || false;
eon.debug.configEvents = eon.debug.configEvents || false;
eon.debug.elementEvents = eon.debug.elementEvents || false;

eon.warn.store = eon.warn.store || true;
eon.error.store = eon.error.store || true;
