# Button

## Introduction
The eon-button component is a button with different facilities. It can be used as a form button using the property `type="submit"`, or as a button that activates a functionality.

To use it import eon-button in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-button.html");
  </script>
<head>
```

## Declarative usage
Create a eon-button as any other HTML element. The attribute `label` is equivalent to the text of the button. 

``` [html]
<eon-button label="CLICK" onclick="alert('Hello!');"></eon-button>
```

## Programmatic usage

``` [javascript]
eon.onReady(function () {
  // Create eon-button
  var myButton = document.createElement("eon-button");

  myButton.label = "CLICK";
  // Set button onclick functionality
  myButton.setOnClick("alert('Hello!');");

  // Append eon-button where necessary
  document.querySelector("body").appendChild(myButton);
});
```

## Examples

### Button with icon
This component can have icons, which by default is located to the left of the eon-button text, but it can be modified with the `icon-position` attribute declaratively and with the `iconPosition` property programmatically.

``` [html]
<eon-button label="CLICK" icon='<i class="material-icons">star</i>' onclick="alert('Hello!');" icon-position="right"></eon-button>
```

### Change icon dynamically
In this example, the eon-button has no text, only an icon and when the eon-button is clicked the icon changes dynamically.

``` [html]
<eon-button icon='<i class="material-icons">content_cut</i>' onclick="changeIcon(this);"></eon-button>
```
``` [javascript]
function changeIcon(button) {
  // Set the new icon to the eon-button property icon
  button.icon = '<i class="material-icons">content_paste</i>';
}
```

### Disabled Button
A eon-button can be disabled and enabled before a specified event.

``` [html]
<!-- Click to enable the disabled button -->
<eon-button label="Click me!"  onclick="enableButton();"></eon-button>
<eon-button id="disabled" label="Disabled" disabled="true"></eon-button>
```
``` [javascript]
function enableButton() {
  var disButton = document.querySelector("#disabled");

  // Enable de button and change its value
  disButton.disabled = "false";
  disButton.setValue("Enable");
}
```