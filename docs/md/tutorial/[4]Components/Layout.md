# Layout

## Introduction

The layout element works as a CSS 'flex' wrapper providing an easy way of displaying visual elements.

## Declarative usage

As well as the items inside a flex container includes style properties for adjusting their position themselves, the layout element works with the vc-item element which includes similar positioning properties.

``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-layout.html");
    vComet.import("/vComet/ui/vc-item.html");
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

  // Create vc-swiper
  var layout = document.createElement("vc-layout");

  // Create some slides
  var item = document.createElement("vc-item");
  var item2 = document.createElement("vc-item");
  layout.appendChild(item);  
  layout.appendChild(item2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(layout);

});
```

## Examples