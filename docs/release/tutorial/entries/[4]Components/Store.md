# Store

## Introduction

The store is a non visual element created to provide and manipulate data from a local or remote source. Includes a stable interface for interacting with data through some communication protocols like REST and WebSocket.

## Declarative usage 

``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-store.html");
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
### Store data binding

This is an example of how a store can be used to handle data independently and be provided for any purpose. The snippet below shows a store data bound to an user contact ordinary HTML form.

Remote contacts.json:

``` json
  [
    {
      "name": "James",
      "lastname": "Olivier"
    },
    {
      "name": "Amanda",
      "lastname": "Shale"
    }
  ]
```

Form and store declaration:

``` [html]
<body>
  <vc-store type="rest" url="rest/some/remote/source/contacts.json"></vc-store>
  <form>
    First name:<br>
    <input type="text" name="name" value="{{= data.name }}">
 
    Last name:<br>
    <input type="text" name="lastname" value="{{= data.lastname }}"> 
    
    <input type="submit" value="Submit">
  <form>
</body>
```

Data binding:

``` [html]
<script>
    var store = document.querySelector("vc-store");
    var form = document.querySelector("form");

    // Make sure the store has loaded
    store.onLoaded(function(){
      // Fetch data
      store.fetchRemote(function(){
        // Bind store data to the form
        vcomet.data.init(form, store.data.asArray()[0]);

        // Change contact dynamically
        form.data = store.data.asArray()[1];
      });
    });
  </script>
```

The previous example requires the store to be managed in a programmatic way, but using vComet elements with the store functionality integrated, the code becomes shorter and more legible, getting rid of an extra functionality code.

### vComet grid with store integration 

Here is the code needed to implement a grid element working with remote data retrieved by a rest store:

``` [html]
<vc-grid rows-per-page="auto" columns="name, lastname" headers="Name, Last name">
    <vc-store type="rest" url="rest/some/remote/source/contacts.json"></vc-store>
</vc-grid>
```

This example proves that is a better option to take advantage of the vComet elements composition to make your application development easier. 