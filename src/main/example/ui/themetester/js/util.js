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
        activePanel = refs.view.getActivePanel();
        anchor = activePanel.querySelector("[state=" + node.id + "]");
        console.log('node clicked: ', node._refs.parentNode);

        // Go to group file
        groupId = node._refs.parentNode.tagName == "VC-TREENODE" ? node._refs.parentNode.id : node.id; 

        refs.view.swapToPanel(groupId);

        // if(anchor) {
        //     console.log('file group: ', node._refs.parentNode.id);
        //     refs.view.swapToPanel(node._refs.parentNode.id);
        // } else {
        // }

        // Update scroll
        activePanel.vcometScroll.update();

        // if(node.type == "file" && activePanel.name == node._refs.parentNode.id) {
        //     console.log('node.type', node.type);
        //     //
        //     anchor = activePanel.querySelector("[state=" + node.id + "]");
        //     if(anchor) {
        //         // Scroll to the specific element section
        //         activePanel.vcometScroll.scrollTop = [anchor.getOffsetPosition(), true];
        //     } else {
        //         refs.view.swapToPanel(node._refs.parentNode.id);
        //         activePanel = refs.view.getActivePanel()
        //         // Update scroll
        //         activePanel.vcometScroll.update();
        //     }
        // } else if (node.type == "file" && activePanel.name != node._refs.parentNode.id){
        //     anchor = activePanel.querySelector("[state=" + node.id + "]");
        //     if(anchor) {
        //         refs.view.swapToPanel(node._refs.parentNode.id);
        //         activePanel = refs.view.getActivePanel();
        //         // Scroll to the specific element section
        //         activePanel.vcometScroll.scrollTop = [anchor.getOffsetPosition(), true];
        //         // Update scroll
        //         activePanel.vcometScroll.update();
        //     }
        // } else {
        //     refs.view.swapToPanel(node.id);
        //     // Update scroll
        //     activePanel.vcometScroll.update();
        // }
    })
}