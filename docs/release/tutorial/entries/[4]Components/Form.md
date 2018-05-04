# Form

## Introduction
This component deals with the data management of the different form elements.

To use it import vc-form in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-form.html");
  </script>
<head>
```

## Declarative usage
Create a vc-form declaratively is as simple as creating a native HTML form.

``` [html]
<vc-form action="#" method="get">
  <vc-text name="userName" type="text" placeholder="Name" label="User name"></vc-text>
  <vc-checkbox label="Checkbox" name="checkbox" value="test"></vc-checkbox>
  <vc-button type="submit" value="Submit" > </vc-button>
</vc-form>
```

It is also possible to use native HTML with vc-form:
``` [html]
<vc-form action="#" method="get">
  <input type="text" name="textboxHtml">
  <input type="checkbox" value="test" name="checkboxHtml">Test
  <button type="submit">Submit</button>
</vc-form>
```

## Programmatic usage
Create a vc-form programmatically is also very simple.
To send the data vc-form uses `submitForm()` method.

``` [javascript]
vcomet.onReady(function () {
  var myForm = document.createElement("vc-form");
  var myCheckbox = document.createElement("vc-checkbox");
  var myButton = document.createElement("vc-button");

  // Set properties of vc-form
  myForm.action = "#";
  myForm.method = "get";

  // Set properties of vc-checkbox
  myCheckbox.label = "Checkbox";
  myCheckbox.name = "checkbox";
  myCheckbox.value = "test";

  // Set properties of vc-buttom
  myButton.value = "Submit";
  myButton.type = "submit";

  // Append vc-form where necessary
  document.querySelector(".main").appendChild(myForm);
  // Append form components into vc-form
  myForm.appendChild(myCheckbox);
  myForm.appendChild(myButton);
});
```
