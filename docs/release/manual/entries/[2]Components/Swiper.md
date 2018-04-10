# Swiper

## Introduction

This element is a combination of the well known slider and image gallery components. It is supported on any device and only needs a single configuration to work on each one, without compromising its flexible behaviour and options.

## Declarative usage

Swiper needs the collaboration of another vComet element to work correctly, the slide element:

``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-swiper.html");
    vComet.import("/vComet/ui/vc-slide.html");
  </script>
<head>
```

Declare swiper the same way you declare any other HTML element:

``` [html]
<vc-swiper>
    <!-- My slides -->
    <vc-slide> Any content </vc-slide>
    <vc-slide> Any content </vc-slide>
</vc-swiper>
```

## Programmatic usage

``` [javascript]
vcomet.ready(function () {

  // Create vc-swiper
  var swiper = document.createElement("vc-swiper");

  // Create some slides
  var slide1 = document.createElement("vc-slide");
  var slide2 = document.createElement("vc-slide");
  swiper.appendChild(slide1);  
  swiper.appendChild(slide2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(swiper);

});
```

## Examples
### View slider

``` [html]
<vc-swiper direction="vertical">
    <!-- My slides -->
    <vc-slide> view 1 </vc-slide>
    <vc-slide> view 2 </vc-slide>
</vc-swiper>
```

### Image gallery

``` [html]
<vc-swiper type="gallery">
    <!-- My slides -->
    <vc-slide image="remote/source/image.png"> image 1 </vc-slide>
    <vc-slide image="remote/source/image2.png"> image 2 </vc-slide>
</vc-swiper>
```

### Nested swiper elements

``` [html]
<vc-swiper external-slide="true">
    <!-- Main view -->
    <vc-slide> 
      <h1> Swiper gallery </h1>
      <!-- Gallery -->
      <vc-swiper id="gallery" type="gallery" direction="vertical">
        <vc-slide image="remote/source/image.png"> </vc-slide>
        <vc-slide image="remote/source/image2.png"> </vc-slide>
      </vc-swiper>
    </vc-slide>
    <!-- Secondary view -->
    <vc-slide>
      <div> content </div>
      <div> content 2 </div>
    </vc-slide>
</vc-swiper>
```

### TODO - Lazy loading