# Tree

## Introduction

The eon tree element is the best ally to represent hierarchical data, it is based on the same tree structure idea as many other frameworks that covers this component, but it is hugely easier to configure and it can be initialized on a reduced and intuitive code. 

## Declarative usage 

The tree element functionality depends on the [vc-treenode](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FTreenode.md) element as structural element, so it is imported while vc-tree does.

``` [html]
<head>
  <script>
    // Imports vc-swiper element and its dependencies (vc-treenode)
    eon.import("/eon/ui/vc-tree.html");
  </script>
<head>
```
Declare tree the same way you declare any other HTML element:

``` [html]
<vc-tree>
    <!-- Tree nodes -->
    <vc-treenode> node </vc-treenode>
    <vc-treenode> node </vc-treenode>
</vc-tree>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create vc-tree
  var tree = document.createElement("vc-tree");

  // Create some nodes
  var treenode = document.createElement("vc-treenode");
  var treenode2 = document.createElement("vc-treenode");
  tree.appendChild(treenode);
  tree.appendChild(treenode2);

  // Append wherever you need it
  document.querySelector("body").appendChild(tree);

});
```

## Examples

### Store based tree

The tree element can be connected to a [vc-store](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FStore.md) to be built with remote data:

``` [html]
<vc-tree>
    <vc-store url="remote/source/treeData.json"></vc-store>
</vc-tree>
```

It does not need any other configuration to work and whenever a change is made on the tree it is reflected on the store data in a invisible way for the user.