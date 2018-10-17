# Text

## Introduction
The combobox element is a component meant for selecting an option between the given ones.

For its use, it is necessary to import `vc-combobox` in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/vc-combobox.html");
  </script>
<head>
```

## Declarative usage

``` [html]
    <vc-combobox name="myCombobox" placeholder="Pick a color">
        <vc-item value="r" display-value="Red"></vc-item>
        <vc-item value="p" display-value="Pink"></vc-item>
        <vc-item value="pu" display-value="Purple"></vc-item>
    </vc-combobox>
```

## Programmatic usage

``` [javascript]
    eon.onReady(function () {

            // Create vc-combobox and the items we want
            var myCombobox = document.createElement("vc-combobox");
            var item1 = document.createElement('vc-item');
            var item2 = document.createElement('vc-item');
            
            // Specify its attributes/properties at convenience
            myCombobox.name = "myText";
            myCombobox.placeholder = "Programatic";

            // Sets attributes/properties for the item #1
            item1.value = "prog1";
            item1.displayValue = "Programatic Item #1";

            // Sets attributes/properties for the item #2
            item2.value = "prog2";
            item2.displayValue = "Programatic Item #2";

            myCombobox.appendChild(item1);
            myCombobox.appendChild(item2);
            
            // Append the element to the desire parent
            document.querySelector("body").appendChild(myCombobox);

    });
```

## Examples

### Working with a remote data source

You might want to create your dropdown and its items based on a data source, this can be done if you include a `vc-store` inside the combobox referencing your data source, for this example we will take our data from our colors.json, that looks like this:

``` [js]
    [
  {
    "colorCode":"r",
    "colorName": "Red"
  },
  {
    "colorCode":"p",
    "colorName": "Pink"
  },
  {
    "colorCode":"pu",
    "colorName": "Purple"
  }
]
```

Then we create a vc-store referencing our json:


``` [html]
    <vc-combobox name="myCombobox" display-property="colorName" placeholder="Pick a color">
        <vc-store type="memory" id-property="colorCode" url="colors.json">
        </vc-store>
    </vc-combobox>
```

### Filtering

Enables the user to type in the input so that the options provided by the dropdown are filtered, this is usefull when there are large amounts of options, like countries for instance.

``` [html]
    <vc-combobox name="myCombobox" placeholder="Pick a color" filter="true">
        <vc-item value="r" display-value="Red"></vc-item>
        <vc-item value="p" display-value="Pink"></vc-item>
        <vc-item value="pu" display-value="Purple"></vc-item>
    </vc-combobox>
```
