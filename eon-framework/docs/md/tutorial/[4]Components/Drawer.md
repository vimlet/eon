# Drawer

## Introduction

The drawer element is a container not meant to be visible the whole time, we could say that its content is intended to be complementary to the main one. It has multiple uses but the one that describes it better is as an expandable menu.

## Declarative usage 

By default the drawer is designed to be relative to the HTML body element, and positioned on the left side:

``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-drawer.html");
  </script>
<head>
```
Declare the eon-drawer as any other HTML element:

``` [html]
<eon-drawer>
    <h1> My drawer </h1>
    <div> Item </div>
</eon-drawer>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-drawer
  var myDrawer = document.createElement("eon-drawer");

  // Create some content
  var title = document.createElement("h1");
  var item = document.createElement("div");
  item.innerHTML = "Drawer item 1";
  title.innerHTML = "My menu";
  myDrawer.appendChild(item);  
  myDrawer.appendChild(title);  

  // Append it wherever you need it
  document.querySelector("body").appendChild(myDrawer);

});
```

## Examples
### An awesome displaying

The displaying behaviour is completely customizable but the drawer has a smooth displaying in the first place:

``` [html]
<eon-drawer drag="false" closable="false">
    <h1> My static menu </h1>
    <div> Item </div>
</eon-drawer>
```

### Multiple drawers

Since the drawer can be displayed at any body position there are no reason to
integrate only one drawer element at the same time if the situation requires it:

``` [html]
<eon-drawer type="top">
    <h1> My top menu </h1>
    <div> item 1 </div>
</eon-drawer>
<eon-drawer type="right" hide="true">
    <h1> My hidden right menu </h1>
    <div> item 2 </div>
</eon-drawer>
<eon-drawer type="bottom">
    <h1> My bottom menu </h1>
    <div> item 3 </div>
</eon-drawer>
```

**Notice that right and bottom side drawers, as a consequence of the HTML standard behavior, force parent to scroll the content when they are hidden.**