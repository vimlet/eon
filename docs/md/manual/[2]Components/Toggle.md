# Toggle

## Introduction
This component is a simple on/off switch.

To use it import vc-toggle in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-toggle.html");
  </script>
<head>
```

## Declarative usage
``` [html]
<vc-toggle label="Toggle"></vc-toggle>
```

## Programmatic usage

``` [javascript]
vcomet.onReady(function () {
    // Create vc-toggle
    var myToggle = document.createElement("vc-toggle");

    // Set properties and append vc-toggle
    myToggle.label = "Toggle";
    myToggle.check = true;
    document.querySelector("body").appendChild(myToggle);
});
```

## Examples

### Enable dynamically
In this example the vc-toggle is disabled, but after a second it will be enabled.
``` [html]
<!-- Initially toggle disable -->
<vc-toggle label="Toggle" disable="true"></vc-toggle>
```

``` [javascript]
vcomet.onReady(function () {
    var myToggle = document.querySelector("vc-toggle");

    setTimeout(function () {
        // Enables the spinner
        myToggle.disable = false;
    }, 1000);
});
```