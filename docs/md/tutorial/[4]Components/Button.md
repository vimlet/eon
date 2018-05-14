# Button

## Introduction
The vc-button component is a button with different facilities. It can be used as a form button using the property `type="submit"`, or as a button that activates a functionality.

To use it import vc-button in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-button.html");
  </script>
<head>
```

## Declarative usage
Create a vc-button as any other HTML element. The attribute `label` is equivalent to the text of the button. 

``` [html]
<vc-button label="CLICK" onclick="alert('Hello!');"></vc-button>
```

## Programmatic usage

``` [javascript]
vcomet.onReady(function () {
  // Create vc-button
  var myButton = document.createElement("vc-button");

  myButton.label = "CLICK";
  // Set button onclick functionality
  myButton.setOnClick("alert('Hello!');");

  // Append vc-button where necessary
  document.querySelector("body").appendChild(myButton);
});
```

## Examples

### Button with icon
This component can have icons, which by default is located to the left of the vc-button text, but it can be modified with the `icon-position` attribute declaratively and with the `iconPosition` property programmatically.

``` [html]
<vc-button label="CLICK" icon='<i class="material-icons">star</i>' onclick="alert('Hello!');" icon-position="right"></vc-button>
```

### Change icon dynamically
In this example, the vc-button has no text, only an icon and when the vc-button is clicked the icon changes dynamically.

``` [html]
<vc-button icon='<i class="material-icons">content_cut</i>' onclick="changeIcon(this);"></vc-button>
```
``` [javascript]
function changeIcon(button) {
  // Set the new icon to the vc-button property icon
  button.icon = '<i class="material-icons">content_paste</i>';
}
```

### Disabled Button
A vc-button can be disabled and enabled before a specified event.

``` [html]
<!-- Click to enable the disabled button -->
<vc-button label="Click me!"  onclick="enableButton();"></vc-button>
<vc-button id="disabled" label="Disabled" disabled="true"></vc-button>
```
``` [javascript]
function enableButton() {
  var disButton = document.querySelector("#disabled");

  // Enable de button and change its value
  disButton.disabled = "false";
  disButton.setValue("Enable");
}
```