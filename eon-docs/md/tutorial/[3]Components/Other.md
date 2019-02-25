*[
    function changeTheme(playground){
      var eon = playground._refs.iframe.contentWindow.eon;
      eon.theme= eon.theme == "claro" ? "noire" : "claro";
    }
]*
[Tree]<>
The eon-tree element is the best ally to represent hierarchical data, it is based on the same tree structure idea as many other frameworks that cover this component, but it is hugely easier to configure and it can be initialized on a reduced and intuitive code. 

*(
<doc-playground label="File manager" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
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
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
        .doc-showcase-title {
            display: none;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
      <eon-tree icons="all" drag="true">
        <eon-tree-node name="dir" path="dir"></eon-tree-node>
        <eon-tree-node type="file" name="file1" path="file1"></eon-tree-node>
        <eon-tree-node path="dir2/dir2.1/dir2.1.1"></eon-tree-node>
        <eon-tree-node type="file" path="dir3/dir2.1/dir2.1.1/dir2.1.1.1/file2"></eon-tree-node>
     </eon-tree>
    </doc-showcase>
  </doc-body>
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "text":"theme", "icon":"bubble-chart"}}
  </template>
</doc-playground>
)*

The tree element functionality depends on the `eon-tree-node` element as structural element, so it is imported while eon-tree does.

