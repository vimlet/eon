# Loadingmask

## Introduction
This component is an overlay with a loading circle that appears immediately after opening the page to hide its content until it has been fully loaded.

To use it import eon-loadingmask in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-loadingmask.html");
  </script>
<head>
```

## Declarative usage
Create a eon-loadingmask declaratively is really simple. By default, the time it takes eon-loadingmask to hide is 2 seconds, but it can be changed with the attribute `duration`.
``` [html]
<eon-loadingmask duration="3000"></eon-loadingmask>
```

## Programmatic usage
It is also very simple to create a eon-loadingmask programmatically. 

It can be indicated that the eon-loadingmask is not shown when it is created and displayed when necessary using the method `show`.
``` [javascript]
eon.onReady(function () {
  // Create eon-loadingmask
  var myLoadingmask = document.createElement("eon-loadingmask");
  // Append eon-loadingmask
  document.querySelector("body").appendChild(myLoadingmask);
  // Call to method to show eon-loadingmask
  loadingmask.show();
});
```
