# Separator

## Introduction

This is a basic layout element that works as a content separator.

## Declarative usage 

Declare separator the same way you declare any other HTML element:

``` [html]
<eon-separator></eon-separator>
```

## Programmatic usage

``` [javascript]
eon.ready(function () {

  // Create eon-separator
  var separator = document.createElement("eon-separator");

  // Append wherever you need it
  document.querySelector("anyElement").appendChild(separator);

});
```

## Examples

### Structured form sections

The separator is intended to be declared inside the node below which you want it to be positioned at, this way we ensure its correct displaying.

``` [html]
<form>

  <div class="content">
    Full bleed separator
    <!-- SEPARATOR -->
    <eon-separator></eon-separator>
    <!-- ::::::: -->
  </div>

  <div class="content">
    Mid position separator
    <!-- SEPARATOR -->
    <eon-separator type="mid" border="3" length="50%"></eon-separator>
    <!-- ::::::: -->
  </div>

</form>
```