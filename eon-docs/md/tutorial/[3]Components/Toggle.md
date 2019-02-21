# Toggle

This component is a simple on/off switch. It works almost the same way as an eon-checkbox since the user can toggle between two `checked` boolean values.  

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/eon/eon.js"></script>
      <script> 
        eon.import([
          "framework/eon/ui/eon-toggle", "framework/custom/doc-playground/doc-showcase"
        ]);
      </script>
    </doc-head>
    <doc-body>
    <doc-showcase label="Uncheck">
      <eon-toggle label='Uncheck label' value='toggle2' name='toggleOptions'></eon-toggle>
    </doc-showcase>
    <doc-showcase label="Disabled">
      <eon-toggle label='Disabled label' value='toggle3' name='toggleOptions' disabled='true'></eon-toggle>
    </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*

It can be used as a specific state switcher which some logic blocks will depend on or as a form component as well.