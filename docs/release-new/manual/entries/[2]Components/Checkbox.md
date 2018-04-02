# Checkbox

## Introduction
The vc-checkbox is a form component very easy to use. It can be used inside a vc-form component or inside an HTML form.

To use it import vc-check in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-checkbox.html");
  </script>
<head>
```


## Declarative usage
``` [html]
<vc-checkbox label="Checkbox 1"  name="options" value="myCheckbox1"></vc-checkbox>
<!-- Initially checkbox checked -->
<vc-checkbox label="Checkbox 2"  name="options" value="myCheckbox2" checked="true"></vc-checkbox>
<!-- Checkbox disabled -->
<vc-checkbox label="Checkbox 3"  name="options" value="myCheckbox3" disable="true"></vc-checkbox>
```


## Programmatic usage
``` [javascript]
vcomet.onReady(function () {
  // Create vc-checkbox
  var myCheckbox1 = document.createElement("vc-checkbox");
  var myCheckbox2 = document.createElement("vc-checkbox");
  var myCheckbox3 = document.createElement("vc-checkbox");

  // Set properties of myCheckbox1
  myCheckbox1.label = "Checkbox 1";
  myCheckbox1.name = "options";
  myCheckbox1.value = "myCheckbox1";
  myCheckbox1.checked = "true";

  // Set properties of myCheckbox2
  myCheckbox2.label = "Checkbox 2";
  myCheckbox2.name = "options";
  myCheckbox2.value = "myCheckbox2";

  // Set properties of myCheckbox3
  myCheckbox3.label = "Checkbox 3";
  myCheckbox3.name = "options";
  myCheckbox3.value = "myCheckbox3";
  myCheckbox3.disable = "true";

  // Append all vc-checkbox
  document.querySelector(".main").appendChild(myCheckbox1);
  document.querySelector(".main").appendChild(myCheckbox2);
  document.querySelector(".main").appendChild(myCheckbox3);
});
```

## Examples

### Enable and check dynamically
In this example one of the vc-checkbox is disable and other is checked, but after a second the disable and unchecked checkbox will be enable and checked.
``` [html]
<!-- Initially checkbox checked -->
<vc-checkbox label="Checkbox 1" name="options" value="myCheckbox1" checked="true"></vc-checkbox>
<!-- Initially checkbox disabled -->
<vc-checkbox id="myCheckbox2" label="Checkbox 2" name="options" value="myCheckbox2" disable="true"></vc-checkbox>
```

``` [javascript]
vcomet.onReady(function () {
  var myCheckbox2 = document.querySelector("#myCheckbox2");

  setTimeout(function () {
    // Set new values of properties
    myCheckbox2.checked = true;
    myCheckbox2.disable = false;
  }, 1000);
});
```