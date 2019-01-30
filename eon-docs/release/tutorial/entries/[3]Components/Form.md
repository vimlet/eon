# Form

## Introduction
This component deals with the data management of the different form elements.

To use it import eon-form in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-form.html");
  </script>
<head>
```

## Declarative usage
Create a eon-form declaratively is as simple as creating a native HTML form.

``` [html]
<eon-form action="#" method="get">
  <eon-text name="userName" type="text" placeholder="Name" label="User name"></eon-text>
  <eon-checkbox label="Checkbox" name="checkbox" value="test"></eon-checkbox>
  <eon-button type="submit" value="Submit" > </eon-button>
</eon-form>
```

It is also possible to use native HTML with eon-form:
``` [html]
<eon-form action="#" method="get">
  <input type="text" name="textboxHtml">
  <input type="checkbox" value="test" name="checkboxHtml">Test
  <button type="submit">Submit</button>
</eon-form>
```

## Programmatic usage
Create a eon-form programmatically is also very simple.
To send the data eon-form uses `submitForm()` method.

``` [javascript]
eon.onReady(function () {
  var myForm = document.createElement("eon-form");
  var myCheckbox = document.createElement("eon-checkbox");
  var myButton = document.createElement("eon-button");

  // Set properties of eon-form
  myForm.action = "#";
  myForm.method = "get";

  // Set properties of eon-checkbox
  myCheckbox.label = "Checkbox";
  myCheckbox.name = "checkbox";
  myCheckbox.value = "test";

  // Set properties of eon-buttom
  myButton.value = "Submit";
  myButton.type = "submit";

  // Append eon-form where necessary
  document.querySelector(".main").appendChild(myForm);
  // Append form components into eon-form
  myForm.appendChild(myCheckbox);
  myForm.appendChild(myButton);
});
```
