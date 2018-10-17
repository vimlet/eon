vcomet.history = vcomet.history || {};

vcomet.history.location = {};

vcomet.history.location.origin = window.location.origin;
vcomet.history.location.href = window.location.href;
vcomet.history.location.state = window.location.hash || window.location.pathname.split("/")[1];
vcomet.history.location.params = vcomet.util.queryToObject(window.location.href);
vcomet.history.current = window.location.pathname.substring(1);
vcomet.history.states = {};
vcomet.history.cancelNavigation = false;

vcomet.history.push = function (obj, url, title) {
  if (!vcomet.history.cancelNavigation) {
    history.pushState(obj, url, title);
    vcomet.history.getURLInformation();
    vcomet.history.states[vcomet.history.current] = url;
  }
};
vcomet.history.replace = function (obj, url, title) {
  if (!vcomet.history.cancelNavigation) {
    history.replaceState(obj, url, title);
    delete vcomet.history.states[vcomet.history.current];
    vcomet.history.getURLInformation();
    vcomet.history.states[vcomet.history.current] = url;
  }
};

// Create on URL hash changed callback
vcomet.createCallback("onHashChanged", vcomet.history);

// Wrap window on pop state event
window.onpopstate = function () {
  vcomet.history.getURLInformation();
  vcomet.triggerCallback("onHashChanged", vcomet.history, vcomet.history, [vcomet.history]);
};

/*
  @function getURLInformation
  @description Save window location object information
*/
vcomet.history.getURLInformation = function () {
  vcomet.history.location.origin = window.location.origin;
  vcomet.history.location.state = window.location.history || window.location.pathname.substring(1);
  vcomet.history.location.params = vcomet.util.queryToObject(window.location.href);
  vcomet.history.current = window.location.hash ? window.location.pathname.substring(1) + window.location.hash
    : window.location.pathname.substring(1);
};