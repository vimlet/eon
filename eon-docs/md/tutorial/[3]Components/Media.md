
[Video]<>
The video component is an HTML5 `<video>` wrap. It provides an extra layer of compatibility and some capabilities to deal with the annoying browsers and devices unstandardized behavior (fullscreen mode, source types, auto-play functionality).

*(
<doc-playground label="Simple Video" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-video"]
        }
      </script>
      <script>
        eon.import([
        'framework/doc-eon/eon/ui/eon-video',
        'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
  </head>
  <body>
    <doc-showcase label='Snowy day'>
      <eon-video type="video/mp4" controls="true" src="video/snow.mp4" poster="img/snow.jpg" volume="0.5">
      </eon-video>
    </doc-showcase>
  </body>
  </template>
</doc-playground>
)*

[Swiper]<>
This element is a combination of the well known slider and image gallery components. It is supported on any device and only needs a single configuration to work on each one, without compromising its flexible behavior and options.

*(
<doc-playground label="Slider" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.theme = "claro";
        eon.themeSchema = {
          claro: ["eon-swiper"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-swiper',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ]);
      </script>
      <style>
        doc-showcase .doc-showcase-content {
          height: 350px;
        }
        
      </style>
  </head>
  <body>
    <doc-showcase label='Slider'>
      <eon-swiper pagination="true">
        <eon-swiper-slide class="blue"></eon-swiper-slide>
        <eon-swiper-slide class="red"></eon-swiper-slide>
        <eon-swiper-slide class="green"></eon-swiper-slide>
        <eon-swiper-slide class="yellow"></eon-swiper-slide>
      </eon-swiper>
    </doc-showcase>
  </body>
  </template>
   <template type="css">
   .blue {
      background-color: #7296bb !important;
    }

    .yellow {
      background-color: #bb9772;
    }

    .green {
      background-color: #76bb72 !important;
    }

    .red {
      background-color: #b36a6a;
    }
  </template>
</doc-playground>
)*





Swiper needs the collaboration of another eon element to work correctly, the [eon-swiper-slide]

