[Components]<>

## What are eon components?

Eon components are the individual parts of what your application is composed of, providing both functionality and visuals. With eon components you can develop an application by composing it of small parts that can be built one at a time, this foments a encapsulated and reusable architecture.

## What can I build with them?

About anything indeed, but most of them fall in one of this three categories, functional components, visual components or a mix of both.

- Functional components - components that provide logic assets, no visuals are involved. An example could be a component that handles websocket connections.

- Visual components - components that provide visual assets, no logic is needed. An example could be a component that handles layout.

- Mixed components - this are by far the most common scenario, where you would like to provide a tied relation between behaviour logic and visual elements.
An example could be a dialog.

Please note this are conceptual definitions, all components are handled in the same way by eon.

## Advantages of composition

By splitting a complex problem such as an application in small parts or components we can tackle each of them individually, making development cleaner and faster since each part solves an specific part of the puzzle, which can be improved and reused to perfection.

[Usage]<>

Eon imported components can be added **declaratively** using html tags or **programmatically** creating and appending elements to the DOM with javascript.

## Import

In order to be able to use eon components, first they must be imported, since this operation is fully asynchronous its recommended to declare component imports on the `head` section. You may access to the wide library of components under the `ui` directory or any other custom element in a directory of your choice.

```[html]
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>

<script>
  eon.import("eon/ui/eon-button.html");
</script>

...
```

Although the import function can be called multiple times its recommend to follow the following array pattern.

```[html]
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>

<script>
  eon.import([
    "eon/ui/eon-button.html", 
    "eon/ui/eon-dialog.html", 
    "eon/ui/eon-text.html"
    ]);
</script>

...
```

## Declarative

To use eon components declaratively simply use their name tag as any other regular html element eg. `<div>, <span>, etc...`

```[html]
<body>
...

  <eon-button></eon-button>

...
```



## Programmatically

The programmatic approach is preferred when eon components need to be added or modified on the fly, to achieve this simply create them using the vanilla DOM API.

```[html]
<script>
  var button = document.createElement("eon-button");
  document.body.appendChild(button);
</script>
```

Since imports are asynchronous eon components properties and functions are declare dynamically and in order to ensure they are accessible we need use a `onCreated` callback.

```[html]
<script>
  var button = document.createElement("eon-button");
  document.body.appendChild(button);

  button.onCreated(function(){
    this.disable = true;
  });

</script>
```

[Creation]<>

Creating your own custom eon components is a piece of cake!
eon comes with a full set of well tested and flexible components that will cover most of your needs, but you can easily create your own components too.


## Basic structure

1. Create an empty html file in the desired directory, note `filename must match the tag name of your component in lowercase with at least one hyphen`.

```
ui-custom/my-element.html
```

2. Add `<template>` tag with the desired layout of your component, this is the default content of your vComent component

```[html]
<template>
  Hello eon!
</template>
```

3. Add `<script>` tag, this is where we will register the behaviour of our element by calling eon.element function.

```[html]
<script>
  eon.element("my-element");
</script>
```

4. You can also add a `<style>` tag to the file but this is not mandatory specially since most of the style will be handled by the theming mechanism.

```[html]
<style>
  my-element {
    color: blue;
  }
</style>
```

The resultant file `ui-custom/my-element.html` will look something like this:


```[html]
<style>
  my-element {
    color: blue;
  }
</style>

<template>
  Hello eon!
</template>

<script>
  eon.element("my-element");
</script>

```

Now you can use your custom eon component importing in a declaratively or programmatically way.

## Advanced config

Now we have mastered the basics of eon component creation, we can play with components configuration.

When declaring a new component through `eon.element` function you can pass an config object as parameter, where the name, style, properties and functions can be declared and callbacks to element life-cycle can be used to add additional behaviour.

There are other options to declare the component:

- Passing an object as the parameter, with a name and the config object.
- It can also be passed the name as the first parameter and the rest of the config as the second one.

