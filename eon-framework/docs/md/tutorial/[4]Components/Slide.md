# Slide

## Introduction

The slide element is designed to work inside a [eon-swiper](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FSwiper.md) as the main structure item, so appended on any other element will do nothing different from a standard HTML element. 

## Declarative usage

Declare the eon-slide as any other HTML element:

``` [html]
<eon-swiper>
  <eon-slide>
      <h1> title </h1>
      <div> content </div>
  </eon-slide>
</eon-swiper>
```

## Programmatic usage
``` [javascript]
eon.ready(function () {

  // Create eon-slide
  var slide = document.createElement("eon-slide");
  var swiper = document.createElement("eon-swiper");

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
<eon-swiper type="gallery">
  <eon-slide image ="remote/source/image.png"></eon-slide>
  <eon-slide image ="remote/source/image2.png"></eon-slide>
</eon-swiper>
```