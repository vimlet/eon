# Text

## Introduction
The combobox element is a component meant for selecting an option between the given ones.

<app-playground vtitle="eon-button" html ="<head><script src='framework/eon/eon.js'></script><script>eon.import(['framework/eon/ui/eon-button','framework/custom/app-playground/app-showcase']);</script></head><body><app-showcase title='Button'><eon-button value='Alert' onclick='alert('Hi! ^_^')' icon='<i class='vicon vicon-build'></i></eon-button></app-showcase><app-showcase title='Disabled'><eon-button value='Disabled' disabled='true'></eon-button></app-showcase></body>" js="function test(){alert('soy JS');}" css="#main{background-color:red; cursor:pointer;}" links='{"eon":{"link":"http://www.eonjs.org","icon":"link"},"vimlet":{"link":"http://www.vimlet.com","icon":"bin"},"buttonIcon":{"link":"http://www.vimlet.com","icon":"bin", "text":"buttonIcon"},"button":{"link":"http://www.vimlet.com", "text":"button"}}' selector="body">
</app-playground>

### Working with a remote data source

You might want to create your dropdown and its items based on a data source, this can be done if you include a `eon-store` inside the combobox referencing your data source, for this example we will take our data from our colors.json, that looks like this:

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

Then we create a eon-store referencing our json:


``` [html]
    <eon-combobox name="myCombobox" display-property="colorName" placeholder="Pick a color">
        <eon-store type="memory" id-property="colorCode" url="colors.json">
        </eon-store>
    </eon-combobox>
```

### Filtering

Enables the user to type in the input so that the options provided by the dropdown are filtered, this is usefull when there are large amounts of options, like countries for instance.

``` [html]
    <eon-combobox name="myCombobox" placeholder="Pick a color" filter="true">
        <eon-item value="r" display-value="Red"></eon-item>
        <eon-item value="p" display-value="Pink"></eon-item>
        <eon-item value="pu" display-value="Purple"></eon-item>
    </eon-combobox>
```
