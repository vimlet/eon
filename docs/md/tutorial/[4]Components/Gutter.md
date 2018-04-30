# Gutter

## Introduction

The gutter element is a container with the ability to separate its content in two sections divided with a draggable splitter, providing a flexible manipulation over the sections size and displaying. This kind of components are frequently used on code editor programs.

## Declarative usage 

Gutter use the vc-section element to represent its content sections:

``` [html]
<head>
  <script>
    // Imports vc-gutter element and its dependencies (vc-section)
    vComet.import("/vComet/ui/vc-gutter.html");
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
<!-- Horizontal gutter -->
<vc-gutter collapsable="true" splitterSize="10">
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
Gutter sections can be collapsable for a dynamic and flexible behaviour. On the contrary, the gutter provides other properties like `allowDrag` to build a static content layout. 

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

Nothing prevents you from declaring nested vc-gutter elements without losing customization.