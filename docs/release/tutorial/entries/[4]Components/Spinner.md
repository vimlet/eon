# Spinner

## Introduction
This form component consists of an entry field for numerical values with `up` and `down` buttons. It is possible to set a minimum value and a maximum value using the properties of vc-spinner `min` and `max`. 

To use it import vc-spinner in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-spinner.html");
  </script>
<head>
```

## Declarative usage
``` [html]
<vc-spinner label="Spinner number" name="mySpinner"></vc-spinner>
```

## Programmatic usage

``` [javascript]
vcomet.onReady(function () {
  // Create vc-spinner
  var mySpinner = document.createElement("vc-spinner");

  // Set vc-spinner properties
  mySpinner.name = "mySpinner";
  mySpinner.label = "Spinner number";

  // Append vc-spinner where necessary
  document.querySelector("body").appendChild(mySpinner);
});
```

## Examples

### Enable dynamically
In this example, the vc-spinner is contained within a vc-form and is disabled, and after a second it will be enabled.
``` [html]
<!-- Initially disabled spinner -->
<vc-spinner label="Spinner number" name="mySpinner" disabled="true"></vc-spinner>
<vc-button type="submit" value="Submit"></vc-button>

```

``` [javascript]
vcomet.onReady(function () {
  var mySpinner = document.createElement("vc-spinner");

  setTimeout(function () {
    // Enables the spinner
    mySpinner.disabled = "false";
  }, 1000);
});
```