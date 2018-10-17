# Treenode

## Introduction

This element is intended to be used within a [eon-tree](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FTree.md) as the main structural piece and should not be imported directly.

## Declarative usage 

Declare the eon-treenode the same way you declare any other HTML element:

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

### Intermediate nodes creation

The eon-treenode provides a simple way of creating the whole node structure defined by its path with a single treenode declaration.
Declare a eon-treenode and specify a path, during the element life cycle it will create as many directories as needed to complete the path structure.

``` [html]
<eon-tree>
  <!-- "dir" and "subdir" intermediate directories will be created before creating the "file" node -->
  <eon-treenode type="file" name="file" path="dir/subdir/file"></eon-treenode>
</eon-tree>
```