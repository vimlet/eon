# Layout

## Introduction

The eon-layout element works as a CSS 'flex' wrapper providing an easy way of displaying visual elements.

## Declarative usage

As well as the items inside a flex container includes style properties for adjusting their position themselves, the layout element works with the [eon-item](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FItem.md) element which includes similar positioning properties.

``` [html]
<head>
  <script>
    // Imports eon-layout element and its dependencies (eon-item)
    eon.import("/eon/ui/eon-layout.html");
  </script>
<head>
```
Declare layout as any other HTML element:

``` [html]
<eon-layout>
  <eon-item></eon-item>
  <eon-item></eon-item>
</eon-layout>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-layout
  var layout = document.createElement("eon-layout");

  // Create some items
  var item = document.createElement("eon-item");
  var item2 = document.createElement("eon-item");
  layout.appendChild(item);  
  layout.appendChild(item2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(layout);

});
```

**Safari issues: row items using** `flex-wrap: wrap` **are not displayed correctly.**