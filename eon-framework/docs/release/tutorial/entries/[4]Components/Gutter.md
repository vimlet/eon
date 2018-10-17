# Gutter

## Introduction

The gutter element is a container with the ability to separate its content in two sections divided with a draggable splitter, providing a flexible manipulation over the sections size and displaying. This kind of components are frequently used on code editor programs.

## Declarative usage 

Gutter use the [eon-section](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FSection.md) element to represent its content sections:

``` [html]
<head>
  <script>
    // Imports eon-gutter element and its dependencies (eon-section)
    eon.import("/eon/ui/eon-gutter.html");
  </script>
<head>
```

Declare gutter the same way you declare any other HTML element:

``` [html]
<eon-gutter>
    <!-- Sections -->
    <eon-section> section </eon-section>
    <eon-section> section </eon-section>
</eon-gutter>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-gutter
  var gutter = document.createElement("eon-gutter");

  // Create some sections
  var section = document.createElement("eon-section");
  var section2 = document.createElement("eon-section");
  gutter.appendChild(section);  
  gutter.appendChild(section2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(gutter);

});
```

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