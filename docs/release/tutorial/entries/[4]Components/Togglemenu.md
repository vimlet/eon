# Togglemenu

## Introduction
Container component that can be displayed and show its contents.

To use it import vc-togglemenu in the head of the HTML document:
``` [html]
<head>
    <script>
        vComet.import("/vComet/ui/vc-togglemenu.html");
    </script>
<head>
```

## Declarative usage
By default, vc-togglemenu is displayed downwards occupying the remaining space of the container, and if it has an element below it, it will push it downwards.
``` [html]
<vc-togglemenu heading="Togglemenu"></vc-togglemenu>
```

## Programmatic usage

``` [javascript]
vcomet.onReady(function () {
    // Create vc-togglemenu
    var myTogglemenu = document.createElement("vc-togglemenu");
    // Create vc-item
    var item1 = document.createElement("vc-item");
    var item2 = document.createElement("vc-item");

    // Set properties
    myTogglemenu.heading = "Togglemenu";
    item1.value = "Dynamic Item";
    item2.value = "Dynamic Item";

    // Append vc-togglemenu
    document.querySelector("body").appendChild(myTogglemenu);

    // Add items to togglemenu
    myTogglemenu.addItem(item1);
    myTogglemenu.addItem(item2);
});
```

## Examples

### Fit to the content
The height of vc-togglemenu can be adjusted to its content setting the attribute `ocuppy="fit"`. Another option of this component is when it is deployed does it overlapping the elements that it has below setting the attribute `deploy="overlap"`.

``` [html]
<vc-togglemenu heading="Togglemenu" ocuppy="fit" deploy="overlap"></vc-togglemenu>
```
