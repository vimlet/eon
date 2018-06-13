function setUpSearch (selector) {
    // Search listener
    document.querySelector(selector).onSearch(function (filters) {
        // Loop filtering targets
        refs.tree.refresh(filters.tText);
    });
}

function loadVCometExamples () {
    var anchor, activePanel, groupId;
    // Configure tree
    refs.tree.vcometScroll.thickness = "10";
    // Load vComet element example
    refs.tree.onNodeSelected(function(node) {
        // Go to group file
        groupId = node._refs.parentNode.tagName == "VC-TREENODE" ? node._refs.parentNode.id : node.id; 
        refs.view.swapToPanel(groupId);
        // Get active panel
        activePanel = refs.view.getActivePanel();
        // Get node related anchor
        anchor = activePanel.querySelector("[state=" + node.id + "]");
        if(anchor) {
           // Scroll to the specific element section
           activePanel.vcometScroll.scrollTop = [anchor.getOffsetPosition(), true];
        }
        // Update scroll
        activePanel.vcometScroll.update();
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