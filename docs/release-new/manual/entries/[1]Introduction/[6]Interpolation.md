#Interpolation

vComet template engine makes usage of interpolation in order to provide a powerful and handy way of data binding and scripting.
This allows components to display changeable data in the right place without having to manually update each value. It also provides logic driven content such as conditional or loop based content, in fact it so powerful that any javascript logic can be written inside the interpolation tags and it will be executed in a safe sandboxed environment.


## Basic Usage

Interpolation is represented by `{{ }}` tags and must be written inside the element template. It's also mandatory to set interpolation to 'true' on the element config.

Sometimes specific behaviour can be triggered with the use of shorthands, this are special tokens that are preceded by `{{`. Examples of this are echo shorthand `{{=` and bind shorthand `{{@`.

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

Now when `<hellow-world></hellow-world>` is used the text 'Hello World' is displayed.

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
the same code could be written like so without the shorthand:

```
<template>
  Hello {{ bind("name"); }}!
</template>
```

This is possible because vComet template engine treats interpolated code as plain javascript, but provides handy functions like bind(data) and echo(string) as well as its respective shorthands which speeds daily development.

# Understanding echo "="

The function echo(string) outputs text to the template, and it can be used with `=` shorthand.

```
<template>
  Hello {{ echo("I'm a text"); }}!
</template>
```

or simply using its shorthand

```
<template>
  Hello {{@ "I'm a text" }}!
</template>
```

This would be viewed as 

```
Hello I'm a text!
```

# Scripting

Since vComet template engine treats interpolated code as plain sanboxed javascript you can exploit it to your own advantage and create logic based content.

```
<template>  
  {{
      var text1 = "I'm text1";
      var text2 = "I'm text2";

      for(var i = 0; i < 4; i++) {
          echo(i % 2 == 0 ? text1 : text2);
      }
  }}  
</template>
```

This would output

```
I'm text1
I'm text2
I'm text1
I'm text2
```

Interpolated code inside a template share the same scope, so its possible to declare a variable in one block and use it in another.

Its also important to note interpolated code will render only once per element to enhance performance, this wont affect the data bind mechanism.