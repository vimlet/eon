*[
  function changeTheme(playground, btn){
    var eon = playground._refs.iframe.contentWindow.eon;
    eon.theme = eon.theme == "claro" ? "noire" : "claro";
  }
]*
[Swiper]<>
^[eon-swiper API](#!version=latest&mode=api&file=ui%2Feon-swiper%2Feon-swiper.html)


This element is a combination of the well known slider and image gallery components. It is supported on any device and only needs a single configuration to work on each one, without compromising its flexible behavior and options. The swiper needs the collaboration of another Eon element to work correctly, the `eon-swiper-slide`.


*(
<doc-playground label="Simple Slider" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
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
        width: 100%;
      }
      doc-showcase .doc-showcase-content {
        height: 350px;
        width: 500px;
      }
      doc-showcase .doc-showcase-label {
        display: none !important;
      }
      @media (max-width: 630px) {
        doc-showcase,
        doc-showcase .doc-showcase-content{
          width: 100%
        }
      }
      @media (max-width: 480px) {
        doc-showcase .doc-showcase-content{
          height: 200px;
        }
      }
    </style>
  </template>
  <template type="html-body">
    <doc-showcase>
      <eon-swiper pagination="true">
        <eon-swiper-slide class="blue"></eon-swiper-slide>
        <eon-swiper-slide class="red"></eon-swiper-slide>
        <eon-swiper-slide class="green"></eon-swiper-slide>
        <eon-swiper-slide class="yellow"></eon-swiper-slide>
      </eon-swiper>
    </doc-showcase>
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
  <template type="footer">
     {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*


The swiper gallery type provides a full bunch of options to build the images layout the way you want, like the dynamic displayed paging node, navigation controllers, full-screen mode and many others.


*(
<doc-playground label="Gallery" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
    <script src='framework/doc-eon/eon/eon.js'></script>
    <script>
      eon.themeSchema = {
        claro: ["eon-swiper"]
      }
      eon.import([
        'framework/doc-eon/eon/ui/eon-swiper',
        'framework/doc-eon/custom/doc-playground/doc-showcase'
      ]);
    </script>
    <style>
      body {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }
      doc-showcase .doc-showcase-content {
        height: 350px;
        width: 500px;
      }
      doc-showcase .doc-showcase-label {
        display: none !important;
      }
      @media (max-width: 630px) {
        doc-showcase,
        doc-showcase .doc-showcase-content{
          width: 100%
        }
      }
      @media (max-width: 480px) {
        doc-showcase .doc-showcase-content{
          height: 200px;
        }
      }
    </style>
  </template>
  <template type="html-body">
    <doc-showcase>
      <eon-swiper direction="horizontal" pagination="true" navigation="true" type="gallery"
        full-screen="true">
        <eon-swiper-slide image="img/swiper/view-5.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/swiper/view-2.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/swiper/view-6.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/swiper/view-4.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/swiper/view-1.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/swiper/view-5.jpeg"></eon-swiper-slide>
        <eon-swiper-slide image="img/swiper/view-2.jpeg"></eon-swiper-slide>
      </eon-swiper>
    </doc-showcase>
  </template>
  <template type="footer">
     {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*

One can be assured that the swiper supports nested instances to build a more complex layout.


[Video]<>
^[eon-video API](#!version=latest&mode=api&file=ui%2Feon-video%2Feon-video.html)


The video component is an HTML5 `<video>` wrap. It provides an extra layer of compatibility and some capabilities to deal with the annoying browsers and devices unstandardized behavior (fullscreen mode, source types, auto-play functionality).

*(
<doc-playground label="Simple Video" format="true" html="true" js="true" css="true" selector="body" format="true">
  <template type="html-head">
    <script>
      var eon = {
        cacheBusting: true
      }
    </script>
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
  </template>
  <template type="html-body">
    <doc-showcase>
      <eon-video type="video/mp4" controls="true" src="video/snow.mp4" poster="img/video/snow.jpg" volume="0.5">
      </eon-video>
    </doc-showcase>
  </template>
  <template type="footer">
     {"button":{"action":"changeTheme", "icon":"theme"}}
  </template>
</doc-playground>
)*


