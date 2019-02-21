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
      <doc-showcase label="Button">
        <eon-toggle label='Uncheck toggle' value='toggle2' name='toggleOptions'></eon-toggle>
      </doc-showcase>
      <doc-showcase label="Button">
        <eon-toggle label='Disabled toggle' value='toggle3' name='toggleOptions' disabled='true'></eon-toggle>
      </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*

<app-playground vtitle="Common Usage" html ="<head><script src='framework/eon/eon.js'></script><script>eon.import(['framework/eon/ui/eon-toggle','framework/custom/app-playground/app-showcase']);</script></head><body><app-showcase title='Toggle'><eon-toggle class='d-top-margin' label='Uncheck toggle' value='toggle2' name='toggleOptions' id='option2'></eon-toggle></app-showcase><app-showcase title='Disabled'><eon-toggle class='d-top-margin' label='Disabled toggle' value='toggle3' name='toggleOptions' id='option3 'disabled='true'></eon-toggle></app-showcase></body>" js="function test(){alert('soy JS');}" css="#main{background-color:red; cursor:pointer;}" selector="body">
</app-playground>

It can be used as a specific state switcher which some logic blocks will depend on or as a form component as well.