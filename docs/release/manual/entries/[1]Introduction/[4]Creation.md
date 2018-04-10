# Creation

Creating your own custom vComet components is a piece of cake!
vComet comes with a full set of well tested and flexible components that will cover most of your needs, but you can easily create your own components too.


## Basic structure

1. Create an empty html file in the desired directory, note `filename must match the tag name of your component in lowercase with at least one hyphen`.

```
ui-custom/my-element.html
```

2. Add `<template>` tag with the desired layout of your component, this is the default content of your vComent component

```
<template>
  Hello vComet!
</template>
```

3. Add `<script>` tag, this is where we will register the behaviour of our element by calling vcomet.element function.

```
<script>
  vcomet.element("my-element");
</script>
```

4. You can also add a `<style>` tag to the file but this is not mandatory specially since most of the style will be handled by the theming mechanism.

```
<style>
  my-element {
    color: blue;
  }
</style>
```

The resultant file `ui-custom/my-element.html` will look something like this:


```
<style>
  my-element {
    color: blue;
  }
</style>

<template>
  Hello vComet!
</template>

<script>
  vcomet.element("my-element");
</script>

```

Now you can use your custom vComet component importing in a declaratively or programmatically way.

## Advanced config

Now we mastered the basics of vComet component creation, we can play with components configuration.
When declaring a new component through `vcomet.element` function you can pass a config object as a second parameter, where properties and functions can be declared and callbacks to element life-cycle can be use to add additional behaviour.

```
<script>
  vcomet.element("my-element", {

    properties: {
      customProperty: "I'm a custom property"
    },

    functions: {
      customFunction: function() {
          console.log("I'm a custom function");
      }
    },

    onReady: function() {
      console.log(this.tagName + " ready!");
    }

  });
</script>

```