# Checkbox
The eon-checkbox is a form component very easy to use. It can be used inside a eon-form component or inside an HTML form.


*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/eon/eon.js"></script>
      <script> 
        eon.import([
          "framework/eon/ui/eon-checkbox", "framework/custom/doc-playground/doc-showcase"
        ]);
      </script>
    </doc-head>
    <doc-body>
      <doc-showcase label="Standard">
        <eon-checkbox value='checkbox1' checked="true" name='checkboxOptions'></eon-checkbox>
        <eon-checkbox value='checkbox1' name='checkboxOptions'></eon-checkbox>
      </doc-showcase>
      <doc-showcase label="Disabled">
        <eon-checkbox label='Disabled checkbox' value='checkbox3' checked="true" name='checkboxOptions' disabled='true'></eon-checkbox>
        <eon-checkbox label='Disabled checkbox' value='checkbox4' name='checkboxOptions' disabled='true'></eon-checkbox>
      </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*