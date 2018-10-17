/**
 *
 * @return {[type]} [description]
 */
function machineSearch() {
  // Filter machines listener
  document.querySelector("vc-searchbar").onSearch(function(filters) {
    var name = filters.name;
    var items = document.querySelector(".machineContainer").vcometScroll.content
      .children;
    for (var i = 0; i < items.length; i++) {
      if (
        items[i]
          .getAttribute("value")
          .toLowerCase()
          .indexOf(name.toLowerCase()) > -1
      ) {
        items[i].classList.add("visible");
      } else {
        items[i].classList.remove("visible");
      }
    }
  });
}

/**
 *
 * @return {[type]} [description]
 */
function drawerResizeListener() {
  var drawer = document.querySelector("#drawer");

  //TODO
  drawer.onReady(function() {
    vcomet.drawerExcludedNodes.push(document.querySelector("#mapId"));
  });
  drawer.onResize(function() {
    checkDevice();
  });
}

/**
 *
 * @return {[type]} [description]
 */
function checkDevice() {
  var drawer = document.querySelector("#drawer");
  // Tablet view
  if (
    window.innerWidth <= vcomet.tabletWidth &&
    window.innerWidth > vcomet.mobileWidth
  ) {
    drawerTablet(drawer);
    // Mobile view
  } else if (window.innerWidth <= vcomet.mobileWidth) {
    drawerMobile(drawer);
    // Desktop view
  } else {
    drawerDesktop(drawer);
  }
}
/**
 *
 * @return {[type]} [description]
 */
function drawerMobile(drawer) {
  drawer.style.width = "80%";
  // TODO
  drawer.style.top = "0";
  noDesktopLayout();
}
/**
 *
 * @return {[type]} [description]
 */
function drawerTablet(drawer) {
  drawer.style.width = "60%";
  // TODO
  drawer.style.top = "0";
  noDesktopLayout();
}
/**
 *
 * @return {[type]} [description]
 */
function drawerDesktop(drawer) {
  var hiddenContainer = document.querySelector(".hiddenContainer");
  drawer.closable = false;
  drawer.onReady(function() {
    drawer.show();
  });

  hiddenContainer.classList.add("visible");

  // TODO
  drawer.style.top = "60px";

  if (window.innerWidth > 1700) {
    drawer.style.width = "15%";
    hiddenContainer.style.minWidth = "15%";
  } else if (window.innerWidth > 1200) {
    drawer.style.width = "20%";
    hiddenContainer.style.minWidth = "20%";
  } else {
    drawer.style.width = "30%";
    hiddenContainer.style.minWidth = "30%";
  }
}

/**
 *
 * @return {[type]} [description]
 */
function noDesktopLayout() {
  drawer.closable = true;
  document.querySelector(".hiddenContainer").classList.remove("visible");
}

/**
 *
 * @return {[type]} [description]
 */
function showDrawer() {
  var drawer = document.querySelector("#drawer");
  // Show left drawer
  drawer.show();
}
