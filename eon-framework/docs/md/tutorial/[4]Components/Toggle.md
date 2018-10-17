# Toggle

## Introduction
This component is a simple on/off switch. It is also possible to use it as a form component.

To use it import vc-toggle in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/vc-toggle.html");
  </script>
<head>
```

## Declarative usage
``` [html]
<vc-toggle label="Toggle" name"toggleOption" value="myToggle"></vc-toggle>
```

## Programmatic usage

``` [javascript]
eon.onReady(function () {
    // Create vc-toggle
    var myToggle = document.createElement("vc-toggle");

    // Set properties and append vc-toggle
    myToggle.label = "Toggle";
    myToggle.name = "toggleOption";
    myToggle.value = "myToggle";
    myToggle.checked = true;
    document.querySelector("body").appendChild(myToggle);
});
```

## Examples

### Enable dynamically
In this example the vc-toggle is disabled, but after a second it will be enabled.
``` [html]
<!-- Initially disabled toggle -->
<vc-toggle label="Toggle" disabled="true"></vc-toggle>
```

``` [javascript]
eon.onReady(function () {
    var myToggle = document.querySelector("vc-toggle");

    setTimeout(function () {
        // Enables the spinner
        myToggle.disabled = false;
    }, 1000);
});
```