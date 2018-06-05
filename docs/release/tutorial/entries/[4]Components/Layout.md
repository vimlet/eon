# Layout

## Introduction

The vc-layout element works as a CSS 'flex' wrapper providing an easy way of displaying visual elements.

## Declarative usage

As well as the items inside a flex container includes style properties for adjusting their position themselves, the layout element works with the [vc-item](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FItem.md) element which includes similar positioning properties.

``` [html]
<head>
  <script>
    // Imports vc-layout element and its dependencies (vc-item)
    vcomet.import("/vcomet/ui/vc-layout.html");
  </script>
<head>
```
Declare layout as any other HTML element:

``` [html]
<vc-layout>
  <vc-item></vc-item>
  <vc-item></vc-item>
</vc-layout>
```

## Programmatic usage

``` [javascript]
vcomet.ready(function () {

  // Create vc-layout
  var layout = document.createElement("vc-layout");

  // Create some items
  var item = document.createElement("vc-item");
  var item2 = document.createElement("vc-item");
  layout.appendChild(item);  
  layout.appendChild(item2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(layout);

});
```

**Safari issues: row items using** `flex-wrap: wrap` **are not displayed correctly.**