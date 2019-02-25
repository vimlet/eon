# Gutter

## Introduction

The gutter element is a container with the ability to separate its content in two sections divided with a draggable splitter, providing a flexible manipulation over the sections size and displaying. This kind of components are frequently used on code editor programs.

*(
<doc-playground label="Simple Gutter" format="true" html="true" js="true" css="true" selector="body">
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
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase label='Vertical gutter'>
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

## Examples
### Collapsible sections

``` [html]
<!-- Horizontal gutter -->
<eon-gutter collapsible="true" splitterSize="10">
    <eon-section>
        <div> content </div>
        <div> content </div>
    </eon-section>
    <eon-section>
        <div> content 2</div>
        <div> content 2</div>
    </eon-section>
</eon-gutter>
```
Gutter sections can be collapsible for a dynamic and flexible behaviour. On the contrary, the gutter provides other properties like `allowDrag` to build a static content layout. 

### Nested gutters

``` [html]
<!-- Horizontal gutter -->
<eon-gutter collapsible="true">
    <eon-section>
        <!-- Vertical gutter -->
        <eon-gutter type="vertical">
            <eon-section>
                <div> content </div>
            </eon-section>
            <eon-section>
                <div> content 2</div>
            </eon-section>
        </eon-gutter>
    </eon-section>
    <eon-section>
        <div> content 3</div>
        <div> content 3</div>
    </eon-section>
</eon-gutter>
```

Nothing prevents you from declaring nested eon-gutter elements without losing customization.