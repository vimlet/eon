# Text

## Introduction
The text element is a component meant for typing and it has multiple uses depending on the type specified by the user (text , password and area). 

For its use, it is necessary to import vc-text in the head of the HTML document:
``` [html]
<head>
  <script>
    vcomet.import("/vcomet/ui/vc-text.html");
  </script>
<head>
```

## Declarative usage

``` [html]
    <vc-text name="myText">This is a text</vc-text>
```

## Programmatic usage

``` [javascript]
    vcomet.onReady(function () {

            // Create vc-text
            var myText = document.createElement("vc-text");
            
            // Specify its attributes/properties at convenience
            myText.name = "myText";
            
            // Append the element to the desire parent
            document.querySelector("body").appendChild(myText);

    });
```

## Examples

### Disabled/Read only, default type text

If the type is not specified to the element, it will proceed as a "text" type, which is its default behavior. You can also specify the status in which the element is in, the available status are "active" (default) and "disabled".


``` [html]
    <vc-text name="myText" disabled="true">Disabled</vc-text>
    <vc-text name="myText" readonly="true">Read only</vc-text>
    <vc-text name="myText">Enabled</vc-text>
```

### Password type text with counter

The password text is pretty similar to the text type but it shows asterisks instead of the written text, for this example the counter was also enabled as it may be convenient to know how long the typed password is, we also specified a placeholder.

``` [html]
    <vc-text name="myPassword" placeholder="Write your password here" type="password" counter="true"></vc-text>
```

### Area type text with counter and length limit

The area text enables the user to write large amount of characters in multiple lines, for this example the counter was also enabled as well as a max-length and area-height were specified.

``` [html]
    <vc-text name="myArea" type="area" counter="true" max-length="300" area-height="150"></vc-text>
```