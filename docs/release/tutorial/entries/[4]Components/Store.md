# Store

## Introduction

The store is a non visual element created to provide and manipulate data from a local or a remote source. Includes a stable interface for interacting with data through communication protocols like REST and WebSocket.

## Declarative usage 

``` [html]
<head>
  <script>
    vcomet.import("/vcomet/data/store/vc-store.html");
  </script>
<head>
```

The store can be declared as any other HTML element, but if it is used for managing other vComet elements data, these manage it themselves when they detect a inner store element. This case is described on the examples section.

``` [html]
<vc-store></vc-store>
```

## Programmatic usage

``` js
vcomet.ready(function () {
  // Create vc-store
  var store = document.createElement("vc-store");

  // Append wherever you need it
  document.querySelector("body").appendChild(store);
});
```

## Examples

### vComet grid with store integration 

Here is the code needed to implement a **vc-grid** element working with remote data retrieved by a rest store:

``` [html]
<vc-grid rows-per-page="auto" columns="name, lastname" headers="Name, Last name">
    <vc-store type="rest" url="rest/some/remote/source/contacts.json"></vc-store>
</vc-grid>
```

This example proves that is a good option to take advantage of the vComet elements composition to make your application development easier. 