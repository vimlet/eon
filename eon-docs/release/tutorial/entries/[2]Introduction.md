[Components]<>

## What are eon components?

Eon components are the individual parts of what your application is composed of, providing both functionality and visuals. With Eon components you can develop an application by composing it of small parts that can be built one at a time, this foments a encapsulated and reusable architecture.

## What can I build with them?

About anything indeed, but most of them fall in one of this three categories, functional components, visual components or a mix of both.

- Functional components - components that provide logic assets, no visuals are involved. An example could be a component that handles websocket connections.

- Visual components - components that provide visual assets, no logic is needed. An example could be a component that handles layout.

- Mixed components - this are by far the most common scenario, where you would like to provide a tied relation between behaviour logic and visual elements.
An example could be a dialog.

Please note this are conceptual definitions, all components are handled in the same way by Eon.

## Advantages of composition

By splitting a complex problem such as an application in small parts or components we can tackle each of them individually, making development cleaner and faster since each part solves an specific part of the puzzle, which can be improved and reused to perfection.

[Usage]<>

Eon imported components can be added **declaratively** using html tags or **programmatically** creating and appending elements to the DOM with javascript.

## Import

In order to be able to use Eon components, first they must be imported, since this operation is fully asynchronous its recommended to declare component imports on the `head` section. You may access to the wide library of components under the `ui` directory or any other custom element in a directory of your choice.

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

To use Eon components declaratively simply use their name tag as any other regular html element eg. `<div>, <span>, etc...`

```[html]
<body>
...

  <eon-button></eon-button>

...
```



## Programmatically

The programmatic approach is preferred when Eon components need to be added or modified on the fly, to achieve this simply create them using the vanilla DOM API.

```[html]
<script>
  var button = document.createElement("eon-button");
  document.body.appendChild(button);
</script>
```

Since imports are asynchronous Eon components properties and functions are declare dynamically and in order to ensure they are accessible we need use a `onCreated` callback.

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

Creating your own custom Eon components is a piece of cake!
Eon comes with a full set of well tested and flexible components that will cover most of your needs, but you can easily create your own components too.


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

Now you can use your custom Eon component importing in a declaratively or programmatically way.

## Advanced config

Now we have mastered the basics of Eon component creation, we can play with components configuration.

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

- **onRender** - Triggers after **ALL** elements have been transformed. This is the main event to define element behaviour with trickle flow where parents triggers always before its children.

- **onBubbleRender** - Triggers after **ALL** elements has been transformed and rendered. This is an auxiliary event to define element behaviour with an inverse rendering order. Triggers with a bubble flow where children always triggers before its parents.

- **onReady** - Triggers after all events are completed.

## Recurrent events

Recurrent events might be triggered more than once:

- **onResize** - Adds a resize listener element and triggers and gets triggered everytime the size changes. 

- **onWindowResize** - Triggers each time window is resized.

- **onAttached** - Triggers each time element is attached to the DOM.

- **onDetached** - Triggers each time element is detached from the DOM.

- **onPropertyChanged** - Triggers each time a property is changed.

- **onAttributeChanged** - Triggers each time an attribute is changed.

- **onDataChanged** - Triggers each time data property is changed.

[State]<>

Every Eon component may have its own `Data` property, which consists of an object with keys specified by the user, these properties will be redefined to have `getters/setters` created with [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) , and since this object is `immutable` its properties must be declared from the start and any new property assigned later on won't be taken into account. These setters will allow us to detect any changes in the properties and notify the user with our `onDataChanged` callback.


Let's set an eon component as an example of a basic and simple data declaration:

```[html]
<script>
eon.element({

  name: "eon-component",

  parse: true,

  data: {
      color: "Blue";
      name: "James";
  },

  onDataChanged: function (keyPath, oldVal, newVal) {
      console.log("Key:", keyPath, ", Previous:", oldVal, ", New:", newVal);
  }

});
</script>
```

If we then change the color property, our `onDataChanged` callback will get fired, bringing us the next log:

```[html]
<script>
var component = document.querySelector("eon-component");
component.data.color = "Red";
</script>
```
```
Key: color , Previous: Blue , New: Red
```

## Data immutability

We have earlier said that the data object is `immutable`, but you can change the initial object declaration by setting and changing the whole `Data` property, this will restart the `Data` object and also trigger the `onDataChanged` callback for every property own by the previous data and the new ones given by the new one:

```[html]
<script>
var component = document.querySelector("eon-component");
component.data = {
    color: "Red",
    name: "Charles",
    age: 21
};
</script>
```
```
Key: color , Previous: Blue , New: Red
Key: name , Previous: James , New: Charles
Key: age , Previous: undefined , New: 21
```

## Dealing with data properties

