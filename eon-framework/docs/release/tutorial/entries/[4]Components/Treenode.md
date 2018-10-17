# Treenode

## Introduction

This element is intended to be used within a [vc-tree](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FTree.md) as the main structural piece and should not be imported directly.

## Declarative usage 

Declare the vc-treenode the same way you declare any other HTML element:

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

### Intermediate nodes creation

The vc-treenode provides a simple way of creating the whole node structure defined by its path with a single treenode declaration.
Declare a vc-treenode and specify a path, during the element life cycle it will create as many directories as needed to complete the path structure.

``` [html]
<vc-tree>
  <!-- "dir" and "subdir" intermediate directories will be created before creating the "file" node -->
  <vc-treenode type="file" name="file" path="dir/subdir/file"></vc-treenode>
</vc-tree>
```