# Toggle

This component is a simple on/off switch. It works almost the same way as an eon-checkbox since the user can toggle between two `checked` boolean values.  

*(
<doc-playground label="Common Usage" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.theme = "claro";
        eon.import([
          "framework/doc-eon/eon/ui/eon-toggle", "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
    </doc-head>
    <doc-body>
    <doc-showcase label="Standard">
      <eon-toggle label='Toggle label' value='toggle2' name='toggleOptions'></eon-toggle>
    </doc-showcase>
    <doc-showcase label="Disabled">
      <eon-toggle label='Disabled label' value='toggle3' name='toggleOptions' disabled='true'></eon-toggle>
    </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*

It can be used as a specific state switcher which some logic blocks will depend on or as a form component as well.