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

function initializePlayground(sectionsClass, pgClass) {
    // PROBABLY NECESSARY DUE TO EON-PANEL SCRIPTS MANAGEMENT (to be removed...)
    setTimeout(function () {
        // Initialize playground
        var sections = document.querySelector(sectionsClass).content.children;
        var pg = document.querySelector(pgClass);
        pg.onReady(function () {
            var pgObj = {
                head: sections[0].innerHTML,
                body: sections[1].innerHTML,
                js: sections[2].innerHTML,
                css: sections[3].innerHTML
            };
            pg.setData(pgObj);
        });
    }, 0);
}