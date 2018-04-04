#Slotting

Many vComet elements can act like containers for other elements and some of this elements need to be placed on a specific part of its container structure.
Placing things on a specific place might be easy programmatically through JavaScript but things get messy quickly when we try to do the same declaratively.
Slotting aims to provide a simple solution to place any element inside its vComet container through the attribute `slot` and CSS selectors.

For example, imagine we had simple container element named 'vc-container':

```
<template>
  <div class="vc-container-parent"></div>
</template>

<script>
vcomet.element("vc-container");
</script>
```

Once imported, in order to use it, we could do this:

```
<vc-container>
  <span>Hello</span>
</vc-container>
```

This would display the element vc-container with a direct child span.
Now lets say we want to place it inside the div with the class vc-container-parent instead. We can do so simply by using the `slot` attribute and a simple css selector.

```
<vc-container>
  <span slot=".vc-container-parent">Hello</span>
</vc-container>
```

vComet takes care of the element placement so you can stay focus on other important aspects of your application.