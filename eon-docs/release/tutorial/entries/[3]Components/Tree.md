# Tree

## Introduction

The eon tree element is the best ally to represent hierarchical data, it is based on the same tree structure idea as many other frameworks that covers this component, but it is hugely easier to configure and it can be initialized on a reduced and intuitive code. 

## Declarative usage 

The tree element functionality depends on the [eon-treenode](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FTreenode.md) element as structural element, so it is imported while eon-tree does.

``` [html]
<head>
  <script>
    // Imports eon-swiper element and its dependencies (eon-treenode)
    eon.import("/eon/ui/eon-tree.html");
  </script>
<head>
```
Declare tree the same way you declare any other HTML element:

``` [html]
<eon-tree>
    <!-- Tree nodes -->
    <eon-treenode> node </eon-treenode>
    <eon-treenode> node </eon-treenode>
</eon-tree>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-tree
  var tree = document.createElement("eon-tree");

  // Create some nodes
  var treenode = document.createElement("eon-treenode");
  var treenode2 = document.createElement("eon-treenode");
  tree.appendChild(treenode);
  tree.appendChild(treenode2);

  // Append wherever you need it
  document.querySelector("body").appendChild(tree);

});
```

## Examples

### Store based tree

The tree element can be connected to a [eon-store](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FStore.md) to be built with remote data:

``` [html]
<eon-tree>
    <eon-store url="remote/source/treeData.json"></eon-store>
</eon-tree>
```

It does not need any other configuration to work and whenever a change is made on the tree it is reflected on the store data in a invisible way for the user.