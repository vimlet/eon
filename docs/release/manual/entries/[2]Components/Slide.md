# Layout

## Introduction

The slide element is designed to work inside a swiper as the main structure item, so appended on any other element will do nothing different from a standard HTML element. 

## Declarative usage

``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-swiper.html");
    vComet.import("/vComet/ui/vc-slide.html");
  </script>
<head>
```
Declare slide as any other HTML element:

``` [html]
<vc-swiper>
  <vc-slide>
      <h1> title </h1>
      <div> content </div>
  </vc-slide>
</vc-swiper>
```

## Programmatic usage
``` [javascript]
vcomet.ready(function () {

  // Create vc-slide
  var slide = document.createElement("vc-slide");
  var swiper = document.createElement("vc-swiper");

  // Create some content
  var content = document.createElement("div");
  content.innerHTML = "Programmatic slide content";
  slide.appendChild(content);  

  // Append wherever you need it
  swiper.appendChild(slide);

});
```
## Examples
### Image gallery slide

``` [html]
<vc-swiper type="gallery">
  <vc-slide image ="remote/source/image.png"></vc-slide>
  <vc-slide image ="remote/source/image2.png"></vc-slide>
</vc-swiper>
```