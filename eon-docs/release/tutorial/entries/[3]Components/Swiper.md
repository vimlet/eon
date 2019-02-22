# Swiper

## Introduction

This element is a combination of the well known slider and image gallery components. It is supported on any device and only needs a single configuration to work on each one, without compromising its flexible behaviour and options.

## Declarative usage

Swiper needs the collaboration of another eon element to work correctly, the [eon-slide](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FSlide.md) element:

``` [html]
<head>
  <script>
    // Imports eon-swiper element and its dependencies (eon-slide)
    eon.import("/eon/ui/eon-swiper.html");
  </script>
<head>
```

Declare swiper the same way you declare any other HTML element:

``` [html]
<eon-swiper>
    <!-- My slides -->
    <eon-slide> Any content </eon-slide>
    <eon-slide> Any content </eon-slide>
</eon-swiper>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-swiper
  var swiper = document.createElement("eon-swiper");

  // Create some slides
  var slide1 = document.createElement("eon-slide");
  var slide2 = document.createElement("eon-slide");
  swiper.appendChild(slide1);  
  swiper.appendChild(slide2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(swiper);

});
```

## Examples
### View slider

``` [html]
<eon-swiper direction="vertical">
    <!-- My slides -->
    <eon-slide> view 1 </eon-slide>
    <eon-slide> view 2 </eon-slide>
</eon-swiper>
```

### Image gallery

``` [html]
<eon-swiper type="gallery">
    <!-- My slides -->
    <eon-slide image="remote/source/image.png"> image 1 </eon-slide>
    <eon-slide image="remote/source/image2.png"> image 2 </eon-slide>
</eon-swiper>
```

### Nested swipers

``` [html]
<eon-swiper external-slide="true">
    <!-- Main view -->
    <eon-slide> 
      <h1> Swiper gallery </h1>
      <!-- Gallery -->
      <eon-swiper id="gallery" type="gallery" direction="vertical">
        <eon-slide image="remote/source/image.png"> </eon-slide>
        <eon-slide image="remote/source/image2.png"> </eon-slide>
      </eon-swiper>
    </eon-slide>
    <!-- Secondary view -->
    <eon-slide>
      <div> content </div>
      <div> content 2 </div>
    </eon-slide>
</eon-swiper>
```

### TODO - Lazy loading