# Spinner

## Introduction
This form component consists of an entry field for numerical values with `up` and `down` buttons. It is possible to set a minimum value and a maximum value using the properties of eon-spinner `min` and `max`. 

To use it import eon-spinner in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-spinner.html");
  </script>
<head>
```

## Declarative usage
``` [html]
<eon-spinner label="Spinner number" name="mySpinner"></eon-spinner>
```

## Programmatic usage

``` [javascript]
eon.onReady(function () {
  // Create eon-spinner
  var mySpinner = document.createElement("eon-spinner");

  // Set eon-spinner properties
  mySpinner.name = "mySpinner";
  mySpinner.label = "Spinner number";

  // Append eon-spinner where necessary
  document.querySelector("body").appendChild(mySpinner);
});
```

## Examples

### Enable dynamically
In this example, the eon-spinner is contained within a eon-form and is disabled, and after a second it will be enabled.
``` [html]
<!-- Initially disabled spinner -->
<eon-spinner label="Spinner number" name="mySpinner" disabled="true"></eon-spinner>
<eon-button type="submit" value="Submit"></eon-button>

```

``` [javascript]
eon.onReady(function () {
  var mySpinner = document.createElement("eon-spinner");

  setTimeout(function () {
    // Enables the spinner
    mySpinner.disabled = "false";
  }, 1000);
});
```