# Headerpanel

## Introduction

The Headerpanel element works as a simple container but provides a bunch of properties to simulate a card layout with a title header, action and remove buttons and scrollable content. It is an easy way of creating a ue extended visual component.

## Declarative usage 

``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-headerpanel.html");
  </script>
<head>
```

Declare headerpanel the same way you declare any other HTML element:

``` [html]
<eon-headerpanel>
    <!-- Content -->
    <div> Any content </div>
</eon-headerpanel>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-headerpanel
  var headerpanel = document.createElement("eon-headerpanel");

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
<eon-headerpanel header="grow" header-content="Growing header">
    <div> content </div>
    <div> content </div>
</eon-headerpanel>
```

### Complex card layout

``` [html]
 <eon-headerpanel type="shadowed" header="grow" header-class="whiteHeader" close-button="true" action-button="actionFunction()" header-tall-height="130px"
 header-content="Card">
    <div> content </div>
    <div> content </div>
</eon-headerpanel>
```
