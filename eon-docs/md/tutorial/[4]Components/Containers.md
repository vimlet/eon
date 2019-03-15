*[
  function changeTheme(playground, btn){
    var eon = playground._refs.iframe.contentWindow.eon;
    eon.theme = eon.theme == "claro" ? "noire" : "claro";
  }
]*
[Dialog]<>
^[eon-dialog API](#!version=latest&mode=api&file=ui%2Feon-dialog%2Feon-dialog.html)


The emerging component eon-dialog can contain text and other eon components or HTML components.
The basic dialog consists of a container, but it is possible to add header and footer.

Also, it has different properties to give it different functionality such as resizing.


*(
<doc-playground label="Common Usage" format="true" html="true" js="true" css="true" selector=".content" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.import([
        'framework/doc-eon/eon/ui/eon-dialog',
        'framework/doc-eon/eon/ui/eon-text',
        'framework/doc-eon/eon/ui/eon-button',
        'framework/doc-eon/custom/doc-playground/doc-showcase'
      ])
    </script>
    <style>
      .content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }   
      #textDialog {
        max-width: 700px;
        max-height: 300px;
      }
      .d-dialog-form {
        display:flex;
        flex-direction: column;
        padding: 0;
      }
      .d-dialog-placeholder {
        height: 200px;
        width: 100%;
      }
      .d-top-margin {
        margin-top: 10px;
      }
      .d-right-margin {
        margin-right: 10px;
      }
      #loginDialog {
        min-height: 292px;
        min-width: 280px;
      }
      #loginDialog.eon-dialog-dialog .eon-dialog-content {
        padding: 0 25px 25px 25px;
      }
      .d-dialog-form eon-text {
        margin: 5px 0;
      }
      @media (max-width: 600px) {
        #textDialog {
          max-height: none;
        }
      }
      @media (max-width: 460px) {
        .d-dialog-form eon-text {
          width: 100% !important;
        }
      }
    </style>
  </template>
  <template type="html-body">
    <div class="content">
      <doc-showcase label="Interactive">
        <eon-button value="Show" onclick="document.querySelector('#textDialog').open()"></eon-button>
        <eon-dialog id="textDialog" class="d-dialog" heading="Interactive dialog" blur="true" closable="true" maximize="true"
          minimize="true" resize="true" drag="true" default-style="false">
          <eon-section type="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip
              ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum
              dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui
              officia deserunt
              mollit anim id est laborum.
              <br>
              <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco
              laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident,
              sunt in culpa qui
              officia deserunt mollit anim id est laborum.
              <br>
              <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore
              et dolore magna aliqua.
              <br>
            </p>
          </eon-section>
          <eon-section type="footer" location="right">
            <eon-button class="d-right-margin" value="Cancel" design="flat" onclick="document.querySelector('#textDialog').close()">
            </eon-button>
          </eon-section>
        </eon-dialog>
      </doc-showcase>
      <doc-showcase label="Modal">
        <eon-button value="Show" onclick="document.querySelector('#loginDialog').open()">
        </eon-button>
        <eon-dialog id="loginDialog" modal="true" blur="true" resize="true" heading="Login" default-style="false">
          <eon-section type="content">
            <eon-form class="d-dialog-form" action="#" method="get">
              <eon-text name="userName" inline="false" placeholder="User name" label="User name"></eon-text>
              <eon-text name="userPass" inline="false" type="Password" placeholder="Password" label="Password"></eon-text>
              <eon-button class="d-top-margin" type="submit" value="Sign in" expand="full" design="flat"></eon-button>
            </eon-form>
          </eon-section>
        </eon-dialog>
      </doc-showcase>
    </div>
    <div style="height: 350px;"></div>
  </template>
  <template type="js">
    eon.onReady(function(){
      document.querySelector("#textDialog").open();
    });
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*

