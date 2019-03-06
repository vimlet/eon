*[
  function changeTheme(playground, btn){
    var eon = playground._refs.iframe.contentWindow.eon;
    eon.theme = eon.theme == "claro" ? "noire" : "claro";
  }
]*
[Contextmenu]<>
^[eon-contextmenu API](#!version=latest&mode=api&file=ui%2Feon-contextmenu%2Feon-contextmenu.html)

This component is the typical menu that opens when do right click on an element, opening the options that can be done on the element.

*(
<doc-playground label="Regular Contextmenu" html="true" js="true" css="true" selector=".content" format="true">
  <template type="html-head">
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
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
    </style>
  </template>
  <template type="html-body">
    <div class="content">
      <doc-showcase>
        <eon-button id="myButton" label="click" eon-contextmenu="contextmenu1"> </eon-button>
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


