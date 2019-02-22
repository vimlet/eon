
[Tree]<>
The eon-tree element is the best ally to represent hierarchical data, it is based on the same tree structure idea as many other frameworks that cover this component, but it is hugely easier to configure and it can be initialized on a reduced and intuitive code. 

*(
<doc-playground label="Tree" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.theme = "claro";
        eon.themeSchema = {
          claro: ["eon-tree"]
        }
      </script>
      <script>eon.import([  
        'framework/doc-eon/eon/ui/eon-tree','framework/doc-eon/custom/doc-playground/doc-showcase'
      ])</script>
  </head>
  <body>
    <doc-showcase label='File manager'>
      <eon-tree icons="all" drag="true">
        <eon-tree-node name="dir" path="dir"></eon-tree-node>
        <eon-tree-node type="file" name="file1" path="file1"></eon-tree-node>
        <eon-tree-node path="dir2/dir2.1/dir2.1.1"></eon-tree-node>
        <eon-tree-node type="file" path="dir3/dir2.1/dir2.1.1/dir2.1.1.1/file2"></eon-tree-node>
     </eon-tree>
    </doc-showcase>
  </body>
  </template>
</doc-playground>
)*

The tree element functionality depends on the `eon-tree-node` element as structural element, so it is imported while eon-tree does.

