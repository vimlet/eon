# Slider

## Introduction
Form component that allows selecting a value from a range of values by moving the slider thumb of the eon-slider. This can be horizontal or vertical and the value can be visible or not.

To use it import eon-slider in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-slider.html");
  </script>
<head>
```

## Declarative usage
To declare a basic eon-slider it is only necessary to indicate the `name` because by default the minimum value is 0 and the maximum value is 100. The value in which it is located by default is 50.
``` [html]
<eon-slider name="mySlider"></eon-slider>
```

## Programmatic usage
Programmatically, as it happens declaratively, it is only necessary to indicate the `name` and append the eon-slider to the part of the document where it is necessary.
``` [javascript]
eon.onReady(function () {
  // Create eon-slider
  var mySlider = document.createElement("eon-slider");

  // Set property and append eon-slider
  slider.name = "mySlider";
  document.querySelector("body").appendChild(mySlider);
});
```

## Examples

### Vertical slider
By default in a eon-slider that has the visible value, it will be placed under the slider.
``` [html]
<eon-slider name="mySlider" min="50" max="200" value="70" orientation="vertical" display-visibility="true"></eon-slider>
```

### Enable dynamically
In this example, the eon-slider is contained within a eon-form and is disabled, and after a second it will be enabled.
``` [html]
<!-- Initially disabled slider -->
<eon-slider id="mySlider" name="mySlider" disabled="true"></eon-slider>
<eon-button type="submit" value="Submit"></eon-button>

```

``` [javascript]
eon.onReady(function () {
  var mySlider = document.querySelector("#mySlider");

  setTimeout(function () {
    // Enables the slider
    mySlider.disabled = "false";
  }, 1000);
});
```