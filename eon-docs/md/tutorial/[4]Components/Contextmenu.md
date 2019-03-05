# Contextmenu

This component is the typical menu that opens when do right click on an element, opening the options that can be done on the element.

*(
<doc-playground label="Regular Contextmenu" html="true" js="true" css="true" selector="body" format="true">
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
      body {
        display: flex;
        flex-wrap: wrap;
      }
    </style>
  </template>
  <template type="html-body">
    <doc-showcase>
      <eon-button id="myButton" label="click" eon-contextmenu="contextmenu1"> </eon-button>
      <eon-contextmenu id="contextmenu1" name="contextmenu1">
        <eon-item value="Copy"  onclick="console.log('Copy')"></eon-item>
        <eon-item value="Cut"  onclick="console.log('Cut')"></eon-item>
      </eon-contextmenu>
    </doc-showcase>
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*


