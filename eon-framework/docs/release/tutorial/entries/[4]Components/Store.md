# Store

## Introduction

The store is a non visual element created to provide and manipulate data from a local or a remote source. Includes a stable interface for interacting with data through communication protocols like REST and WebSocket.

## Declarative usage 

``` [html]
<head>
  <script>
    eon.import("/eon/data/eon-store/eon-store.html");
  </script>
<head>
```

The store can be declared as any other HTML element, but if it is used for managing other eon elements data, these manage it themselves when they detect a inner store element. This case is described on the examples section.

``` [html]
<eon-store></eon-store>
```

## Programmatic usage

``` js
eon.ready(function () {
  // Create eon-store
  var store = document.createElement("eon-store");

  // Append wherever you need it
  document.querySelector("body").appendChild(store);
});
```

## Examples

### eon grid with store integration 

Here is the code needed to implement a **eon-grid** element working with remote data retrieved by a rest store:

``` [html]
<eon-grid rows-per-page="auto" columns="name, lastname" headers="Name, Last name">
    <eon-store type="rest" url="rest/some/remote/source/contacts.json"></eon-store>
</eon-grid>
```

This example proves that is a good option to take advantage of the eon elements composition to make your application development easier. 