[Grid]<>
^[eon-grid API](#!version=latest&mode=api&file=ui%2Feon-grid%2Feon-grid.html)


Also known as `table`, displays a large number of data using rows and columns.

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.import([
        'framework/doc-eon/eon/ui/eon-grid',
        'framework/doc-eon/custom/doc-playground/doc-showcase'
      ]);
    </script>
  </template>
  <template type="html-body">
    <doc-showcase label="Scrollable Grid">
      <eon-grid footer="true" entries-count="false" row-min-height="80" column-min-width="200" columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:394px" page-size="8" autofit="false">
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
<doc-playground label="Autofit" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.import([
        'framework/doc-eon/eon/ui/eon-grid',
        'framework/doc-eon/custom/doc-playground/doc-showcase'
      ]);
    </script>
  </template>
  <template type="html-body">
    <doc-showcase label='Smaller Space'>
      <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80"     column-min-width="200" autofit="true" columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:315px">
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
      <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80"     column-min-width="200" autofit="true" columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:580px">
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
^[eon-gutter API](#!version=latest&mode=api&file=ui%2Feon-gutter%2Feon-gutter.html)


The gutter element is a container with the ability to separate its content in two sections divided with a draggable splitter, providing a flexible manipulation over the size of the sections and displaying. This kind of components is frequently used on code editor programs.

Gutter sections can be collapsible for dynamic behavior. On the contrary, the gutter provides other properties like `allowDrag` to reflect a static content layout.

*(
<doc-playground label="Horizontal Gutter" format="true" html="true" js="true" css="true" selector="body" format="true">
 <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
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
  </template>
  <template type="html-body">
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
<doc-playground label="Nested Gutter" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
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
      body{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
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
  </template>
  <template type="html-body">
    <doc-showcase>
      <eon-gutter type="vertical" collapsible="true">
        <eon-section>
          <eon-gutter collapsible="true">
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
^[eon-headerpanel API](#!version=latest&mode=api&file=ui%2Feon-headerpanel%2Feon-headerpanel.html)


The Headerpanel element works as a simple container but provides a bunch of properties to simulate a card layout with a title header, action and remove buttons and scrollable content.

*(
<doc-playground label="Flexible Behavior" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
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
  </template>
  <template type="html-body">
    <doc-showcase label="Header Panel">
      <eon-headerpanel header="static" header-content="Squares"  class="headerpanel" default-style="false">
      <div class="headerpanel-square blue"></div>
        <div class="headerpanel-square blue"></div>
        <div class="headerpanel-square blue"></div>
        <div class="headerpanel-square blue"></div>
      </eon-headerpanel>
    </doc-showcase>
    <doc-showcase label="Growing Header">
      <eon-headerpanel id="growing-headerpanel" default-style="false" header="grow" class="headerpanel" header-content="More squares" action-button="changeSquaresColor('growing-headerpanel')" close-button="none" close-button-class="d-black-close">
        <div class="headerpanel-square red"></div>
        <div class="headerpanel-square red"></div>
        <div class="headerpanel-square red"></div>
        <div class="headerpanel-square red"></div>
      </eon-headerpanel>
    </doc-showcase>
    <doc-showcase label="Simple Panel">
      <eon-headerpanel class="headerpanel" default-style="false">
      </eon-headerpanel>
    </doc-showcase>
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
^[eon-panel API](#!version=latest&mode=api&file=ui%2Feon-panel%2Feon-panel.html)


Panel is the basic container element. It has no associated style so it is completely customizable in terms of layout. 

You can use it as a part of a flex based layout.

*(
<doc-playground label="Simple Panels" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
      eon.themeSchema = {
        claro: ["eon-panel"]
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.import([
        'framework/doc-eon/eon/ui/eon-button',
        'framework/doc-eon/eon/ui/eon-panel',
        'framework/doc-eon/custom/doc-playground/doc-showcase'
      ]);
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
      }
    </style>
  </template>
  <template type="html-body">
    <doc-showcase label="Flex Layout">
      <eon-panel class="panel" fill="false" allow-scroll="false">
        <eon-panel class="panel-children" fill="false" allow-scroll="false">
          <eon-panel class="panel-children mid-width black eon-boxshadow1 animated" content-class="panel" fill="false"
            allow-scroll="false"></eon-panel>
          <eon-panel class="panel-children mid-width grey" fill="false" allow-scroll="false">
            <eon-panel class="panel-children mid-width mid-height blue eon-boxshadow1 animated" fill="false"
              allow-scroll="false"></eon-panel>
            <eon-panel class="panel-children mid-width mid-height blue eon-boxshadow1 animated" fill="false"
              allow-scroll="false"></eon-panel>
          </eon-panel>
        </eon-panel>
        <eon-panel class="panel-children row-reverse" fill="false" allow-scroll="false">
          <eon-panel class="panel-children mid-width red eon-boxshadow1 animated" fill="false" allow-scroll="false"></eon-panel>
          <eon-panel class="panel-children mid-width grey" fill="false" allow-scroll="false">
            <eon-panel class="panel-children mid-width mid-height blue eon-boxshadow1 animated" fill="false"
              allow-scroll="false"></eon-panel>
            <eon-panel class="panel-children mid-width mid-height blue eon-boxshadow1 animated" fill="false"
              allow-scroll="false"></eon-panel>
          </eon-panel>
        </eon-panel>
      </eon-panel>
    </doc-showcase>
  </template>
  <template type="css">
    eon-panel {
      transition: transform .2s, background-color .2s;
      backface-visibility: hidden;
      transform: translateZ(0);
    }
    eon-panel.animated:hover {
      transform: translateZ(0) scale(.96);
      box-shadow: none;
      cursor: pointer;
    }
    .panel {
      display: flex;
      flex-direction: column;
      height: 400px;
      max-width: 400px;
      width: 400px;
      overflow: hidden;
    }
    .panel-children {
      display: flex;
      height: calc(100% - 10px);
      width: 100%;
      overflow: hidden;
    }

    .row-reverse {
      flex-direction: row-reverse;
    }
    .mid-width {
      width: calc(50% - 5px);
    }
    .mid-height {
      height: calc(50% - 5px);
    }

    .grey {
      background-color: #f5f5f5;
    }
    .blue {
      background-color: #7296bb;
    }
    .red {
      background-color: #b36a6a;
    }
    .brown {
      background-color: #bb9772;
    }
    .black {
      background-color: #696969;
    }
  </template>
  <template type="js">
    /* ** Bug on this doc version
    eon.onReady(function () {
      var panels = $("eon-panel");
      var colors = ["#b74747", "#696969", "#8c47b7", "#bb9772", "#b36a6a", "#7296bb", "#76bb72"];
      
      for (var i in panels) {
        var panel = panels[i];
        console.log(panel)
        if (panel.classList && panel.classList.contains("eon-boxshadow1")) {
          panel.addEventListener("click", function (e) {
            var color = Math.floor((Math.random() * 6) + 1);
            this.style.backgroundColor = colors[color];
          }, false);
        }
      }
    });*/
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*

## Header panel
Panel allows you a way to add a simple title header to your panel that reacts to a content scroll 
triggering.


*(
<doc-playground label="Header Panels" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
       eon.themeSchema = {
        claro: ["eon-panel"]
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.import([
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
      }
    </style>
  </template>
  <template type="html-body">
    <doc-showcase label="Simple Header">
      <eon-panel default-style="false" class="header-panel" fill="false" 
          scroll-fill="true" >
        <eon-section type="header">
          <span>Squares</span>
        </eon-section>
        <eon-section type="content">
          <div class="header-panel-square blue"></div>
          <div class="header-panel-square blue"></div>
          <div class="header-panel-square blue"></div>
          <div class="header-panel-square blue"></div>
        </eon-section>
      </eon-panel>
    </doc-showcase>
    <doc-showcase label="Growing Header">
      <eon-panel default-style="false" class="header-panel" fill="false" 
          scroll-fill="true" >
        <eon-section type="header" grow="true">
          <span>Squares</span>
        </eon-section>
        <eon-section type="content">
          <div class="header-panel-square brown"></div>
          <div class="header-panel-square brown"></div>
          <div class="header-panel-square brown"></div>
          <div class="header-panel-square brown"></div>
        </eon-section>
      </eon-panel>
    </doc-showcase>
  </template>
  <template type="css">
    .header-panel {
      height: 220px;
      width: 200px;
    }
    .header-panel-square {
      width: 100%;
      height: 100px;
      margin-top: 12px;
      transition: all .2s;
    }
    .brown {
      background-color: #bb9772;
    }
    .blue {
      background-color: #7296bb;
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

## Remote functionality
Panel provides a huge control over its content elements rendering, allowing on demand content or partial content loading.

*(
<doc-playground label="Remote content" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
       eon.themeSchema = {
        claro: ["eon-panel"]
      }
    </script>
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
  </template>
  <template type="html-body">
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

[Tabs]<>
^[eon-tabs API](#!version=latest&mode=api&file=ui%2Feon-panel%2Feon-panel.html)

Meant to swap between different panels easily with a tabs base wrapper, this tabs have multiple options and features to fulfill the most common needs.

*(
<doc-playground label="Common usage" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.import([
        'framework/doc-eon/eon/ui/eon-tabs',
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
  </template>
  <template type="html-body">
    <doc-showcase label="Closable and Draggable">
      <eon-tabs class="d-tabs" dragging="true" closable="true">
        <eon-panel default-style="false" name="Help" tab-title="Blue">
          <div class="d-tabs-content blue"></div>
        </eon-panel>
        <eon-panel default-style="false" name="serverStart" tab-title="Green">
          <div class="d-tabs-content green"></div>
        </eon-panel>
        <eon-panel default-style="false" name="build" tab-title="Red">
          <div class="d-tabs-content red"></div>
        </eon-panel>
      </eon-tabs>
    </doc-showcase>
  </template>
  <template type="css">
    /* Tabs custom style */
      .d-tabs {
        height: 330px;
        width: 100%;
        padding: 0;
        -webkit-box-shadow: 0px 0px 10px #d8d8d8;
        -moz-box-shadow: 0px 0px 10px #d8d8d8;
        box-shadow: 0px 0px 10px #d8d8d8;
      }

      .d-tabs-content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .blue {
        background-color: #7296bb !important;
      }

      .green {
        background-color: #76bb72 !important;
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

[Scroll]<>
^[eon-scroll API](#!version=latest&mode=api&file=ui%2Feon-panel%2Feon-panel.html)


Custom scrollbar with multiple options to have different behaviors from the native one.

*(
<doc-playground label="Common usage" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.import([
        'framework/doc-eon/eon/ui/eon-scroll',
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
      .doc-showcase-content {
        height : 500px;
      }
      @media (max-width: 430px) {
        doc-showcase {
          width: calc(100% - 40px);
        }
      }
    </style>
  </template>
  <template type="html-body">
    <doc-showcase label="Auto hide">
      <eon-scroll fill="true" arrow-scrolls="true" rail-scrolls="true">
      <div style="width: 100%; color: #d3d3d3;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et placerat nulla, at suscipit lorem. Nulla ac elementum quam, rhoncus interdum quam. Morbi volutpat mauris eu lectus consequat sollicitudin. Curabitur eu odio maximus, consectetur quam vitae, vestibulum erat. Cras id rutrum ligula. Vestibulum viverra libero dui, non elementum erat porttitor ullamcorper. Donec euismod fringilla arcu, quis lacinia urna volutpat id. Quisque eget pellentesque arcu, sit amet blandit nisi. Donec eu maximus ex, at elementum est. Etiam consequat vestibulum justo, facilisis aliquet nisi sodales nec. Donec rutrum pulvinar justo, nec pharetra felis fringilla ac. Aliquam posuere gravida erat et tristique. In congue felis sit amet suscipit pharetra. Vestibulum volutpat non diam imperdiet sodales. Donec vitae tempor turpis.<br><br>

Ut ornare rhoncus volutpat. Nulla facilisi. Etiam eget rhoncus libero. Duis nec fermentum mauris. Vestibulum sed finibus nulla, eu accumsan turpis. Vivamus vel dui blandit, cursus libero id, pellentesque urna. Fusce venenatis eleifend ipsum. Etiam ornare consectetur odio. Nunc blandit ac est nec suscipit. Donec ac enim lacus. Nullam ante mi, vestibulum non enim hendrerit, maximus tempus orci. Cras vestibulum mauris nunc, nec rutrum ante convallis id. Sed porta nulla eu egestas ornare. Fusce ligula sapien, scelerisque vel suscipit sit amet, tincidunt id metus. Etiam malesuada dignissim libero.<br><br>

Morbi tempor magna nunc, quis pellentesque sem tristique ut. Quisque nec nunc congue, aliquet massa vitae, pharetra metus. Nulla leo neque, efficitur sed congue vitae, ultricies sed nisi. Morbi at risus id erat egestas lacinia vitae vel diam. In at nisi urna. Nunc dapibus tincidunt suscipit. Donec aliquam placerat justo eget dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer et ligula tincidunt, efficitur eros auctor, interdum sem.<br><br>

Pellentesque aliquam tellus vitae velit fringilla, sed luctus metus rutrum. Curabitur nibh urna, facilisis sit amet augue sit amet, ullamcorper pretium turpis. Donec nec justo ac erat porttitor fringilla vitae quis eros. Nunc sapien justo, lobortis eget libero id, pretium aliquam urna. Vivamus lobortis, odio finibus luctus faucibus, quam ligula pellentesque ex, vel rutrum mauris justo vitae lectus. Duis diam purus, mattis et erat vitae, congue dignissim tortor. Ut id nunc interdum, semper tellus non, ornare orci.<br><br>

Fusce porta a mauris in porta. Nam consectetur laoreet est at pretium. Nam et dapibus dui. Aenean quis feugiat mauris, sit amet fringilla nunc. Aenean consequat tempus ultricies. Vivamus a ipsum sit amet massa pellentesque tristique accumsan ac nisl. Praesent facilisis ultricies mi nec interdum. Nullam sem ante, pharetra ac fringilla nec, ornare vel est. Sed diam velit, mattis aliquam eros hendrerit, posuere fermentum ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat rhoncus ex, ac rhoncus nibh porta eu. Quisque congue elit ac neque fringilla, a aliquet lorem laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla auctor blandit augue id tempus. Nulla vel lobortis lectus, at volutpat nisl. Donec quis mauris diam.<br><br>

Cras sed mollis dui. Vivamus vitae risus nulla. Quisque at est mattis, aliquet quam vel, sodales augue. Vivamus eget velit consectetur, feugiat urna id, convallis dui. Proin id consectetur felis, quis cursus augue. Donec ac ex scelerisque, luctus ante a, tempus neque. Sed luctus velit non sagittis egestas. Aliquam neque risus, tincidunt non quam sit amet, feugiat rutrum orci. Donec id dolor lectus. Sed accumsan, mauris quis finibus laoreet, nulla lacus ultricies nunc, vitae auctor tellus velit in mi. Mauris quis tempor lacus. Morbi molestie ligula id dui congue, eu sagittis enim placerat.<br><br>

Vestibulum hendrerit ligula erat, at eleifend arcu scelerisque et. Vestibulum volutpat urna sit amet ultricies consectetur. Integer consectetur scelerisque urna, suscipit auctor odio congue in. Etiam sagittis maximus condimentum. Quisque eget ligula faucibus mauris convallis consectetur. Mauris ullamcorper nisi id malesuada tincidunt. Mauris lacinia dui sed ullamcorper pulvinar. Quisque eget placerat massa. Ut mattis sem nunc, nec iaculis massa vulputate a. Vivamus ornare finibus eros vitae tincidunt. In et luctus lacus. Cras malesuada fermentum mi sed pretium. Nulla lacinia rutrum odio. Suspendisse suscipit nec magna non lacinia. In hac habitasse platea dictumst. Ut ac consectetur turpis, eu finibus ligula.<br><br>

Morbi consectetur hendrerit mauris non sodales. Praesent vitae viverra arcu, a porta enim. Nunc sed neque imperdiet, commodo massa ac, condimentum massa. Curabitur congue eros a dui lobortis dignissim. Proin nisi nunc, volutpat quis sem vitae, faucibus dapibus lectus. Suspendisse potenti. Sed ex leo, suscipit eget tempor a, vehicula vel dolor. Morbi tristique auctor ultrices. Quisque ornare quam in risus bibendum molestie sit amet sed lacus. Pellentesque a ultricies diam, vitae tincidunt sapien.<br><br>

Cras nulla lacus, sodales eget mollis vitae, vulputate quis tortor. Etiam non nibh at lectus consectetur blandit. Nulla a sapien fermentum elit vestibulum dictum vitae nec leo. Duis sodales, enim nec bibendum pretium, neque ligula lacinia est, cursus condimentum ligula mi vitae enim. Phasellus sollicitudin at enim sollicitudin convallis. Aliquam leo risus, blandit sed dui a, maximus mollis lorem. Praesent aliquet at eros a dictum. Nunc pulvinar dui vitae tempus suscipit. Suspendisse tempor in tellus at commodo. Sed quis molestie lectus, id lacinia mi. Donec justo nulla, lobortis sed massa vel, vulputate consectetur massa. Cras egestas varius lectus, sed ornare lacus. Mauris at sollicitudin metus, id blandit libero. Suspendisse vulputate sodales urna eu scelerisque. In bibendum mi sed nunc cursus efficitur. Duis lobortis vulputate nunc a posuere.<br><br>

Mauris vel pulvinar mi. Nullam eu facilisis nibh. Nulla at leo vel velit cursus lacinia vitae eleifend justo. In sed quam vel felis faucibus condimentum id a neque. Donec nibh lorem, facilisis congue mollis ut, ultricies mattis libero. Donec viverra egestas iaculis. Vivamus gravida mi id accumsan pharetra.<br><br>
      </div>
      </eon-scroll>
    </doc-showcase>
  </template>
  <template type="css">
  </template>
  <template type="js">
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*
