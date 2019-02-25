
[Video]<>
The video component is an HTML5 `<video>` wrap. It provides an extra layer of compatibility and some capabilities to deal with the annoying browsers and devices unstandardized behavior (fullscreen mode, source types, auto-play functionality).

*(
<doc-playground label="Simple Video" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
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
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
      <eon-video type="video/mp4" controls="true" src="video/snow.mp4" poster="img/snow.jpg" volume="0.5">
      </eon-video>
    </doc-showcase>
  </doc-body>
  </template>
</doc-playground>
)*

[Swiper]<>
This element is a combination of the well known slider and image gallery components. It is supported on any device and only needs a single configuration to work on each one, without compromising its flexible behavior and options. The swiper needs the collaboration of another Eon element to work correctly, the `eon-swiper-slide`.


*(
<doc-playground label="Simple slider" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
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
        body {
          display: flex;
          flex-wrap: wrap;
        }
        doc-showcase .doc-showcase-content {
          height: 350px;
          width: 500px;
        }
        .doc-showcase-title {
            display: none;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
      <eon-swiper pagination="true">
        <eon-swiper-slide class="blue"></eon-swiper-slide>
        <eon-swiper-slide class="red"></eon-swiper-slide>
        <eon-swiper-slide class="green"></eon-swiper-slide>
        <eon-swiper-slide class="yellow"></eon-swiper-slide>
      </eon-swiper>
    </doc-showcase>
  </doc-body>
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


The swiper gallery type provides a full bunch of options to build the images layout the way you want, like the dynamic displayed paging node, navigation controllers, full-screen mode and many others.


*(
<doc-playground label="Gallery" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
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
        body {
          display: flex;
          flex-wrap: wrap;
        }
        doc-showcase .doc-showcase-content {
          height: 350px;
          width: 500px;
        }
        .doc-showcase-title {
            display: none;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
      <eon-swiper direction="horizontal" pagination="true" navigation="true" type="gallery"
        full-screen="true">
        <eon-swiper-slide image="img/view-5.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/view-2.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/view-6.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/view-4.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/view-1.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/view-5.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/view-2.jpeg"></eon-swiper-slide>
      </eon-swiper>
    </doc-showcase>
  </doc-body>
  </template>
</doc-playground>
)*

One can be assured that the swiper supports nested instances to build a more complex layout.