Since `setters/getters` cannot listen to changes made by pushing/removing new items to arrays or adding new properties to an object, in those cases the whole property must be changed, let's take the following data example:

```[html]
<script>
eon.element({

  name: "eon-component",

  parse: true,

  data: {
      name: "James";
      pet: {
          name: "Boston"
      }
  },

  onDataChanged: function (keyPath, oldVal, newVal) {
      console.log("Key:", keyPath, ", Previous:", oldVal, ", New:", newVal);
  }

});
</script>
```

If we now want to add a new key to the pet object property and still have it properly defined and taken into account, we have to reassign the whole object with the new key, when reassigning a new object, the `onDataChanged` callback will get fire for each key of both the old and new object:

```[html]
<script>
// Create a clone of the previous pet
var component = document.querySelector("eon-component");
var newPet = Object.assign({}, component.data.pet);

// Assign the new property
newPet.color = "White";

// Sets the new pet
component.data.pet = newPet;
</script>
```
```
Key: pet.name , Previous: Boston , New: Boston
Key: pet.color , Previous: undefined , New: White
```

## Data key path

The key provided by the onDataChanged is actually the path of the property that has changed, it may not be of much use by itself, but if you would like to use it you can provide it as an argument to eon.object.readFromPath() and eon.object.assignToPath.

```[html]
<script>
eon.object.readFromPath(yourObject, propertyPath);
eon.object.assignToPath(yourObject, propertyPath, propertyNewValue);
</script>
```

[Interpolation]<>

Eon template engine makes usage of interpolation in order to provide a powerful and handy way of data binding and scripting.
This allows components to display changeable data in the right place without having to manually update each value. It also provides logic driven content such as conditional or loop based content, in fact it so powerful that any javascript logic can be written inside the interpolation tags and it will be executed in a safe sandboxed environment.
 

## Basic Usage

Interpolation is represented by `{{ }}` tags and must be written inside the element template. It's also mandatory to set parse to 'true' on the element config.

Sometimes specific behaviour can be triggered with the use of shorthands, this are special tokens that are preceded by `{{`. Examples of this are echo shorthand `{{=` and bind shorthand `{{@`.

In order to get started with interpolation we are going to explore a basic data binding example, but note this is just one of its many usages.

Let's create a basic element with interpolation:

hello-world.html
```[html]
<template>
  Hello {{@ name }}!
</template>

<script>
eon.element({

  name: "hello-world"
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
<script>
  var el = document.querySelector("hellow-world");
  el.data.name = "Vimlet";
</script>
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

This is possible because Eon template engine treats interpolated code as plain javascript, but provides handy functions like bind(data) and echo(string) as well as its respective shorthands which speeds daily development.

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

Since Eon template engine treats interpolated code as plain sanboxed javascript you can exploit it to your own advantage and create logic based content.

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

Many Eon elements can act like containers for other elements and some of this elements need to be placed on a specific part of its container structure.
Placing things on a specific place might be easy programmatically through JavaScript but things get messy quickly when we try to do the same declaratively.
Slotting aims to provide a simple solution to place any element inside its Eon container through the attribute `slot` and CSS selectors.

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

Eon takes care of the element placement so you can stay focus on other important aspects of your application.

[Theming]<>

For the visual aspect of the element, Eon offers a wide and easy way to customize themes, having themes is really useful as it provides a way of standardizing colors, borders and all the visual related CSS. Since all the rules are scoped by the theme attribute, you can have several themes active in the same web application avoiding any troubles or conflicts. 


By default, if no theme is specified, Eon will work with the `noire` dark theme, but you have multiple options to change it depending on what you wish to do. If you want to change the default Eon theme for all your components the easiest way to do so is to change it directly at the start, after importing Eon:

```[html]
<script src="/eon/eon.js"></script>

<script>
  eon.theme = "myTheme";
</script>
```

If what you want is having a different theme for a specific component you just have to specify it like so:

```[html]
<eon-component theme="myTheme"></eon-component>
```

Even though these features are probably enough to get you going theming related, Eon still has some really cool options to offer you an even wider range of possibilities.

You can use Eon's `themeSchema` property to import even more themes in case you want to have them loaded for the future, just specify the theme, and all the component you want to import that theme:

```[html]
<script>
  eon.themeSchema = {
      "claro": ["eon-component"],
  };
</script>
```

You can also change the theme dynamically whenever you want, this will change all the components matching Eon's theme if their theme was assigned by default, if the component theme was strictly specified by the user this will not change on Eon's theme change.


Changing Eon's theme will also trigger the `onThemeChanged` callback, which gives you access to useful information:

```[html]
<script>
  eon.onThemeChanged(function (previousTheme, newTheme) {
    console.log("Previous theme:", previousTheme);
    console.log("New theme:", newTheme);
  })
</script>
```