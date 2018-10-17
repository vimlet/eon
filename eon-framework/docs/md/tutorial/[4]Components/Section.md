# Section

## Introduction

The section element is designed to work inside a [eon-dialog](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FDialog.md) and [eon-gutter](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FGutter.md). 

## Declarative usage

Declare the eon-section as any other HTML element:

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