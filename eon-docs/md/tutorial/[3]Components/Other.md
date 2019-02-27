*[
  function changeTheme(playground, btn){
    var eon = playground._refs.iframe.contentWindow.eon;
    eon.theme= eon.theme == "claro" ? "noire" : "claro";
    if(eon.theme == "claro") {
      // TO NOIRE
      eon.theme = "noire"
      btn.classList.add("app-vicon-noire");
    } else {
      // TO CLARO
      eon.theme = "claro";
      btn.classList.remove("app-vicon-noire");
    }
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
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*

The tree element functionality depends on the `eon-tree-node` element as structural element, so it is imported while eon-tree does.

[Progressbar]<>
The loader element is a useful mask for your application processes and page loading as well. Its style, animation, and functionality are completely customizable improving your application user experience.

*(
<doc-playground label="Progress bar" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.theme = "claro";
        eon.themeSchema = {
          claro: ["eon-progressbar"]
        }
      </script>
      <script>eon.import([  
        'framework/doc-eon/eon/ui/eon-progressbar',
        'framework/doc-eon/eon/ui/eon-button','framework/doc-eon/custom/doc-playground/doc-showcase'
      ])</script>
      <style>
        .doc-showcase-title {
            display: none;
        }
      </style>
  </doc-head>
  <doc-body>
     <doc-showcase label="Loader">
      <eon-progressbar id="d-l1" class="loader page-loader" duration="1000" effect="linear">
      </eon-progressbar>
      <div class="loader-btn-container">
        <eon-button class="btn" value="Run page loader" onclick="runLoader()"></eon-button>
      </div>
    </doc-showcase>
    <doc-showcase label="Progress ease">
      <eon-progressbar id="d-l4" type="progress" effect="ease" bar-color="#b36a6a"   class="loader progress" duration="1000">
      </eon-progressbar>
      <div class="loader-btn-container">
        <eon-button class="btn" value="Run progress bar" onclick="runEaseProgress()"></eon-button>
      </div>
    </doc-showcase>
  </doc-body>
  </template>
  <template type="js">
     eon.onReady(function () {
        //** Showcase resize fix
        // Iframe content loaded monitoring
        eon.triggerCallback("onLoaded", window.frameElement);
        document.body.setAttribute("theme", "claro");
        //**
        runLoader();
        runEaseProgress()
      });

      function runLoader(l1) {
        var l1 = document.querySelector("#d-l1");
        l1.animate(0, 0);
        l1.animate(1);
      }

      function runEaseProgress() {
        var l4 = document.querySelector("#d-l4");
        l4.animate(0, 0);
        l4.animate(1, 2000);
      }
  </template>
  <template type="css">
    .loader {
      height: 5px !important;
      width: 100% !important;
    }
    .progress {
      position: relative;
      height: 15px !important;
      width: 100% !important;
      margin-right: auto;
    }
    .loader-btn-container {
      width: 100%;
      height: 100px;
      margin-right: auto;
      display: flex;
      align-items: flex-end;
    }
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*

Despite there are two types of `eon-progressbar`, the only difference between them is on their layout structure and styling, but both of them work the same way.