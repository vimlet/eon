# Contextmenu

## Introduction
This component is the typical menu that opens when do right click on an element, opening the options that can be done on the element.

To use it import eon-contextmenu in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-contextmenu.html");
  </script>
<head>
```

## Declarative usage
The eon-contextmenu created declaratively is composed by eon-item to add the different options. The attribute `value` of eon-item is equivalent to the name of the option.

To indicate that an element will have a eon-contextmenu associated with it, the attribute `eon-contextmenu` must be added with the name of eon-contextmenu.

``` [html]
<eon-contextmenu name="myContextmenu">
  <eon-item value="Copy" icon='<i class="material-icons">content_copy</i>'></eon-item>
  <eon-item value="Cut" icon='<i class="material-icons">content_cut</i>'></eon-item>
</eon-contextmenu>

<!-- Trigger element-->
<eon-button value="Right click" eon-contextmenu="myContextmenu"></eon-button>
```

## Programmatic usage
To create eon-contextmenu programmatically also uses eon-item to add the options, and it will be added to the eon-contextmenu using.

``` [javascript]
eon.onReady(function () {
  // Create eon-contextmenu
  var myContextmenu = document.createElement("eon-contextmenu");
  // Create eon-item
  var item1 = document.createElement("eon-item");
  var item2 = document.createElement("eon-item");

  // Set property and append eon-contextmenu
  myContextmenu.name = "myContextmenu";
  document.querySelector("body").appendChild(myContextmenu);

  // Set properties of item1
  item1.value = "Copy";
  item1.icon = '<i class="material-icons">content_copy</i>';

  // Set properties of item2
  item2.value = "Cut";
  item2.icon = '<i class="material-icons">content_cut</i>';

  // Add items to eon-contextmenu
  myContextmenu.addItem(item1);
  myContextmenu.addItem(item2);
});
```
The trigger element:
``` [html]
<eon-button value="Right click" eon-contextmenu="myContextmenu"></eon-button>
```

## Examples

### Changes dynamically 
Declare the initial eon-contextmenu:
``` [html]
<eon-contextmenu id="myContextmenu" name="myContextmenu">
  <eon-item id="item2" value="Cut" icon='<i class="material-icons">content_cut</i>'></eon-item>
  <!-- When do clik to this element some changes will be made-->
  <eon-item id="item1" value="Copy" icon='<i class="material-icons">content_copy</i>' onclick="updateContent()"></eon-item>
</eon-contextmenu>

<eon-button value="Right click" eon-contextmenu="myContextmenu"></eon-button>
```

Add the dynamic functionality:
``` [javascript]
function updateContent() {
  var myContextmenu = document.queryselector("#myConextmenu");
  var item1  = myContextmenu.querySelector("#item1");
  var item2 = myContextmenu.querySelector("#item2");
  // Create a new eon-item
  var item3 = document.createElement("eon-item");

  item3.value = "Dynamic";
  item3.icon = '<i class="material-icons">star</i>';

  // Remove item1
  myContextmenu.removeItem(item1);

  // Replace item2 with item3
  myContextmenu.replaceItem(item3, item2);
}
```

Finally, only third Item will remain in the contextmenu.
