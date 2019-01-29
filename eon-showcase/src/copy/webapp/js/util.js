function setUpSearch(selector) {
  // Search listener
  document.querySelector(selector).onSearch(function (filters) {
    // Loop filtering targets
    refs.tree.refresh(filters.tText);
  });
}
function setUpTheme(selector) {
  var themeSelector = document.querySelector(selector);
  // Set themes selector responsive
  setUpSelector(themeSelector);
  // Non EON components theme switching 
  switchThemeListener(themeSelector);
}

function setUpSelector(themeSelector) {
  var selectorContainer = themeSelector.parentNode;
  var selectorContainerParent = themeSelector.parentNode.parentNode;
  //
  window.addEventListener("resize", function () {
    checkResponsive();
  });
  function checkResponsive() {
    if (this.innerWidth >= 1301) {
      document.body.appendChild(selectorContainer);
    } else {
      selectorContainerParent.appendChild(selectorContainer);
    }
  }
  checkResponsive();
}
function switchThemeListener(themeSelector) {
  // Get themed showcase DOM elements
  var logo = document.querySelector(".tIcon");
  var elms = [".tStickyClass", ".tMenuBtn", ".tViewContainer",
    ".tTreeContainer", ".theme-selector .eon-combobox-wrapper",
    ".theme-selector-container", ".d-searchbar-colors", ".d-gutter eon-section",
    "eon-gutter eon-section", ".d-gutter-root .eon-gutter-section", ".d-gutter .eon-gutter-section, .d-gutter-root .eon-gutter-section"];
  // Search listener
  themeSelector.onSelected(function (item) {
    eon.theme = item.value;
    if (item.value == "noire") {
      // Change EON logo
      logo.style.backgroundImage = "url(../img/eon-logo-w.svg)";
      // DOM elements theme
      for (var i = 0; i < elms.length; i++) {
        var elm = document.querySelector(elms[i]);
        console.log('elm', elm, elm.style.boxShadow);
        if(window.getComputedStyle(elm).boxShadow) {
          elm.style.boxShadow = "0px 0px 10px #1b1b1b";
        }
        elm.classList.add("to-noire");
      }
      // Card titles
      var titles = document.querySelectorAll(".card h1");
      for (var i = 0; i < titles.length; i++) {
        var title = titles[i];
        title.classList.add("to-noire");
      }
    } else {
      // Change EON logo
      logo.style.backgroundImage = "url(../img/eon-logo.svg)";
      // DOM elements theme
      for (var i = 0; i < elms.length; i++) {
        var elm = document.querySelector(elms[i]);
       
        if(window.getComputedStyle(elm).boxShadow) {
          elm.style.boxShadow = "0px 0px 10px #d8d8d8";
        }
        elm.classList.remove("to-noire");
      }
      // Card titles
      var titles = document.querySelectorAll(".card h1");
      for (var i = 0; i < titles.length; i++) {
        var title = titles[i];
        title.classList.remove("to-noire");
      }
    }
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
    if (!refs.cancelTreeSelection) {
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
    }
    refs.cancelTreeSelection = false;
  });
  // Initialize forms
  eon.onReady(function () {
    refs.view.onReady(function () {
      refs.view._misc.activePanel.onLoad(function () {
        // Set up scroll anchor activation
        anchorScrolling(this);
        this.render();
        // Expand forms tree node
        refs.tree.nodes["forms"].toggleExpand();
        // Select first node
        refs.tree.selectNode(refs.tree.nodes["forms/button"]);
      });
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
    eon.onReady(function () {
      refs.view._misc.panels.containers.onLoad(function () {
        if (Object.keys(refs.view._misc.panels.containers._refs.templates).length) {

          anchorScrolling(refs.view._misc.panels.containers);
          anchorScrolling(refs.view._misc.panels.media);
          anchorScrolling(refs.view._misc.panels.menus);
          anchorScrolling(refs.view._misc.panels.other);

          refs.view._misc.panels.containers.render();
          refs.view._misc.panels.media.render();
          refs.view._misc.panels.menus.render();
          refs.view._misc.panels.other.render();

          othersInitialize();

          // Fix Togglemenu displaying
        }
      });
      refs.view._misc.panels.forms.content.parentNode.scrollTop = 0;
      refs.mask.hide();
    });
  }, 600);
}

function anchorScrolling(panel) {
  // Make sure all panels has been loaded
  setTimeout(function () {
    // Get all anchors
    panel.onLoad(function () {
      var anchors = panel.querySelectorAll("eon-anchor");
      var name;
      // On anchor activated
      for (var i = 0; i < anchors.length; i++) {
        anchors[i].onReached(function () {
          name = this.state;
          refs.tree.onReady(function () {
            //
            refs.cancelTreeSelection = true;
            refs.tree.selectNode(refs.tree.nodes[panel.name + "/" + name]);
          });
        });
      }
    });

  }, 0);
}
