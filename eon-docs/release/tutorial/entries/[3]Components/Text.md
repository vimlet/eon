# Text
The text element is a component meant for typing and it has multiple uses depending on the type specified by the user (text , password and area). 

*(
<doc-playground label="Regular Text" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.theme = "claro";
        eon.import([
          "framework/doc-eon/eon/ui/eon-text", "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
      <style>
        .doc-showcase-content eon-text {
          margin: 0 0 20px 0;
        }
      </style>
    </doc-head>
    <doc-body>
      <doc-showcase>
        <eon-text label="Type" placeholder="Type here" inline="false" name="text" max-length="18" counter="true"></eon-text>
        <eon-text value="Initial value" inline="false" name="text" max-length="18"></eon-text>
        <eon-text value="Disabled" inline="false" name="disabled" disabled="true"></eon-text>
        <eon-text value="Readonly" inline="false" name="readonly" readonly="true""></eon-text>
      </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*


## Textarea type 
The area type text enables the user to write large amount of characters in multiple lines, for this example the counter was also enabled as well as an area-height were specified.

*(
<doc-playground label="Textarea" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.theme = "claro";
        eon.import([
          "framework/doc-eon/eon/ui/eon-text", "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
      <style>
        .doc-showcase-content eon-text {
          margin: 0 0 20px 0;
        }
      </style>
    </doc-head>
    <doc-body>
    <doc-showcase>
      <eon-text placeholder="Textarea" inline="false" name="description" type="area" label="Description" counter="true" area-height="100"></eon-text>
      <eon-text placeholder="Disabled Textarea" inline="false" name="disabled" type="area" area-height="100" disabled="true"></eon-text>
      <eon-text placeholder="Readonly Textarea" inline="false" name="readonly" type="area" area-height="100" readonly="true"></eon-text>
    </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*



## Password type 
The password text is pretty similar to the text type but it shows asterisks instead of the written text.

*(
<doc-playground label="Password" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.theme = "claro";
        eon.import([
          "framework/doc-eon/eon/ui/eon-text", "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
      <style>
        .doc-showcase-content eon-text {
          margin: 0 0 20px 0;
        }
      </style>
    </doc-head>
    <doc-body>
    <doc-showcase>
      <eon-text label="Password" default="password" inline="false" type="password"></eon-text>
      <eon-text label="Disabled" default="password" inline="false" type="password" disabled="true"></eon-text>
    </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*



