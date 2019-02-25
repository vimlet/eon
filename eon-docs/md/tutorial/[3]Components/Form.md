# Form
This component deals with the data management of the different form elements.

*(
<doc-playground label="Common Usage" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.theme = "claro";
        eon.import([
          "framework/doc-eon/eon/ui/eon-text", 
          "framework/doc-eon/eon/ui/eon-form",
          "framework/doc-eon/eon/ui/eon-toggle", 
          "framework/doc-eon/eon/ui/eon-group", 
          "framework/doc-eon/eon/ui/eon-button",
          "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
      <style>
        doc-showcase {
          max-width: 300px;
        }
        .doc-showcase-content eon-text {
          margin: 0 0 20px 0;
        }
        .doc-showcase-content eon-group {
          margin: 0 0 20px 0;
        }
        .doc-showcase-content eon-toggle {
          margin: 0 0 20px 0;
        }
      </style>
    </doc-head>
    <doc-body>
    <doc-showcase label="Demo form">
        <eon-form action="#" method="get">
          <eon-text class="d-form-marginTop" inline="false" name="text" type="text" placeholder="Name and last name" label="Client name"
            max-length="18"></eon-text>
          <eon-group name="gender" class="d-form-marginTop" label="Gender">
            <eon-radio class="d-radio-radioSpacing" label="Female" value="female"></eon-radio>
            <eon-radio class="d-radio-radioSpacing" label="Male" value="male"></eon-radio>
          </eon-group>
          <eon-toggle class="d-form-marginTop" label="Accept policy" checked="true" value="toggle1" name="toggleOptions" id="option1">
          </eon-toggle>
          <eon-button class="margin" onclick="validate();" value="Schema Validation"> </eon-button>
        </eon-form>
    </doc-showcase>
    </doc-body>
  </template>
    <template type="js">
      function validate() {
        var form = document.querySelector("eon-form");
        var data = form.getData();
        form._validate(data);
      }
    </template>
</doc-playground>
)*

