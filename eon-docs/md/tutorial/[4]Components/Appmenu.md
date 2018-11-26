# Appmenu

## Introduction
It is a specific menu composed of apps. The button of the eon-appmenu that displays the container with the apps can be placed to the left, to the right or in the center with respect to the element that contains it.

To use it is necessary to import eon-appmenu in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-appmenu.html");
  </script>
<head>
```

## Declarative usage
The eon-appmenu created declaratively is composed by eon-item to add the different apps. The attribute `value` of eon-item is equivalent to the name of the app.

``` [html]
<eon-appmenu >
  <eon-item value="Mail" icon='<i class="material-icons">mail</i>'></eon-item>
</eon-appmenu>
```

## Programmatic usage
To create eon-appmenu programmatically also uses eon-item to add the apps, and it will be added to the eon-appmenu using `addItem` method.

``` [javascript]
eon.onReady(function () {
  // Create eon-appmenu
  var myAppmenu = document.createElement("eon-appmenu");
  // Create eon-item 
  var myItem = document.createElement("eon-item");

  // Append eon-appmenu where necessary
  document.querySelector("body").appendChild(myAppmenu);

  // Set the properties for the eon-item
  myItem.value = "Mail";
  myItem.icon = '<i class="material-icons">mail</i>';
  myItem.iconPosition = "bottom";

  // Add the app to eon-appmenu
  myAppmenu.addItem(myItem);
});
```

## Examples

### Changes dynamically
``` [html]
<eon-appmenu id="myAppmenu" >
  <eon-item id="item1" value="Mail" icon='<i class="material-icons">mail</i>' icon-position="top"></eon-item>
</eon-appmenu>
```

``` [javascript]
eon.onReady(function () {
  var myAppmenu = document.querySelector("#myAppmenu");
  var firstItem = document.querySelector("#item1");
  var secondItem = document.createElement("eon-item");
  var thirdItem = document.createElement("eon-item");

  // Set properties for secondItem
  secondItem.value = "Payment";
  secondItem.icon = '<i class="material-icons">payment</i>';
  
  // Set properties for thirdItem
  thirdItem.value = "Cloud";
  thirdItem.icon = '<i class="material-icons">cloud</i>';

  // When the appmenu is shown the functionality will be executed
  myAppmenu.onShow(function () {

    // Add secondItem to eon-appmenu
    myAppmenu.addItem(secondItem);

    // Remove firstItem from eon-appmenu
    myAppmenu.removeItem(firstItem);

    // Replace secondItem with thirdItem
    myAppmenu.removeItem(thirdItem, secondItem);
  });

});
```
Resulting HTML:
``` [html]
<eon-appmenu>
  <!-- The only eon-item that remains is the thirdItem -->
  <eon-item value="Cloud" icon='<i class="material-icons">cloud</i>'></eon-item>
</eon-appmenu>
```