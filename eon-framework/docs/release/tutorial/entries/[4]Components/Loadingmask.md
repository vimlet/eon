# Loadingmask

## Introduction
This component is an overlay with a loading circle that appears immediately after opening the page to hide its content until it has been fully loaded.

To use it import vc-loadingmask in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-loadingmask.html");
  </script>
<head>
```

## Declarative usage
Create a vc-loadingmask declaratively is really simple. By default, the time it takes vc-loadingmask to hide is 2 seconds, but it can be changed with the attribute `duration`.
``` [html]
<vc-loadingmask duration="3000"></vc-loadingmask>
```

## Programmatic usage
It is also very simple to create a vc-loadingmask programmatically. 

It can be indicated that the vc-loadingmask is not shown when it is created and displayed when necessary using the method `show`.
``` [javascript]
vcomet.onReady(function () {
  // Create vc-loadingmask
  var myLoadingmask = document.createElement("vc-loadingmask");
  // Append vc-loadingmask
  document.querySelector("body").appendChild(myLoadingmask);
  // Call to method to show vc-loadingmask
  loadingmask.show();
});
```
