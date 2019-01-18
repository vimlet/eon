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
    var renderingDelay = eon.util.isTouchScreen() ? 1600 : 500;
    
    // Set showcase content
    if (!~[
      ".d-button-pg", 
      ".d-checkbox-pg", 
      ".d-dialog-pg", 
      ".d-drawer-pg", 
      ".d-loader-pg",
      ".d-loadingmask-pg"
  ].indexOf(pgClass)) {
      setTimeout(function () {
        pg.onReady(function () {
          var pgObj = {
            head: sections[0].innerHTML,
            body: sections[1].innerHTML,
            js: sections[2].innerHTML,
            css: sections[3].innerHTML
          };
          pg.setData(pgObj);
        });
      }, renderingDelay);
    } else {
      pg.onReady(function () {
        var pgObj = {
          head: sections[0].innerHTML,
          body: sections[1].innerHTML,
          js: sections[2].innerHTML,
          css: sections[3].innerHTML
        };
        pg.setData(pgObj);
      })
    }

    // Get content height
    pg.onContentSet(function (iframe) {
      // Iframe on content loaded 
      eon.createCallback("onLoaded", iframe);
      // Make showcase fit its iframe content
      iframe.onLoaded(function () {
        // Load next showcase sections
        // eon.onReady(function(){
          // loadNextSections(pgClass);
        // });
        
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

    pg.style.height = size + "px";
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

function loadNextSections(pgClass) {
  refs.view._misc.panels.containers.onLoad(function () {
    if (pgClass == ".d-button-pg" && Object.keys(refs.view._misc.panels.containers._refs.templates).length) {
      // alert(refs.view._misc.panels.containers._refs.templates[0]);
      
      refs.view._misc.panels.containers.render();
      refs.view._misc.panels.media.render();
      refs.view._misc.panels.menus.render();
      refs.view._misc.panels.other.render();
    }
  });
}