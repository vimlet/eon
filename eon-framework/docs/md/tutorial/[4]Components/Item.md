# Item

## Introduction

The vc-item element is intended to be used as a piece of the vComet elements below.

- [vc-appmenu](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FAppmenu.md)
- **vc-combobox**
- [vc-contextmenu](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FContextmenu.md)
- [vc-layout](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FLayout.md)
- **vc-menu**
- [vc-togglemenu](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FTogglemenu.md)

## Declarative usage

Declare vc-item as any other HTML element:

``` [html]
<vc-layout>
  <vc-item></vc-item>
  <vc-item></vc-item>
</vc-layout>
```

## Programmatic usage

``` [javascript]
vcomet.ready(function () {

  // Create vc-layout
  var layout = document.createElement("vc-layout");

  // Create some items
  var item = document.createElement("vc-item");
  var item2 = document.createElement("vc-item");
  layout.appendChild(item);  
  layout.appendChild(item2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(layout);

});
```

## Examples