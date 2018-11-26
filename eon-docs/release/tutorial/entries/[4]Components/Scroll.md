# Scroll

## Introduction
This component allows the user to scroll through its content, it has a large variety of options to fit all kind of user needs.

For its use, it is necessary to import eon-scroll in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-scroll.html");
  </script>
<head>
```

## Declarative usage

``` [html]
    <eon-scroll>
        <div id="myContent"></div>
    </eon-scroll>
```

## Programmatic usage

``` [javascript]
    eon.onReady(function () {

      // Create eon-scroll element
      var myScroll = document.createElement("eon-scroll");
      // Create the content you want to be scrollable
      var myContent = document.createElement("div");

      // Append your content to the eon-scroll content
      myScroll.content.appendChild(myContent);
      // Append the eon-scroll to the desired container
      document.body.appendChild(myScroll);

    });
```

## Examples

### Default scroll behavior

By default the scroll will attempt to have the same size as its container , the scroll bars will not push the content and they will hide when scroll element loses the mouseover event.

``` [html]
    <div id="myContainer" class="mySize"> 
        <eon-scroll>
            <div id="myContent"></div>
        </eon-scroll>
    </div>
```

### Custom sized scroll with active arrows, active rail scrolling, and static scrollbars

For the scroll to have a custom size it is recommended (besides of giving the scroll the desired size) to set the "fill-contaner" attribute to "false" to ignore its container. In this example we will also set the vertical scrollbars as static and activate the arrows and rail scrolling.

``` [html]
    <eon-scroll class="mySize" fill-container="false" static="vertical" arrow-scrolls="true" rail-scrolls="true">
        <div id="myContent"></div>
    </eon-scroll>
```