```[html]
<script>
  eon.element({

    name: "my-element",
    style: "my-element.css"

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

[Life-cycle]<>

Eon components pass through a series of events that determine their life-cycle. Understanding this events is crucial for an optimal performance implementation. 

## Sequential events

All sequential events are guaranteed to, trigger only once and in order.

Events by execution order:

- **onCreated** - Triggers on element creation, grants access to custom element properties and functions, note at this point the element has no children since its declarative content is temporally stored as a "source" fragment property and the default component layout is also temporally stored as a "template" fragment property.

- **onInit** - Triggers on element first attach and before its transformation.

- **onTransformed** - Triggers after transform, which mean its template fragment and source fragment has been imported to the dom using element slotting approach.

- **onRender** - Triggers after **ALL** elements has been transformed. This is the main event to define element behaviour with trickle flow where parents triggers always before its children.

- **onBubbleRender** - Triggers after **ALL** elements has been transformed and rendered. This is an auxiliary event to define element behaviour with an inverse rendering order. Triggers with a bubble flow where children always triggers before its parents.

- **onReady** - Triggers after all events are completed.

## Recurrent events

Recurrent events might be triggered more than once:

- **onResize** - By default triggers each time window is resized unless element config properties selfResize is set to true, in this case it adds a element resize listener and triggers on element resize. 

- **onAttached** - Triggers each time element is attached to the DOM.

- **onDetached** - Triggers each time element is detached from the DOM.

- **onPropertyChanged** - Triggers each time a property is changed.

- **onAttributeChanged** - Triggers each time an attribute is changed.

- **onDataChanged** - Triggers each time data property is changed.

[Interpolation]<>

eon template engine makes usage of interpolation in order to provide a powerful and handy way of data binding and scripting.
This allows components to display changeable data in the right place without having to manually update each value. It also provides logic driven content such as conditional or loop based content, in fact it so powerful that any javascript logic can be written inside the interpolation tags and it will be executed in a safe sandboxed environment.


## Basic Usage

Interpolation is represented by `{{ }}` tags and must be written inside the element template. It's also mandatory to set interpolation to 'true' on the element config.

Sometimes specific behaviour can be triggered with the use of shorthands, this are special tokens that are preceded by `{{`. Examples of this are echo shorthand `{{=` and bind shorthand `{{@`.

In order to get started with interpolation we are going to explore a basic data binding example, but note this is just one of its many usages.

Let's create a basic element with interpolation:

hello-world.html
```[html]
<template>
  Hello {{@ name }}!
</template>

<script>
eon.element("hello-world", null, {
  parse: true;
  data: {
      name: "World";
  }
});
</script>
```

Now when `<hellow-world></hellow-world>` is used the text 'Hello World' is displayed.

Note that any change on `el.data.name` will immediately get reflected on the text, for example doing something like this:

```[javascript]
var el = document.querySelector("hellow-world");
el.data.name = "Vimlet";
```

would yield the following output instead:

```
Hello Vimlet!
```

## Understanding bind "@"

You can see there's an `@` after the interpolation open tags, this is a shorthand for bind(data) function.
the same code could be written like so without the shorthand:

```[html]
<template>
  Hello {{ bind("name"); }}!
</template>
```

This is possible because eon template engine treats interpolated code as plain javascript, but provides handy functions like bind(data) and echo(string) as well as its respective shorthands which speeds daily development.

## Understanding echo "="

The function echo(string) outputs text to the template, and it can be used with `=` shorthand.

```[html]
<template>
  Hello {{ echo("I'm a text"); }}!
</template>
```

or simply using its shorthand

```[html]
<template>
  Hello {{@ "I'm a text" }}!
</template>
```

This would be viewed as 

```
Hello I'm a text!
```

## Scripting

Since eon template engine treats interpolated code as plain sanboxed javascript you can exploit it to your own advantage and create logic based content.

```[html]
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

[Slotting]<>

Many eon elements can act like containers for other elements and some of this elements need to be placed on a specific part of its container structure.
Placing things on a specific place might be easy programmatically through JavaScript but things get messy quickly when we try to do the same declaratively.
Slotting aims to provide a simple solution to place any element inside its eon container through the attribute `slot` and CSS selectors.

For example, imagine we had simple container element named 'eon-container':

```[html]
<template>
  <div class="eon-container-parent"></div>
</template>

<script>
eon.element("eon-container");
</script>
```

Once imported, in order to use it, we could do this:

```[html]
<eon-container>
  <span>Hello</span>
</eon-container>
```

This would display the element eon-container with a direct child span.
Now lets say we want to place it inside the div with the class eon-container-parent instead. We can do so simply by using the `slot` attribute and a simple css selector.

```[html]
<eon-container>
  <span slot=".eon-container-parent">Hello</span>
</eon-container>
```

eon takes care of the element placement so you can stay focus on other important aspects of your application.

[Theming]<>

Coming soon...