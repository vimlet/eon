[Gutter]<>
The gutter element is a container with the ability to separate its content in two sections divided with a draggable splitter, providing a flexible manipulation over the size of the sections and displaying. This kind of components is frequently used on code editor programs.

Gutter sections can be collapsible for dynamic behavior. On the contrary, the gutter provides other properties like allowDrag to reflect a static content layout.

*(
<doc-playground label="Vertical gutter" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-gutter"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-gutter',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
        doc-showcase {
           width: 100%;
        }
        doc-showcase .doc-showcase-content {
          height: 250px;
          width: 100%;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
      <eon-gutter type="horizontal" collapsible="true">
        <eon-section class="section">
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
        </eon-section>
        <eon-section>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
        </eon-section>
      </eon-gutter>
    </doc-showcase>
  </doc-body>
  </template>
   <template type="css">
      .gutter-box {
          height: 50px;
          width: 50px;
          min-width: 50px;
          margin: 8px;
          background: #76bb72;
      }
      .blue {
        background-color: #7296bb !important;
      }

      .red {
        background-color: #b36a6a;
      }
  </template>
</doc-playground>
)*


Nothing prevents you from declaring nested eon-gutter elements without losing customization.


*(
<doc-playground label="Nested gutter" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-gutter"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-gutter',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
        doc-showcase {
           width: 100%;
        }
        doc-showcase .doc-showcase-content {
          height: 350px;
          width: 100%;
        }
        .doc-showcase-title {
            display: none;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
    <eon-gutter type="vertical" collapsible="true">
        <eon-section>
          <eon-gutter collapsible="false">
            <eon-section class="section">
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
            </eon-section>
            <eon-section>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
            </eon-section>
          </eon-gutter>
        </eon-section>
        <eon-section>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
        </eon-section>
      </eon-gutter>
    </doc-showcase>
  </doc-body>
  </template>
   <template type="css">
      .gutter-box {
          height: 50px;
          width: 50px;
          min-width: 50px;
          margin: 8px;
          background: #76bb72;
      }
      .blue {
        background-color: #7296bb !important;
      }

      .orange {
        background-color: #bb9772;
      }
      .red {
        background-color: #b36a6a;
      }
  </template>
</doc-playground>
)*

