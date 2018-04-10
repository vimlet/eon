# Gutter

## Introduction

The gutter element is a container with the ability of separate its content in two sections separated with a draggable splitter providing a flexible manipulation over the sections size and displaying. This kind of components are frequently used on code editor testers.

## Declarative usage 

Gutter use vc-section elements to represent the content sections:

``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-gutter.html");
    vComet.import("/vComet/ui/vc-section.html");
  </script>
<head>
```

Declare gutter the same way you declare any other HTML element:

``` [html]
<vc-gutter>
    <!-- Sections -->
    <vc-section> section </vc-section>
    <vc-section> section </vc-section>
</vc-gutter>
```

## Programmatic usage

``` [javascript]
vcomet.ready(function () {

  // Create vc-gutter
  var gutter = document.createElement("vc-gutter");

  // Create some sections
  var section = document.createElement("vc-section");
  var section2 = document.createElement("vc-section");
  gutter.appendChild(section);  
  gutter.appendChild(section2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(gutter);

});
```

## Examples
### Collapsable sections

``` [html]
<vc-gutter collapsable="true">
    <vc-section>
        <div> content </div>
        <div> content </div>
    </vc-section>
    <vc-section>
        <div> content 2</div>
        <div> content 2</div>
    </vc-section>
</vc-gutter>
```

### Nested gutters

``` [html]
<!-- Horizontal gutter -->
<vc-gutter collapsable="true">
    <vc-section>
        <!-- Vertical gutter -->
        <vc-gutter type="vertical">
            <vc-section>
                <div> content </div>
            </vc-section>
            <vc-section>
                <div> content 2</div>
            </vc-section>
        </vc-gutter>
    </vc-section>
    <vc-section>
        <div> content 3</div>
        <div> content 3</div>
    </vc-section>
</vc-gutter>
```