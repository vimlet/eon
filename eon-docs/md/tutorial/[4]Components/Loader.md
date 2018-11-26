# Loader

## Introduction

The loader element is a useful mask for your application processes and page loading as well. Its style, animation and functionality are completely customizable improving your application user experience.

## Declarative usage 

``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-loader.html");
  </script>
<head>
```

Declare loader the same way you declare any other HTML element:

``` [html]
<eon-loader></eon-loader>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-headerpanel
  var loader = document.createElement("eon-loader");  

  // Append wherever you need it
  document.querySelector("body").appendChild(loader);

  // Call animate function to start loader animation
  loader.aniamte(1);

});
```

## Examples
### Page loading simulator bar

``` [html]
<eon-loader duration="1000" effect="linear"></eon-loader>
```

``` [javascript]
eon.ready(function () {

  // Get eon-loader
  var loader = document.querySelector("eon-loader");  

  // Move forward loadFirst page loading state
  loader.aniamte(.20);

  // Some ajax request
   var xhr = new XMLHttpRequest();
    xhr.open("GET", "remote/source/data", true);
    xhr.onload = function (e) {

      // Page load advance
      loader.aniamte(.70, 200);
      setTimeout(function() {
        // Finish page load
        loader.animate(1, 100);
      }, 300);
  
    };
    // Execute request
    xhr.send();

});
```
### Progress bar

Despite there are two types of loader, the only difference between them is on their layout structure and styling, but both of them work the same way.

This example shows an application specific process progress which normally is represented with a progress indicator to keep the user noticed.

``` [html]
<eon-loader type="progress" duration="1000" effect="ease"></eon-loader>
```

``` [javascript]
eon.ready(function () {

  // Get eon-loader
  var progressBar = document.querySelector("eon-loader");  

  // Advance progress
  progressBar.animate(1, 2000);
  
});
```