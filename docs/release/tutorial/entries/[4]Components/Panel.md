# Panel

## Introduction

Panel the basic container element. It has no associated style so it is completely customizable in terms of layout. Provides a huge control over its content elements rendering, allowing on demand content or partial content loading.

A vc-panel can be placed inside any other layout container and, in the mean time, surround any html content also as a result of an Ajax request.

## Declarative usage 

First of all we import vc-panel on our HTML head section. In this example we are using the vComet import util:

``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-panel.html");
  </script>
<head>
```
Declare panel as any other HTML element:

``` [html]
<vc-panel>
    <h1> title </h1>
    <div> content </div>
</vc-panel>
```
## Programmatic usage
``` [javascript]
vcomet.ready(function () {

  // Create vc-panel
  var myPanel = document.createElement("vc-panel");

  // Create some content
  var myContent = document.createElement("div");
  myContent.innerHTML = "Programmatic panel content";
  myPanel.appendChild(myContent);  

  // Append wherever you need it and we are finished
  document.querySelector("body").appendChild(myPanel);

});
```

## Examples
### Importing remote content with HREF

Importing your vc-panel content from a remote source, improves your HTML document structure and code legibility as well as the rendering flow:

``` [html]
Remote HTML document:

<div>
    <h1> title </h1>
    <div> content </div>
    <script>
        alert("Scripts execution is provided!");
    </script>
</div>
```
Specify the content URL:

``` [html]
<vc-panel href="/some/remote/source/content.html">
  <!-- Imported content goes here -->
</vc-panel>
```

### Managing lazy loading

Sometimes our web application sections get bigger and have to load huge content which probably will not be ready in a few seconds providing a bad user experience. Panel lazy loading functionality ease the demand of data, managing our views correctly, allowing us to specify which content or partial content we want to load in the first place, and which should wait until user demands it.

``` [html]
<vc-panel>
    <!-- We use template tag to wrap lazy content -->
    <template>
       <!-- Lazy content -->
        <h1> title </h1>
        <div> content </div>
    </template>

    <h1> title 2</h1>
    <div> content 2</div>
</vc-panel>
```
All the elements not surrounded by the template tag will render normally. 

We render the lazy content whenever we need it:

``` [javascript]
vcomet.ready(function () {

    var panel = document.querySelector("vc-panel");

    panel.onReady(function() {
        // Render lazy content
        panel.render();
    });

});
```
Our resulting HTML:

``` [html]
<vc-panel>
  <h1> title </h1>
  <div> content </div>
    
  <h1> title 2 </h1>
  <div> content 2 </div>
</vc-panel>
```

For further implementation, you can use as many templates as you need to manage lazy content inside a single vc-panel.