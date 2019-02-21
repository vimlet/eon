# Togglemenu

## Introduction
Container component that can be displayed and show its contents.

To use it import eon-togglemenu in the head of the HTML document:
``` [html]
<head>
    <script>
        eon.import("/eon/ui/eon-togglemenu.html");
    </script>
<head>
```

## Declarative usage
By default, eon-togglemenu is displayed downwards occupying the remaining space of the container, and if it has an element below it, it will push it downwards.
``` [html]
<eon-togglemenu heading="Togglemenu"></eon-togglemenu>
```

## Programmatic usage

``` [javascript]
eon.onReady(function () {
    // Create eon-togglemenu
    var myTogglemenu = document.createElement("eon-togglemenu");
    // Create eon-item
    var item1 = document.createElement("eon-item");
    var item2 = document.createElement("eon-item");

    // Set properties
    myTogglemenu.heading = "Togglemenu";
    item1.value = "Dynamic Item";
    item2.value = "Dynamic Item";

    // Append eon-togglemenu
    document.querySelector("body").appendChild(myTogglemenu);

    // Add items to togglemenu
    myTogglemenu.addItem(item1);
    myTogglemenu.addItem(item2);
});
```

## Examples

### Fit to the content
The height of eon-togglemenu can be adjusted to its content setting the attribute `ocuppy="fit"`. Another option of this component is when it is deployed does it overlapping the elements that it has below setting the attribute `deploy="overlap"`.

``` [html]
<eon-togglemenu heading="Togglemenu" ocuppy="fit" deploy="overlap"></eon-togglemenu>
```
