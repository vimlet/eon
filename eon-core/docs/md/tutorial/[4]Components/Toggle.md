# Toggle

## Introduction
This component is a simple on/off switch. It is also possible to use it as a form component.

To use it import eon-toggle in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-toggle.html");
  </script>
<head>
```

## Declarative usage
``` [html]
<eon-toggle label="Toggle" name"toggleOption" value="myToggle"></eon-toggle>
```

## Programmatic usage

``` [javascript]
eon.onReady(function () {
    // Create eon-toggle
    var myToggle = document.createElement("eon-toggle");

    // Set properties and append eon-toggle
    myToggle.label = "Toggle";
    myToggle.name = "toggleOption";
    myToggle.value = "myToggle";
    myToggle.checked = true;
    document.querySelector("body").appendChild(myToggle);
});
```

## Examples

### Enable dynamically
In this example the eon-toggle is disabled, but after a second it will be enabled.
``` [html]
<!-- Initially disabled toggle -->
<eon-toggle label="Toggle" disabled="true"></eon-toggle>
```

``` [javascript]
eon.onReady(function () {
    var myToggle = document.querySelector("eon-toggle");

    setTimeout(function () {
        // Enables the spinner
        myToggle.disabled = false;
    }, 1000);
});
```