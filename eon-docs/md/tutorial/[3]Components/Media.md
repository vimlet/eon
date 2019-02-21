
[Video]<>

The video component is an HTML5 `<video>` wrap. It provides an extra layer of compatibility and some capabilities to deal with the annoying browsers and devices unstandardized behavior (fullscreen mode, source types, auto-play functionality).

*(
<doc-playground label="Simple Video" html="true" js="true" css="true" selector="body">
  <template type="html">
    <head>
        <script src='framework/eon/eon.js'></script>
        <script>eon.import(['framework/eon/ui/eon-video','framework/custom/app-playground/app-showcase'])</script>
        <style>
          app-showcase .app-showcase-content {
              height: 420px;
              overflow: hidden;
          }
        </style>
    </head>
    <body>
<app-showcase title='Eon introduction'>
  <eon-video type="video/mp4" controls="true" src="video/snow.mp4" poster="img/snow.jpg" volume="0.5">
  </eon-video>
</eon-showcase>
    </body>
  </template>
</doc-playground>
)*

