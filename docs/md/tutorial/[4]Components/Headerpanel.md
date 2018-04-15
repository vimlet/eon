# Headerpanel

## Introduction

The Headerpanel element works as a simple container but provides a bunch of properties to simulate a card layout with a title header, action and remove buttons and scrollable content. It is an easy way of creating a ue extended visual component.

## Declarative usage 

``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-headerpanel.html");
  </script>
<head>
```

Declare headerpanel the same way you declare any other HTML element:

``` [html]
<vc-headerpanel>
    <!-- Content -->
    <div> Any content </div>
</vc-headerpanel>
```

## Programmatic usage

``` [javascript]
vcomet.ready(function () {

  // Create vc-headerpanel
  var headerpanel = document.createElement("vc-headerpanel");

  // Create some content
  var content = document.createElement("div");
  headerpanel.appendChild(content);  

  // Append wherever you need it
  document.querySelector("body").appendChild(headerpanel);

});
```

## Examples
### Growing header

``` [html]
<vc-headerpanel header="grow" header-content="Growing header">
    <div> content </div>
    <div> content </div>
</vc-headerpanel>
```

### Complex card layout

``` [html]
 <vc-headerpanel type="shadowed" header="grow" header-class="whiteHeader" close-button="true" action-button="actionFunction()" header-tall-height="130px"
 header-content="Card">
    <div> content </div>
    <div> content </div>
</vc-headerpanel>
```
