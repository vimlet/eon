function setUpSearch (selector) {
    // Search listener
    document.querySelector(selector).onSearch(function (filters) {
        // Loop filtering targets
        refs.tree.refresh(filters.tText);
    });
}

function loadVCometExamples () {
    var anchor, activePanel;
    // Configure tree
    refs.tree.vcometScroll.thickness = "10";
    // Load vComet element example
    refs.tree.onNodeSelected(function(node) {
        activePanel = refs.view.getActivePanel();
        anchor = activePanel.querySelector("[state=" + node.id + "]")
        //
        if (anchor) {
            // Scroll to
            activePanel.vcometScroll.scrollTop = [anchor.getOffsetPosition(), true];
        } else {
            refs.view.swapToPanel(node.id);
            // Update scroll
            activePanel.vcometScroll.update();
        }
    })
}