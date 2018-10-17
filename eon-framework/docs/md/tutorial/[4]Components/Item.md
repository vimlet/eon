# Item

## Introduction

The eon-item element is intended to be used as a piece of the eon elements below.

- [eon-appmenu](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FAppmenu.md)
- **eon-combobox**
- [eon-contextmenu](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FContextmenu.md)
- [eon-layout](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FLayout.md)
- **eon-menu**
- [eon-togglemenu](/vimlet/VimletComet/master/docs/release/index.html#!version=1.0.0&mode=tutorial&file=entries%2FComponents%2FTogglemenu.md)

## Declarative usage

Declare eon-item as any other HTML element:

``` [html]
<eon-layout>
  <eon-item></eon-item>
  <eon-item></eon-item>
</eon-layout>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-layout
  var layout = document.createElement("eon-layout");

  // Create some items
  var item = document.createElement("eon-item");
  var item2 = document.createElement("eon-item");
  layout.appendChild(item);  
  layout.appendChild(item2);  

  // Append wherever you need it
  document.querySelector("body").appendChild(layout);

});
```

## Examples