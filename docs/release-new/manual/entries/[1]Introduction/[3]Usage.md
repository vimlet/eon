# Usage

vComet imported components can be added **declarative** using html tags or **programmatically** creating and appending elements to the DOM with javascript.

## Import

In order to be able to use vComet components, first they must be imported, since this operation is fully asynchronous its recommend to declare component imports on the `head` section. You may access the a wide library of components under the `ui` directory or any other custom element in a directory of your choice.

```
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>

<script>
  vcomet.import("vcomet/ui/vc-button.html");
</script>

...
```

Although the import function can be called multiple times its recommend to follow the following array pattern.

```
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>

<script>
  vcomet.import([
    "vcomet/ui/vc-button.html", 
    "vcomet/ui/vc-dialog.html", 
    "vcomet/ui/vc-text.html"
    ]);
</script>

...
```

## Declarative

To use vComet components declaratively simply use their name tag as any other regular html element eg. `<div>, <span>, etc...`

```
<body>
...

  <vc-button></vc-button>

...
```



## Programmatically

The programmatic approach is preferred when vComet components need to be added or modified on the fly, to achieve this simply create them using the vanilla DOM API.

```
<script>
  var button = document.createElement("vc-button");
  document.body.appendChild(button);
</script>
```

Since imports are asynchronous vComet components properties and functions are declare dynamically and in order to ensure they are accessible we need use a `onCreated` callback.

```
<script>
  var button = document.createElement("vc-button");
  document.body.appendChild(button);

  button.onCreated(function(){
    this.disable = true;
  });

</script>
```

