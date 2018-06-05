function setUpSearch (selector) {
    // Search listener
    document.querySelector(selector).onSearch(function (filters) {
        var name = filters.tText;
        var filterTargets = refs.tree._refs.tree.children;
        // Loop filtering targets
        for (var i = 0; i < filterTargets.length; i++) {
            // Check matches
            if (~filterTargets[i].path.toLowerCase().indexOf(name.toLowerCase())) {
                filterTargets[i].classList.remove("notVisible");
            } else {
                filterTargets[i].classList.add("notVisible");
            }
        }
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