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
  })
}

function toggleMenu(forceAction) {
  var drawer = document.querySelector(".tTreeContainer");
  if ((drawer._misc.displayed && !forceAction) || forceAction == "close") {
    drawer.close();
  } else if ((!drawer._misc.displayed && !forceAction) || forceAction == "open") {
    drawer.show();
  }
}

function initializePlayground(sectionsClass, pgClass, static) {
  // PROBABLY NECESSARY DUE TO EON-PANEL SCRIPTS MANAGEMENT (to be removed...)
  setTimeout(function () {
    // Initialize playground
    var sections = document.querySelector(sectionsClass).content.children;
    var pg = document.querySelector(pgClass);
    var scrollContent;
    // Set playground content
    pg.onReady(function () {
      var pgObj = {
        head: sections[0].innerHTML,
        body: sections[1].innerHTML,
        js: sections[2].innerHTML,
        css: sections[3].innerHTML
      };
      pg.setData(pgObj);
    });
    if (!static) {
      // Get content height
      pg.onContentSet(function (iframe) {
        // Iframe on content loaded 
        eon.createCallback("onLoaded", iframe);
        // Make playground fit its iframe content
        iframe.onLoaded(function () {
          var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
          var scroll = innerDoc.body.children[0];
          scroll.onReady(function () {
            scrollContent = scroll.children[0];
            var size = 0;
            for (var i = 0; i < scrollContent.children.length; i++) {
              size += scrollContent.children[i].offsetHeight;
            }
            setPgHeight(pg, size);
          });
          // Playground resize listener
          playgroundResizeListener(pg, innerDoc);
          // Playground fullscreen listeners
          fullScreenListeners(pg);
        });
      });
    }
  }, 0);
}

function playgroundResizeListener(pg, innerDoc) {
  var scrollContent, body, scroll;
  pg._misc.prevSize = pg.offsetHeight;
  var delay = 200;
  var throttled = false;
  // Resize listener
  pg.onResize(function () {
    if (!throttled) {
      body = pg._refs.resizable ? pg._refs.resizable.body : innerDoc.body;
      if (body) {
        // Get scroll content
        var scroll = body.children[0];
        scroll.onReady(function () {
          scrollContent = scroll.children[0];
          // Get rows size
          var size = 0;
          for (var i = 0; i < scrollContent.children.length; i++) {
            size += scrollContent.children[i].offsetHeight;
          }
          // Keep playground full screen size if activated
          if (pg._misc.fullScreenActivated) {
            pg.style.height = "100%";
          } else {
            // Set playground new size
            setPgHeight(pg, size);
          }
        });
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
    pg.style.height = 37 + size + "px";
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