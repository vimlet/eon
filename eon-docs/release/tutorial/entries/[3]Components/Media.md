
[Video]<>

The video component is an HTML5 `<video>` wrap. It provides an extra layer of compatibility and some capabilities to deal with the annoying browsers and devices unstandardized behavior (fullscreen mode, source types, auto-play functionality).

*(
<doc-playground label="Simple Video" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.theme = "claro";
        eon.themeSchema = {
          claro: ["eon-video"]
        }
      </script>
      <script>eon.import(['framework/doc-eon/eon/ui/eon-video','framework/doc-eon/custom/doc-playground/doc-showcase'])</script>
  </head>
  <body>
    <doc-showcase title='Snowy day'>
      <eon-video type="video/mp4" controls="true" src="video/snow.mp4" poster="img/snow.jpg" volume="0.5">
      </eon-video>
    </doc-showcase>
  </body>
  </template>
</doc-playground>
)*

