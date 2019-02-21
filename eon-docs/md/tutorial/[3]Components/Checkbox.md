# Checkbox
The checkbox element allows to select multiple options of . It can be used inside a eon-form component or inside an HTML form.


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
        <eon-checkbox label="Checkbox" value='checkbox1' checked="true" name='checkboxOptions'></eon-checkbox>
      </doc-showcase>
      <doc-showcase label="Disabled">
        <eon-checkbox label='Disabled checked' value='checkbox2' checked="true" name='checkboxOptions' disabled='true'></eon-checkbox>
      </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*