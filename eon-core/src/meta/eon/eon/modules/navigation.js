eon.history = eon.history || {};

eon.history.location = {};

eon.history.location.origin = window.location.origin;
eon.history.location.href = window.location.href;
eon.history.location.state = window.location.hash || window.location.pathname.split("/")[1];
eon.history.location.params = eon.util.queryToObject(window.location.href);
eon.history.current = window.location.pathname.substring(1);
eon.history.states = {};
eon.history.cancelNavigation = false;

eon.history.push = function (obj, url, title) {
  if (!eon.history.cancelNavigation) {
    history.pushState(obj, url, title);
    eon.history.getURLInformation();
    eon.history.states[eon.history.current] = url;
  }
};
eon.history.replace = function (obj, url, title) {
  if (!eon.history.cancelNavigation) {
    history.replaceState(obj, url, title);
    delete eon.history.states[eon.history.current];
    eon.history.getURLInformation();
    eon.history.states[eon.history.current] = url;
  }
};

// Create on URL hash changed callback
eon.createCallback("onHashChanged", eon.history);

// Wrap window on pop state event
window.onpopstate = function () {
  eon.history.getURLInformation();
  eon.triggerCallback("onHashChanged", eon.history, eon.history, [eon.history]);
};

/*
  @function getURLInformation
  @description Save window location object information
*/
eon.history.getURLInformation = function () {
  eon.history.location.origin = window.location.origin;
  eon.history.location.state = window.location.history || window.location.pathname.substring(1);
  eon.history.location.params = eon.util.queryToObject(window.location.href);
  eon.history.current = window.location.hash ? window.location.pathname.substring(1) + window.location.hash
    : window.location.pathname.substring(1);
};