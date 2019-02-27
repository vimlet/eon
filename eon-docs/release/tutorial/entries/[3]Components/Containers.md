*[
  function changeTheme(playground, btn){
    var eon = playground._refs.iframe.contentWindow.eon;
    eon.theme = eon.theme == "claro" ? "noire" : "claro";
  }
]*
[Grid]<>
^[API](#!&mode=api&file=ui%2Feon-grid%2Feon-grid.html)


Also known as `table`, displays a large number of data using rows and columns.

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
  <template type="html">
      <head>
          <script src='framework/doc-eon/eon/eon.js'></script>
          <script>eon.import(['framework/doc-eon/eon/ui/eon-grid','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
      </head>
      <body>
          <doc-showcase label="Default">
              <eon-grid footer="true" entries-count="false" row-min-height="80" column-min-width="200"
                  columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:340px" page-size="8" autofit="false">
                  <eon-grid-row>
                      <eon-grid-cell column="name">John</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Jill</eon-grid-cell>
                      <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Joseph</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Charles</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Jaime</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Johan</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">David</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Samuel</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Vera</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Janine</eon-grid-cell>
                      <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  </eon-grid>
          </doc-showcase>
      </body>
  </template>
  <template type="css">
      .doc-showcase-content{display:flex;}
      .doc-showcase-content eon-button{margin:0 5px;}
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*

## Autofit Type

This type of grid is meant to reduce the amount of headaches when dealing with grid pages as it completely removes the need of scrolling vertically, it only shows the amount of rows that fit the in the available space.

*(
<doc-playground label="Autofit" html="true" js="true" css="true" selector="body">
  <template type="html">
      <head>
          <script src='framework/doc-eon/eon/eon.js'></script>
          <script>eon.import(['framework/doc-eon/eon/ui/eon-grid','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
      </head>
      <body>
          <doc-showcase label='Smaller Space'>
              <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80" column-min-width="200" autofit="true"
                  columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:260px">
                  <eon-grid-row>
                      <eon-grid-cell column="name">John</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Jill</eon-grid-cell>
                      <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Joseph</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Charles</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Jaime</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Johan</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">David</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Samuel</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Vera</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Janine</eon-grid-cell>
                      <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  </eon-grid>
          </doc-showcase>
          <doc-showcase label='Larger Space'>
              <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80" column-min-width="200" autofit="true"
                  columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:580px">
                  <eon-grid-row>
                      <eon-grid-cell column="name">John</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Jill</eon-grid-cell>
                      <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Joseph</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Charles</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Jaime</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Johan</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">David</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Samuel</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="age">16</eon-grid-cell>
                      <eon-grid-cell column="phone">3345</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Vera</eon-grid-cell>
                      <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                      <eon-grid-cell column="phone">666676666</eon-grid-cell>
                  </eon-grid-row>
                  <eon-grid-row>
                      <eon-grid-cell column="name">Janine</eon-grid-cell>
                      <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                      <eon-grid-cell column="age">27</eon-grid-cell>
                      <eon-grid-cell column="phone">766565454</eon-grid-cell>
                  </eon-grid-row>
                  </eon-grid>
          </doc-showcase>
      </body>
  </template>
  <template type="css">
      .doc-showcase-content{display:flex;}
      .doc-showcase-content eon-button{margin:0 5px;}
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*


[Gutter]<>
^[API](#!&mode=api&file=ui%2Feon-gutter%2Feon-gutter.html)


The gutter element is a container with the ability to separate its content in two sections divided with a draggable splitter, providing a flexible manipulation over the size of the sections and displaying. This kind of components is frequently used on code editor programs.

Gutter sections can be collapsible for dynamic behavior. On the contrary, the gutter provides other properties like allowDrag to reflect a static content layout.

*(
<doc-playground label="Vertical gutter" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-gutter"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-gutter',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
        doc-showcase {
           width: 100%;
        }
        doc-showcase .doc-showcase-content {
          height: 250px;
          width: 100%;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
      <eon-gutter type="horizontal" collapsible="true">
        <eon-section class="section">
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
        </eon-section>
        <eon-section>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
        </eon-section>
      </eon-gutter>
    </doc-showcase>
  </doc-body>
  </template>
   <template type="css">
      .gutter-box {
          height: 50px;
          width: 50px;
          min-width: 50px;
          margin: 8px;
          background: #76bb72;
      }
      .blue {
        background-color: #7296bb !important;
      }

      .red {
        background-color: #b36a6a;
      }
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*


Nothing prevents you from declaring nested eon-gutter elements without losing customization.


*(
<doc-playground label="Nested gutter" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-gutter"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-gutter',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
        doc-showcase {
           width: 100%;
        }
        doc-showcase .doc-showcase-content {
          height: 350px;
          width: 100%;
        }
        .doc-showcase-title {
            display: none;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
    <eon-gutter type="vertical" collapsible="true">
        <eon-section>
          <eon-gutter collapsible="false">
            <eon-section class="section">
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
            </eon-section>
            <eon-section>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
            </eon-section>
          </eon-gutter>
        </eon-section>
        <eon-section>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
        </eon-section>
      </eon-gutter>
    </doc-showcase>
  </doc-body>
  </template>
   <template type="css">
      .gutter-box {
          height: 50px;
          width: 50px;
          min-width: 50px;
          margin: 8px;
          background: #76bb72;
      }
      .blue {
        background-color: #7296bb !important;
      }

      .orange {
        background-color: #bb9772;
      }
      .red {
        background-color: #b36a6a;
      }
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*


[Headerpanel]<>
^[API](#!&mode=api&file=ui%2Feon-headerpanel%2Feon-headerpanel.html)


The Headerpanel element works as a simple container but provides a bunch of properties to simulate a card layout with a title header, action and remove buttons and scrollable content.

*(
<doc-playground label="Flexible behavior" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-headerpanel"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-headerpanel',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase label="Header panel">
      <eon-headerpanel header="static" header-content="Squares"  class="headerpanel" default-style="false">
      <div class="headerpanel-square blue"></div>
        <div class="headerpanel-square blue"></div>
        <div class="headerpanel-square blue"></div>
        <div class="headerpanel-square blue"></div>
      </eon-headerpanel>
    </doc-showcase>
    <doc-showcase label="Growing header">
      <eon-headerpanel id="growing-headerpanel" default-style="false" header="grow" class="headerpanel" header-content="More squares" action-button="changeSquaresColor('growing-headerpanel')" close-button="none" close-button-class="d-black-close">
        <div class="headerpanel-square red"></div>
        <div class="headerpanel-square red"></div>
        <div class="headerpanel-square red"></div>
        <div class="headerpanel-square red"></div>
      </eon-headerpanel>
    </doc-showcase>
    <doc-showcase label="Simple panel">
      <eon-headerpanel class="headerpanel" default-style="false">
      </eon-headerpanel>
    </doc-showcase>
  </doc-body>
  </template>
   <template type="css">
      .red {
        background-color: #b36a6a;
      }
      .blue {
        background-color: #7296bb;
      }
      .headerpanel {
        width: 200px;
        height: 200px;
        transition: all .2s;
      }
      .headerpanel-square {
        width: 100%;
        height: 100px;
        margin-top: 12px;
        transition: all .2s;
      }
  </template>
  <template type="js">
    var colors = ["", "#b78f47", "#2a9a9a", "#8c47b7", "#bb9772", "#b36a6a", "#7296bb"];

    function changeSquaresColor(id) {
      var squares = document.querySelector("#" + id).querySelectorAll(".headerpanel-square");
      var color = Math.floor((Math.random() * 6) + 1);
      // Change squares color
      for (var index in squares) {
        squares[index].style.backgroundColor = colors[color];
      }
    }
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*

[Panel]<>
^[API](#!&mode=api&file=ui%2Feon-panel%2Feon-panel.html)


Panel is the basic container element. It has no associated style so it is completely customizable in terms of layout. Provides a huge control over its content elements rendering, allowing on demand content or partial content loading.

*(
<doc-playground label="Panels" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-button',
          'framework/doc-eon/eon/ui/eon-panel',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
        @media (max-width: 430px) {
          doc-showcase {
            width: calc(100% - 40px);
          }
          eon-panel {
            width: 100%;
            min-width: 100% !important;
          }
          .panel-content {
            width: 100% !important;
          }
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase label="On demand import">
      <eon-button class="panel-button" value="Import lazy" onclick="importRemote()"></eon-button>
      <eon-panel id="lazy-remote" class="panel" default-style="false" fill="false" 
                allow-scroll="false" href="data/panel/lazyContent.html" lazy-load="true">
        <div class="panel-content place-holder" style="box-shadow: none;">No content here</div>
      </eon-panel>
    </doc-showcase>
    <doc-showcase label="On demand rendering">
      <eon-button class="panel-button" inline="true" value="Render lazy" onclick="renderLazy()"></eon-button>
      <eon-panel id="lazy-content" class="panel" default-style="false" fill="false" allow-scroll="false">
        <div class="panel-content place-holder">I'm a hidden div!</div>
        <template>
          <div class="panel-content" style="background-color: #7296bb;">
            I'm an on demand rendered div!
          </div>
        </template>
      </eon-panel>
    </doc-showcase>
  </doc-body>
  </template>
  <template type="css">
    .panel {
      flex-direction: column;
        min-width: 350px;
        height: 100px;
    }
    .panel-content {
      height: 100px;
      width: 350px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      text-align: center;
      padding: 6px;
      color: #ffffff;
      box-sizing: border-box;
    }
    .place-holder {
      background-color: #76bb72;
      -moz-box-shadow: inset 0 0 10px #ffffff;
      -webkit-box-shadow: inset 0 0 10px #ffffff;
      box-shadow: inset 0 0 10px #ffffff;
    }
    .panel-button {
      width: 150px;
      margin-bottom: 10px;
    }
    #lazy-remote {
      -webkit-box-shadow: 0px 0px 10px #d8d8d8;
      -moz-box-shadow: 0px 0px 10px #d8d8d8;
      box-shadow: 0px 0px 10px #d8d8d8;
    }
  </template>
  <template type="js">
    //**
    function renderLazy() {
      document.querySelector("#lazy-content").render();
      // Remove place holder
      document.querySelector("#lazy-content .place-holder").style.display = "none";
    }
    function importRemote() {
      document.querySelector("#lazy-remote").importContent();
      // Remove place holder
      document.querySelector("#lazy-remote .place-holder").style.display = "none";
    }
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*


All the elements not surrounded by the template tag will render normally. 
For further implementation, you can use as many templates as you need to manage lazy content inside a single eon-panel.

