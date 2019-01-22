function setUpSearch(selector) {
  // Search listener
  document.querySelector(selector).onSearch(function (filters) {
    // Loop filtering targets
    refs.tree.refresh(filters.tText);
  });
}

function loadEonExamples() {
  var anchor, activePanel, groupId;
  // Configure tree
  var treeScroll = refs.tree.querySelector("eon-scroll");
  treeScroll.thickness = "10";
  // Get tree parent nodes
  var rootNodes = [].slice.call(refs.tree._refs.tree.children);
  // Load vComet element example
  refs.tree.onNodeSelected(function (node) {
    // Go to group file
    groupId = node._refs.parentNode.tagName == "EON-TREENODE" ? node._refs.parentNode.id : node.id;

    refs.view.swapToPanel(groupId);
    // Get active panel
    activePanel = refs.view.getActivePanel();
    var panelScroll = activePanel.$1("eon-scroll");
    // Get node related anchor
    anchor = activePanel.querySelector("[state=" + node.id + "]");
    if (anchor) {
      // Scroll to the specific element section
      panelScroll.scrollTop = [anchor.getOffsetPosition(), true];
    }
    if (eon.util.isTrue(node.initExpanded)) {
      refs.drawer.close();
    } else {
      // Shrink other tree nodes on mobile devices
      if (eon.util.isTouchScreen()) {
        for (var i = 0; i < rootNodes.length; i++) {
          var rootNode = rootNodes[i];
          if (rootNode.path !== node.path && eon.util.isTrue(rootNode.expanded)) {
            rootNode.toggleExpand();
          }
        }
      }
    }
  });
  // Initialize forms
  eon.onReady(function () {
    refs.view._misc.activePanel.onLoad(function () {
      this.render();
    });
  });
}

function toggleMenu(forceAction) {
  var drawer = document.querySelector(".tTreeContainer");
  if ((drawer._misc.displayed && !forceAction) || forceAction == "close") {
    drawer.close();
  } else if ((!drawer._misc.displayed && !forceAction) || forceAction == "open") {
    drawer.show();
  }
}

function initializeShowcase(sectionsClass, pgClass) {
  // PROBABLY NECESSARY DUE TO EON-PANEL SCRIPTS MANAGEMENT (to be removed...)
  setTimeout(function () {
    // Initialize showcase
    var sections = document.querySelector(sectionsClass).content.children;
    var pg = document.querySelector(pgClass);
    // var renderingDelay = eon.util.isTouchScreen() ? 1600 : 500;

    // Set showcase content
    pg.onReady(function () {
      var pgObj = {
        head: sections[0].innerHTML,
        body: sections[1].innerHTML,
        js: sections[2].innerHTML,
        css: sections[3].innerHTML
      };
      pg.setData(pgObj);
    });

    // Get content height
    pg.onContentSet(function (iframe) {
      // Iframe on content loaded 
      eon.createCallback("onLoaded", iframe);
      // Make showcase fit its iframe content
      iframe.onLoaded(function () {
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var body = pg._refs.resizable ? pg._refs.resizable.body : innerDoc.body;

        setPgHeight(pg, body.offsetHeight);

        // Showcase resize listener
        showcaseResizeListener(pg, innerDoc);
        // Showcase fullscreen listeners
        fullScreenListeners(pg);
      });
    });
  }, 0);
}

function showcaseResizeListener(pg, innerDoc) {
  var body;
  pg._misc.prevSize = pg.offsetHeight;
  var delay = 250;
  var throttled = false;
  // Resize listener
  pg.onResize(function () {
  
    if (!throttled) {
      body = pg._refs.resizable ? pg._refs.resizable.body : innerDoc.body;
      if (body) {
        // Keep showcase full screen size if activated
        if (pg._misc.fullScreenActivated) {
          pg.style.height = "100%";
        } else {
          // Set showcase new size
          setPgHeight(pg, body.offsetHeight);
        }
      }
    }
    // Throttle
    throttled = true;
    // Set a timeout to un-throttle
    setTimeout(function () {
      throttled = false;
    }, delay);
  });
}

function setPgHeight(pg, size) {
  // Check null values
  if (size) {
    size = size < 250 ? 250 : size;

    var bodySize = size;
    if (bodySize >= pg.offsetHeight || pg.offsetHeight - 37 >= bodySize) {
      size = bodySize + 37;
    } else {
      size = pg.offsetHeight;
    }
    // Set 
    // pg.style.height = size + "px";
    pg.getEnclosingComponent().style.height = size + "px";
  }
}

function fullScreenListeners(pg) {
  // Full screen activated listener
  pg.onFullScreenActivated(function () {
    pg._misc.fullScreenActivated = true;
    pg._misc.prevSize = pg.offsetHeight;
  });
  // Full screen deactivated listener
  pg.onFullScreenDeactivated(function () {
    pg._misc.fullScreenActivated = false;
  });
}

function loadNextSections() {
  setTimeout(function () {
    refs.view._misc.panels.containers.onLoad(function () {
      if (Object.keys(refs.view._misc.panels.containers._refs.templates).length) {
        // alert(refs.view._misc.panels.containers._refs.templates[0]);

        refs.view._misc.panels.containers.render();
        refs.view._misc.panels.media.render();
        refs.view._misc.panels.menus.render();
        refs.view._misc.panels.other.render();
      }
    });
  }, 600);
}
/* EXAMPLE SPECIFICS */
/* DRAWER */
function slideInDrawer(id) {
  var drawer = document.querySelector("#" + id);
  drawer.show();
}
/* PANEL */
function renderLazy() {
  document.querySelector("#d-lazy-content").render();
  // Remove place holder
  document.querySelector("#d-lazy-content .d-place-holder").style.display = "none";
}
function importRemote() {
  document.querySelector("#d-lazy-remote").importContent();
  // Remove place holder
  document.querySelector("#d-lazy-remote .d-place-holder").style.display = "none";
}
/* LOADER */
function runLoader(l1) {
  var l1 = document.querySelector("#d-l1");
  l1.animate(0, 0);
  l1.animate(1);
}
function runEaseProgress() {
  var l4 = document.querySelector("#d-l4");
  l4.animate(0, 0);
  l4.animate(1, 2000);
}
eon.onReady(function () {
  setTimeout(function () {
    runLoader();
    runEaseProgress()
  }, 1000);
});
/* LOADINGMASK */
function showComplete() {
  var loadingmask = document.querySelector("#complete");
  loadingmask.show();
}
/* SEARCHBAR */
eon.onReady(function () {
  setTimeout(function () {
    document.querySelector(".onlyInput").onSearch(function (filters) {
      var name = filters.name;
      // Get colors
      var toFilterChildren = document.querySelector(".d-searchbar-colors").children;
      // Show filtered colors
      for (var i = 0; i < toFilterChildren.length; i++) {
        if (toFilterChildren[i].getAttribute("value").toLowerCase().indexOf(name.toLowerCase()) > -1) {
          toFilterChildren[i].classList.add("d-search-item-visible");
        } else {
          toFilterChildren[i].classList.remove("d-search-item-visible");
        }
      }
    });
  }, 1000);
});

function searchColor() {
  var input = document.querySelector(".onlyInput");
  input.search(document.querySelector(".onlyInput"));
}