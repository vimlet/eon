# Scroll

## Introduction
This component allows the user to scroll through its content, it has a large variety of options to fit all kind of user needs.

For its use, it is necessary to import vc-scroll in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/vc-scroll.html");
  </script>
<head>
```

## Declarative usage

``` [html]
    <vc-scroll>
        <div id="myContent"></div>
    </vc-scroll>
```

## Programmatic usage

``` [javascript]
    eon.onReady(function () {

      // Create vc-scroll element
      var myScroll = document.createElement("vc-scroll");
      // Create the content you want to be scrollable
      var myContent = document.createElement("div");

      // Append your content to the vc-scroll content
      myScroll.content.appendChild(myContent);
      // Append the vc-scroll to the desired container
      document.body.appendChild(myScroll);

    });
```

## Examples

### Default scroll behavior

By default the scroll will attempt to have the same size as its container , the scroll bars will not push the content and they will hide when scroll element loses the mouseover event.

``` [html]
    <div id="myContainer" class="mySize"> 
        <vc-scroll>
            <div id="myContent"></div>
        </vc-scroll>
    </div>
```

### Custom sized scroll with active arrows, active rail scrolling, and static scrollbars

For the scroll to have a custom size it is recommended (besides of giving the scroll the desired size) to set the "fill-contaner" attribute to "false" to ignore its container. In this example we will also set the vertical scrollbars as static and activate the arrows and rail scrolling.

``` [html]
    <vc-scroll class="mySize" fill-container="false" static="vertical" arrow-scrolls="true" rail-scrolls="true">
        <div id="myContent"></div>
    </vc-scroll>
```