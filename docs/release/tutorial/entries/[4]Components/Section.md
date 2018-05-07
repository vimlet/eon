# Section

## Introduction

The section element is designed to work inside a [vc-gutter](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FGutter.md). 

## Declarative usage

Declare the vc-section as any other HTML element:

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