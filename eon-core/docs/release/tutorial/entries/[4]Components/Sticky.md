# Sticky

## Introduction

Commonly used as a page head tool bar which need to be visible while the user scrolls the content. 

The main difference between the eon-sticky an others from third parts frameworks is that while these usually reduced the options to a single top sticky, the eon-sticky allows the implementation of bottom, left and right position sticky elements. 

## Declarative usage 

Declare sticky the same way you declare any other HTML element:

``` [html]
<eon-sticky></eon-sticky>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-separator
  var sticky = document.createElement("eon-sticky");

  // Append wherever you need it
  document.querySelector("element").appendChild(sticky);

});
```

## Examples
### A flexible positioning

``` [html]
<eon-sticky side="left">
    <h1> title </h1>
    <div> content </div>
</eon-sticky>
<eon-sticky side="right">
    <h1> title </h1>
    <div> content </div>
</eon-sticky>
<eon-sticky side="bottom">
    <h1> title </h1>
    <div> content </div>
</eon-sticky>
```

** It is known an issue with the right positioned sticky in some mobile devices. **