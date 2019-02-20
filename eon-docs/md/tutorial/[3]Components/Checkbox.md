# Checkbox

## Introduction
The eon-checkbox is a form component very easy to use. It can be used inside a eon-form component or inside an HTML form.



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