# Checkbox

## Introduction
The eon-checkbox is a form component very easy to use. It can be used inside a eon-form component or inside an HTML form.

To use it import eon-check in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-checkbox.html");
  </script>
<head>
```


## Declarative usage
``` [html]
<eon-checkbox label="Checkbox 1" name="options" value="myCheckbox1"></eon-checkbox>
<!-- Initially checkbox checked -->
<eon-checkbox label="Checkbox 2" name="options" value="myCheckbox2" checked="true"></eon-checkbox>
<!-- Checkbox disabled -->
<eon-checkbox label="Checkbox 3" name="options" value="myCheckbox3" disabled="true"></eon-checkbox>
```


## Programmatic usage
``` [javascript]
eon.onReady(function () {
  // Create eon-checkbox
  var myCheckbox1 = document.createElement("eon-checkbox");
  var myCheckbox2 = document.createElement("eon-checkbox");
  var myCheckbox3 = document.createElement("eon-checkbox");

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
  myCheckbox3.disabled = "true";

  // Append all eon-checkbox
  document.querySelector(".main").appendChild(myCheckbox1);
  document.querySelector(".main").appendChild(myCheckbox2);
  document.querySelector(".main").appendChild(myCheckbox3);
});
```

## Examples

### Enable and check dynamically
In this example one of the eon-checkbox is disabled and other is checked, but after a second the disabled and unchecked checkbox will be enabled and checked.
``` [html]
<!-- Initially checkbox checked -->
<eon-checkbox label="Checkbox 1" name="options" value="myCheckbox1" checked="true"></eon-checkbox>
<!-- Initially checkbox disabled -->
<eon-checkbox id="myCheckbox2" label="Checkbox 2" name="options" value="myCheckbox2" disabled="true"></eon-checkbox>
```

``` [javascript]
eon.onReady(function () {
  var myCheckbox2 = document.querySelector("#myCheckbox2");

  setTimeout(function () {
    // Set new values of properties
    myCheckbox2.checked = true;
    myCheckbox2.disabled = false;
  }, 1000);
});
```