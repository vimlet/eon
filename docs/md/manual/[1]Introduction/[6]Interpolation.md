#Interpolation

vComet template engine makes usage of interpolation in order to provide a powerful and handy way of data binding and scripting.
This allows components to display changeable data in the right place without having to manually update each value. It also provides logic driven content such as conditional or loop based content, in fact it so powerful that any javascript logic can be written inside the interpolation tags and it will be executed in a safe sandboxed environment.


## Basic Usage

Interpolation is represented by `{{ }}` and code must be written inside the element template tags. It's also mandatory to set interpolation to 'true' on the element config.

In order to get started with interpolation we are going to explore a basic data binding example, but note this is just one of its many usages.

Let's create a basic element with interpolation:

hello-world.html
```
<template>
  Hello {{@ name }}!
</template>

<script>
vcomet.element("hello-world", null, {
  interpolation: true;
  data: {
      name: "World";
  }
});
</script>
```

now when `<hellow-world></hellow-world>` is used the text 'Hello World' is displayed.

Note that any change on `el.data.name` will immediately get reflected on the text, for example doing something like this:

```
var el = document.querySelector("hellow-world");
el.data.name = "Vimlet";
```

would yield the following output instead:

```
Hello Vimlet!
```

# Understanding bind "@"

You can see there's an `@` after the interpolation open tags, this is a shorthand for bind(data) function.
the same code could be written like so:

```
<template>
  Hello {{ bind("name"); }}!
</template>
```

This is possible because vComet template engine treats interpolated code as plain javascript, but provides handy functions like bind(data) and echo(string) as well as its respective shorthand's which speeds daily development, but will talk about them later on this article.
