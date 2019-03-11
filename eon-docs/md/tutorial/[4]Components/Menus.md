*[
  function changeTheme(playground, btn){
    var eon = playground._refs.iframe.contentWindow.eon;
    eon.theme = eon.theme == "claro" ? "noire" : "claro";
  }
]*
[Contextmenu]<>
^[eon-contextmenu API](#!version=latest&mode=api&file=ui%2Feon-contextmenu%2Feon-contextmenu.html)

This component is the typical menu that opens when right clicking on an element, showing the options that can be done on the element. 
On device mode, the menu appears when the user doing a long click.

*(
<doc-playground label="Regular Contextmenu" html="true" js="true" css="true" selector=".content" format="true">
  <template type="html-head">
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.cacheBusting = true;
      eon.import([
        'framework/doc-eon/eon/ui/eon-contextmenu',
        'framework/doc-eon/eon/ui/eon-button',
        'framework/doc-eon/custom/doc-playground/doc-showcase'
      ]);
    </script>
    <style>
      .content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }
      #deviceButton {
        display: none;
      }
    </style>
    <script type="text/javascript"> 
      eon.onReady(function () {
        var deskButton = $1("#deskButton");
        var deviceButton = $1("#deviceButton");
        if (navigator.userAgent.match(/Tablet|Android|iPhone|iPad|iPod/i)) {
          deviceButton.style.display = "inline-block";
          deskButton.style.display = "none";
          window.contextStatus = "device";
        } else {
          deskButton.style.display = "inline-block";
          deviceButton.style.display = "none";
          window.contextStatus = "desktop";
        }
        window.addEventListener("resize", function () {
            if (navigator.userAgent.match(/Tablet|Android|iPhone|iPad|iPod/i) && window.contextStatus == "desktop") {
              deviceButton.style.display = "inline-block";
              deskButton.style.display = "none";
              window.contextStatus = "device";
            } else if (!navigator.userAgent.match(/Tablet|Android|iPhone|iPad|iPod/i) && window.contextStatus == "device") {
              deskButton.style.display = "inline-block";
              deviceButton.style.display = "none";
              window.contextStatus = "desktop";
            }
          });
      });
    </script>
  </template>
  <template type="html-body">
    <div class="content">
      <doc-showcase>
        <eon-button id="deskButton" label="Right click" eon-contextmenu="contextmenu1"> </eon-button>
        <eon-button id="deviceButton" label="Long click" eon-contextmenu="contextmenu1"> </eon-button>
        <eon-contextmenu id="contextmenu1" name="contextmenu1">
          <eon-item value="Copy" onclick="document.querySelector('#contextmenu1').hide()"></eon-item>
          <eon-item value="Cut" onclick="document.querySelector('#contextmenu1').hide()"></eon-item>
        </eon-contextmenu>
      </doc-showcase>
    </div>
    <div style="height:50px;"></div>
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*

[Menu]<>
^[eon-menu API](#!version=latest&mode=api&file=ui%2Feon-menu%2Feon-menu.html)

*(
<doc-playground label="Regular Contextmenu" html="true" js="true" css="true" selector=".content" format="true">
  <template type="html-head">
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.cacheBusting = true;
      eon.import([
        'framework/doc-eon/eon/ui/eon-menu',
        'framework/doc-eon/custom/doc-playground/doc-showcase'
      ]);
    </script>
    <style>
    </style>
    <script type="text/javascript">
    </script>
  </template>
  <template type="html-body">
    <div class="content">
      <doc-showcase>
       <eon-menu class="d-menu" style="height: 50px;">
          <eon-item name="Home" label="Home" onclick="alert('test')"></eon-item>
          <eon-item name="Contact" label="Contact">
            <eon-item name="Email" label="Email"></eon-item>
            <eon-item name="Phone" label="Phone">
              <eon-item name="Personal" label="Personal"></eon-item>
              <eon-item name="Business" label="Business"></eon-item>
            </eon-item>
          </eon-item>
          <eon-item name="About" label="About" href="https://www.google.com/"></eon-item>
        </eon-menu>
      </doc-showcase>
    </div>
    <div style="height:50px;"></div>
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*


