# Slider
Form component that allows selecting a value from a range of values by moving the slider thumb of the eon-slider. This can be horizontal or vertical and the value can be visible or not.

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src="framework/doc-eon/eon/eon.js"></script>
      <script> 
        eon.import([
          "framework/doc-eon/eon/ui/eon-slider", "framework/doc-eon/custom/doc-playground/doc-showcase"
        ]);
      </script>
      <style>
        doc-showcase {
          max-width: 500px;
        }
        doc-showcase eon-slider{
          width: auto !important;
        }
      </style>
    </doc-head>
    <doc-body>
      <doc-showcase label="Standard">
        <eon-slider display-visibility="true"></eon-slider>
      </doc-showcase>
      <doc-showcase label="Disabled">
        <eon-slider display-visibility="true" disabled="true"></eon-slider>
      </doc-showcase>
    </doc-body>
  </template>
</doc-playground>
)*