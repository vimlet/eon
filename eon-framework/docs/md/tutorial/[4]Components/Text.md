# Text

## Introduction
The text element is a component meant for typing and it has multiple uses depending on the type specified by the user (text , password and area). 

For its use, it is necessary to import eon-text in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-text.html");
  </script>
<head>
```

## Declarative usage

``` [html]
    <eon-text name="myText">This is a text</eon-text>
```

## Programmatic usage

``` [javascript]
    eon.onReady(function () {

            // Create eon-text
            var myText = document.createElement("eon-text");
            
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
    <eon-text name="myText" disabled="true">Disabled</eon-text>
    <eon-text name="myText" readonly="true">Read only</eon-text>
    <eon-text name="myText">Enabled</eon-text>
```

### Area type text with counter

The area type text enables the user to write large amount of characters in multiple lines, for this example the counter was also enabled as well as an area-height were specified.

``` [html]
    <eon-text name="myArea" type="area" counter="true" max-length="300" area-height="150"></eon-text>
```

### Password type text with counter and length limit

The password text is pretty similar to the text type but it shows asterisks instead of the written text, for this example the counter was also enabled as it may be convenient to know how long the typed password is ass well as max-length for the user , we also specified a placeholder.

``` [html]
    <eon-text name="myPassword" placeholder="Write your password here" type="password" counter="true"></eon-text>
```
