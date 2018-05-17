# Appmenu

## Introduction
It is a specific menu composed of apps. The button of the vc-appmenu that displays the container with the apps can be placed to the left, to the right or in the center with respect to the element that contains it.

To use it is necessary to import vc-appmenu in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-appmenu.html");
  </script>
<head>
```

## Declarative usage
The vc-appmenu created declaratively is composed by vc-item to add the different apps. The attribute `value` of vc-item is equivalent to the name of the app.

``` [html]
<vc-appmenu >
  <vc-item value="Mail" icon='<i class="material-icons">mail</i>'></vc-item>
</vc-appmenu>
```

## Programmatic usage
To create vc-appmenu programmatically also uses vc-item to add the apps, and it will be added to the vc-appmenu using `addItem` method.

``` [javascript]
vcomet.onReady(function () {
  // Create vc-appmenu
  var myAppmenu = document.createElement("vc-appmenu");
  // Create vc-item 
  var myItem = document.createElement("vc-item");

  // Append vc-appmenu where necessary
  document.querySelector("body").appendChild(myAppmenu);

  // Set the properties for the vc-item
  myItem.value = "Mail";
  myItem.icon = '<i class="material-icons">mail</i>';
  myItem.iconPosition = "bottom";

  // Add the app to vc-appmenu
  myAppmenu.addItem(myItem);
});
```

## Examples

### Changes dynamically
``` [html]
<vc-appmenu id="myAppmenu" >
  <vc-item id="item1" value="Mail" icon='<i class="material-icons">mail</i>' icon-position="top"></vc-item>
</vc-appmenu>
```

``` [javascript]
vcomet.onReady(function () {
  var myAppmenu = document.querySelector("#myAppmenu");
  var firstItem = document.querySelector("#item1");
  var secondItem = document.createElement("vc-item");
  var thirdItem = document.createElement("vc-item");

  // Set properties for secondItem
  secondItem.value = "Payment";
  secondItem.icon = '<i class="material-icons">payment</i>';
  
  // Set properties for thirdItem
  thirdItem.value = "Cloud";
  thirdItem.icon = '<i class="material-icons">cloud</i>';

  // When the appmenu is shown the functionality will be executed
  myAppmenu.onShow(function () {

    // Add secondItem to vc-appmenu
    myAppmenu.addItem(secondItem);

    // Remove firstItem from vc-appmenu
    myAppmenu.removeItem(firstItem);

    // Replace secondItem with thirdItem
    myAppmenu.removeItem(thirdItem, secondItem);
  });

});
```
Resulting HTML:
``` [html]
<vc-appmenu>
  <!-- The only vc-item that remains is the thirdItem -->
  <vc-item value="Cloud" icon='<i class="material-icons">cloud</i>'></vc-item>
</vc-appmenu>
```