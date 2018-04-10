# Start with vComet

## Download vComet
To get started using vComet, the first thing you should do is to download it from *here*. Once downloaded, we can start with this tutorial!


## Create your project
We are going to start with the most basic: create the project in which you want to use vComet. You just need to create a folder with the name of your project and put vComet inside it.

Add the file in which you want to use vComet in the proyect root, for example `index.html`. Then import vComet in the `head` of the file:
``` [html]
<head>
    <script src="vcomet/vcomet.js"></script>
</head>
```

## Import components

``` [html]
<head>
    <script>
        vcomet.import(["vcomet/ui/vc-button.html"]);
    </script>
</head>
``` 

## vComet onReady
To use vComet programmatically we have to work inside the `vcomet.onReady`
``` [javascript]
vcomet.onReady(function () {
});
```