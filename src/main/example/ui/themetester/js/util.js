function setUpSearch (selector) {
    // Search listener
    document.querySelector(selector).onSearch(function (filters) {
        // Loop filtering targets
        refs.tree.refresh(filters.tText);
    });
}

function loadVCometExamples () {
    // Configure tree
    refs.tree.vcometScroll.thickness = "10";
    // Load vComet element example
    refs.tree.onNodeSelected(function(node) {
        refs.view.swapToPanel(node.id);
        // Update scroll
        refs.view.getActivePanel().vcometScroll.update();
    })
}