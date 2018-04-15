# Contextmenu

## Introduction
This component is the typical menu that opens when do right click on an element, opening the options that can be done on the element.

To use it import vc-contextmenu in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-contextmenu.html");
  </script>
<head>
```

## Declarative usage
The vc-contextmenu created declaratively is composed by vc-item to add the different options. The attribute `value` of vc-item is equivalent to the name of the option.

To indicate that an element will have a vc-contextmenu associated with it, the attribute `vc-contextmenu` must be added with the name of vc-contextmenu

``` [html]
<vc-contextmenu name="myContextmenu">
  <vc-item value="Copy" icon='<i class="material-icons">content_copy</i>'></vc-item>
  <vc-item value="Cut" icon='<i class="material-icons">content_cut</i>'></vc-item>
</vc-contextmenu>

<!-- Trigger element-->
<vc-button value="Right click" vc-contextmenu="myContextmenu"></vc-button>
```

## Programmatic usage
To create vc-contextmenu programmatically also uses vc-item to add the options, and it will be added to the vc-contextmenu using 

``` [javascript]
vcomet.onReady(function () {
  // Create vc-contextmenu
  var myContextmenu = document.createElement("vc-contextmenu");
  // Create vc-item
  var item1 = document.createElement("vc-item");
  var item2 = document.createElement("vc-item");

  // Set property and append vc-contextmenu
  myContextmenu.name = "myContextmenu";
  document.querySelector("body").appendChild(myContextmenu);

  // Set properties of item1
  item1.value = "Copy";
  item1.icon = '<i class="material-icons">content_copy</i>';

  // Set properties of item2
  item2.value = "Cut";
  item2.icon = '<i class="material-icons">content_cut</i>';

  // Add items to vc-contextmenu
  myContextmenu.addItem(item1);
  myContextmenu.addItem(item2);
});
```
The trigger element:
``` [html]
<vc-button value="Right click" vc-contextmenu="myContextmenu"></vc-button>
```

## Examples

### Changes dynamically 

Declare the initial vc-contextmenu:
``` [html]
<vc-contextmenu id="myContextmenu" name="myContextmenu">
  <vc-item id="item2" value="Cut" icon='<i class="material-icons">content_cut</i>'></vc-item>
  <!-- When do clik to this element some changes will be made-->
  <vc-item id="item1" value="Copy" icon='<i class="material-icons">content_copy</i>' onclick="updateContent()"></vc-item>
</vc-contextmenu>

<vc-button value="Right click" vc-contextmenu="myContextmenu"></vc-button>
```

Add the dynamic functionality:
``` [javascript]
function updateContent() {
  var myContextmenu = document.queryselector("#myConextmenu");
  var item1  = myContextmenu.querySelector("#item1");
  var item2 = myContextmenu.querySelector("#item2");
  // Create a new vc-item
  var item3 = document.createElement("vc-item");

  item3.value = "Dynamic";
  item3.icon = '<i class="material-icons">star</i>';

  // Remove item1
  myContextmenu.removeItem(item1);

  // Replace item2 with item3
  myContextmenu.replaceItem(item3, item2);
}
```

Finally, only third Item will remain in the contextmenu.
