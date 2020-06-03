[Cli]<>

eon-cli is a module that works as an assistant to download and install eon.js within your project. You may prefer another method to accomplish this task, but this tool provides the easiest way to download and install eon.js, but overall, to keep it updated. 

To start using eon-cli, you need to install [NodeJS](https://nodejs.org) first, then run this command on the terminal to install the module:

```[javascript]
npm install @vimlet/eon-cli -g
```

To import Eon.js in your project, just run a terminal inside it and run:

```[javascript]
eon-cli install
```

eon-cli will download the latest eon version and will create a file called `eon-json` with the default configuration. You can edit this file to change de default configuration whenever you want. Use the properties below:

- **path**: the eon installation directory.

- **eon**: eon version to be downloaded and installed.

- **ignore**: the directories to be ignored when updating the eon version. 


This means that you are able to keep your eon custom components while eon core and the base ui components are updated (only if your eon custom components have been created inside de eon framework directory).

You can install any Eon version available using `@` between the word `eon` and the specific version:

```[javascript]
eon-cli install eon@release-1.0.8
```

Here are the operations you will find on `eon-cli` module:

- **install**: Downloads and installs the specific Eon version within the directory either specified in the eon.json file. If no eon.json file is generated, `eon-cli` creates its own.

- **init**: Creates a common web application project structure with a configured node `express` server and a simple `index.html`. It imports eon.js as the `install` command does.

- **prune**: Removes unused versions packages and dependencies.

- **--no-save**: Prevents the creation of the eon.json file when installing Eon. 

- **clear**: Removes several elements (cache). 

- **help**: Displays `eon-cli` help. 

[Components]<>

## What are eon components?

Eon components are the individual parts of what your application is composed of, providing both functionality and visuals. With Eon components you can develop an application by composing it of small parts that can be built one at a time, this foments an encapsulated and reusable architecture.

## What can I build with them?

About anything indeed, but most of them fall in one of these three categories, functional components, visual components or a mix of both.

- Functional components - components that provide logic assets, no visuals are involved. An example could be a component that handles WebSocket connections.

- Visual components - components that provide visual assets, no logic is needed. An example could be a component that handles layout.

- Mixed components - this is by far the most common scenario, where you would like to provide a tied relation between behavior, logic, and visual elements.
An example could be a dialog.

Please note these are conceptual definitions, all components are handled in the same way by Eon.

## Advantages of composition

By splitting a complex problem such as an application in small parts or components we can tackle each of them individually, making development cleaner and faster since each part solves a specific part of the puzzle, which can be improved and reused to perfection.

[Imports]<>

In order to be able to use Eon components, first, they must be imported since this operation is fully asynchronous its recommended to declare component imports on the `head` section. You may access the wide library of components under the `ui` directory or any other custom element in a directory of your choice.

To import an Eon component, simply call the **eon.import(path)** function with the component **relative path** as the argument. 

**Things to have in mind while importing Eon components:**

- Always import components inside head tags when possible.
- The path argument accepts both, a single path or an array of paths.
- The path argument can be both a .html file or a directory, as long as that directory contains a .html file with the same name.
- The path is always relative to the eon.basePath, which defaults to eon.js file.
- The .html filename must match the custom element tag name.

These are all **valid** ways of importing the same file:

File path:
```[html]
<script>
  eon.import("eon/ui/eon-button/eon-button.html");
</script>
```

Directory path:
```[html]
<script>
  eon.import("eon/ui/eon-button");
</script>
```
Array of paths:
```[html]
<script>
  eon.import([
    "eon/ui/eon-button"
    ]);
</script>
```

Although the import function can be called multiple times its recommend to use the array pattern instead.

```[html]
<script>
  eon.import([
    "eon/ui/eon-button", 
    "eon/ui/eon-dialog", 
    "eon/ui/eon-text"
    ]);
</script>
```

There is a `@` shortcut to the eon path available to use, which might be usefull for projects with a more complex structure

```[html]
<script>
  eon.import([
    "@ui/eon-button"
    ]);
</script>
```

[Usage]<>

Eon imported components can be used **declaratively** using HTML tags or **programmatically** creating and appending elements to the DOM with javascript.

## Declarative

To use Eon components declaratively simply use their name tag as any other regular HTML element eg. `<div>, <span>, etc...`

```[html]
<body>
  <eon-button></eon-button>
</body>
```


## Programmatically

The programmatic approach is preferred when Eon components need to be added or modified on the fly, to achieve this simply create them using the vanilla DOM API.

```[html]
<script>
  var button = document.createElement("eon-button");
  document.body.appendChild(button);
</script>
```

Since imports are asynchronous Eon components properties and functions are declare dynamically and in order to ensure they are accessible we need to use an `onCreated` callback.

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

1. Create an empty HTML file in the desired directory, note `filename must match the tag name of your component in lowercase with at least one hyphen`.

```
custom/custom-element/custom-element.html
```

2. Add `<template>` tag with the desired layout of your component, this is the default content of your vComent component

```[html]
<template>
  Hello eon!
</template>
```

3. Add `<script>` tag, this is where we will register the behavior of our element by calling `eon.element` function.

```[html]
<script>
  eon.element("custom-element");
</script>
```

4. You can also add a `<style>` tag to the file but this is not mandatory especially since most of the style will be handled by the theming mechanism.

```[html]
<style>
  custom-element {
    color: blue;
  }
</style>
```

The resultant file `custom/custom-element/custom-element.html` will look something like this:


```[html]
<style>
  custom-element {
    color: blue;
  }
</style>

<template>
  Hello eon!
</template>

<script>
  eon.element("custom-element");
</script>

```

Now you can use your custom Eon component importing in a declaratively or programmatically way.

## Advanced config

Now we have mastered the basics of Eon component creation, we can play with components configuration.

When declaring a new component through `eon.element` function you can pass a config object as a parameter, where the name, style, properties, and functions can be declared and callbacks to element life-cycle can be used to add additional behavior.

There are other options to declare the component:

- Passing an object as the parameter, with a name and the config object.
- It can also be passed the name as the first parameter and the rest of the config as the second one.

```[html]
<script>
  eon.element({

    name: "custom-element",
    style: "custom-element.css",

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

[Visibility]<>

In this section, we will show two ways of declaring properties and functions that enriches the eon elements API in terms of legibility and usability. The eon element `config` includes the properties below: 

- **properties**: object used to store the properties the user will have direct access to from the eon element reference. 

- **functions**: object used to store the functions the user will have direct access to from the eon element reference.

- **privateProperties**: object used to store the internal used properties. The user has no need to use them to harness the eon element functionality.  

- **privateFunctions**: object used to store the internal used functions. The user has no need to use them to harness the eon element functionality.  

```[html]
<script>
  eon.element({

    name: "custom-element",

    properties: {
      customProperty: "I'm a custom property"
    },

    privateProperties: function() {
      customProperty: "I'm a custom private property"
    }

    functions: {
      customFunction: function() {
          console.log("I'm a custom function");
      }
    },
  
    privateFunctions: {
      customFunction: function() {
          console.log("I'm a custom private function");
      }
    }
  });
</script>
```

All the items added to these objects are accessed using the same name used to declare them except the `private` ones. Let's see how we would access them reusing the previous custom element example:

```[html]
<body>

  <custom-element></custom-element>
  
  <script>
    var customEl = document.querySelector("custom-element);

    // This will log: "Public property: I'm a custom property"
    console.log("Public property: ", customEl.customProperty);

    // This will log: "Private property: I'm a custom private function"
    console.log("Private property: ", customEl._customProperty);
  </script>

</body>
```

As you can see, there are no limitations in terms of accessibility of both types of properties. But using the private mode (accessing properties with the `_` prefix) helps you separate which ones you want the users to work with and which ones you are declaring for internal use only.

[Reflection]<>

The element public properties accept a configuration object as a value to provide a way to bind the element property to the `HTML` node attribute. This means that any changes made to the attribute or the property value will be reflected on the other. 

```[html]
<script>
  eon.element({

    name: "custom-element",

    properties: {
      customProperty: {
        value: "I'm a custom property",
        reflect: true
      }
    }
    
  });
</script>
```

It is as simple as setting the property `reflect` to `true`. Here is a snippet that represents this behavior:

```[html]
<body>

  <custom-element></custom-element>
  
  <script>
    var customEl = document.querySelector("custom-element);

    // This will log: "I'm a custom property"
    console.log(customEl.customProperty);

    customEl.setAttribute("customProperty", "I'm a reflected value");

    // This will log: "I'm a reflected value"
    console.log(customEl.customProperty);
  </script>

</body>
```

Indeed, this is a powerful functionality but, you will probably discover that as long as you add public properties to your custom element, its DOM node representation starts piling up attributes that stain the DOM. To remove this inconvenience, you have at your service the `reflectDefault` property. This property defines if the element specific property with its default value should have its attribute representation, therefore if it should be visible in the DOM from the very first time.

Below we set a property as `reflectDefault: true` indicating that it will be visible as an attribute in the DOM node representation.

```[html]
<script>
  eon.element({

    name: "custom-element",

    properties: {
      customProperty: {
        value: "I'm a custom property",
        reflect: true,
        reflectDefault: true
      }
    }
    
  });
</script>
```
```[html]
<custom-element custom-property="I'm a custom property"></custom-element>
```

It is important to mention that by default, the properties not assigned by the user won't be visible in the DOM unless the user set them during the running process. This does not imply any change in the normal reflect behavior. 

You might be thinking about how to monitor the automatic changes made by the reflect behavior. Well, Eon provides a bunch of events, which include the [onPropertyChanged](#!version=latest&mode=tutorial&file=entries%2FIntroduction.md&link=Life-cycle) and [onAttributeChanged](#!version=latest&mode=tutorial&file=entries%2FIntroduction.md&link=Life-cycle) which you can hook to. Also, you can listen to a property value change even if `reflect = false`, setting the property `observe = true`. 

[Life-cycle]<>

Eon components pass through a series of events that determine their life-cycle. Understanding these events is crucial for optimal performance implementation. 

## Sequential events

All sequential events are guaranteed to, trigger only once and in order.

Events by execution order:

- **onCreated** - Triggers on element creation, grants access to custom element properties and functions, note at this point the element has no children since its declarative content is temporally stored as a "source" fragment property and the default component layout is also temporally stored as a "template" fragment property.

- **onInit** - Triggers on element first attach and before its transformation.

- **onTransformed** - Triggers after transform, which mean its template fragment and source fragment has been imported to the dom using element slotting approach.

- **onRender** - Triggers after **ALL** elements have been transformed. This is the main event to define element behavior with trickle flow where parents trigger always before its children.

- **onBubbleRender** - Triggers after **ALL** elements has been transformed and rendered. This is an auxiliary event to define element behavior with an inverse rendering order. Triggers with a bubble flow where children always trigger before its parents.

- **onReady** - Triggers after all events are completed.

## Recurrent events

Recurrent events might be triggered more than once:

- **onResize** - Adds a resize listener element and triggers and gets triggered every time the size changes. 

- **onWindowResize** - Triggers each time window is resized.

- **onAttached** - Triggers each time element is attached to the DOM.

- **onDetached** - Triggers each time element is detached from the DOM.

- **onPropertyChanged** - Triggers each time a property is changed.

- **onAttributeChanged** - Triggers each time an attribute is changed.

- **onDataChanged** - Triggers each time a data property is changed.

- **onLocaleChanged** - Triggers each time a locale property is changed.

Note that all the recurrent events except `onAttached` and `onDetached` events, do not trigger until the element is ready (this means when the `onReady` event has been triggered).

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

## Global Data

Although you can use your data object in any of your components, there might be circunstances in which you might prefer changing your values in one place to affect all the varibles in the same document at the same time, for these scenarios we also provide a global Data object for you to use, this Data will be accesible from Eon, which is its default scope. This scope can be changed easily if desired. this change must be done before Eon is imported:

```[javascript]
<script>
  var eon = {
    interpolation: {
      globalScope: myScope
    }
  }
</script>
```

This scope will also have its corresponding onDataChanged callback.

```[javascript]
<script>
  myScope.onDataChanged(function (keyPath, oldVal, newVal) {
    console.log("Global Data changed.", "Key:", keyPath, ", Previous:", oldVal, ", New:", newVal);
  });
</script>
```

[Interpolation]<>

Eon template engine makes use of interpolation in order to provide a powerful and handy way of data binding and scripting.
This allows components to display changeable data in the right place without having to manually update each value. It also provides logic driven content such as conditional or loop based content. In fact, it so powerful that any javascript logic can be written inside the interpolation tags and it will be executed in a safe sandboxed environment.
 

## Basic Usage

Interpolation is represented by `{{ }}` tags and must be written inside the element template. It's also mandatory to set parse to 'true' on the element config.

Sometimes specific behavior can be triggered with the use of shorthands, these are special tokens that are preceded by `{{`. Examples of this are echo shorthand `{{=` and bind shorthand `{{@`.

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

or as stated, using the shorthand

```[html]
<template>
  Hello {{@ name }}!
</template>
```

This is possible because Eon template engine treats interpolated code as plain javascript, but provides handy functions like bind(data) and echo(string) as well as its respective shorthands which speeds daily development.

Here you also have an example of a global binding:

```[html]
<template>
  Hello {{@global name }}!
</template>
```

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
  Hello {{= "I'm a text" }}!
</template>
```

This would be viewed as 

```
Hello I'm a text!
```

## Scripting

Since Eon template engine treats interpolated code as plain sandboxed javascript you can exploit it to your own advantage and create logic based content.

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

This would output:

```
I'm text1
I'm text2
I'm text1
I'm text2
```

The interpolated code inside a template share the same scope, so it's possible to declare a variable in one block and use it in another.

It's also important to note interpolated code will render only once per element to enhance performance, this won't affect the data bind mechanism.

[Locale]<>

Another object provided by Eon that works exactly as Data does, but it is given with the purpose of having another scope for operations such as changing the language of your document. Combining both Locale and Data you can achieve great results when trying to fill the texts of your application, with locale you could swap the language easily when giving the locale object a new object value, while you could change specific texts or fields when doing the same thing with data.

## Component declaration

As you can see there is no actual difference between data and locale:

```[html]
<script>
eon.element({

  name: "eon-component",

  parse: true,

  locale: {
      color: "Couleur";
      name: "Prénom";
  },

  onLocaleChanged: function (keyPath, oldVal, newVal) {
      console.log("Key:", keyPath, ", Previous:", oldVal, ", New:", newVal);
  }

});
</script>
```

## Binding

The binding process is the same as when using data, but you have to specify we are in the locale context:

```[html]
<template>
  Hello {{@ locale.name }}!
</template>
```

Locale can also work with the global scope and has its own callback to capture the moment in which any property changes:

```[html]
<template>
  Hello {{@global locale.name }}!
</template>
```

```[javascript]
<script>
  myScope.onLocaleChanged(function (keyPath, oldVal, newVal) {
    console.log("Global locale changed.", "Key:", keyPath, ", Previous:", oldVal, ", New:", newVal);
  });
</script>
```

[Slotting]<>

Many Eon elements can act as containers for other elements and some of these elements need to be placed on a specific part of its container structure.
Placing things on a specific place might be easy programmatically through JavaScript but things get messy quickly when we try to do the same declaratively.
Slotting aims to provide a simple solution to place any element inside its Eon container through the attribute `slot` and CSS selectors.

For example, imagine we had a simple container element named 'eon-container':

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
Now let's say we want to place it inside the div with the class eon-container-parent instead. We can do so simply by using the `slot` attribute and a simple CSS selector.

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

[Utilities]<>

Eon provides specific DOM navigation utilities and others. See the core API for more details. Here we expose those which we think are the most relevant:

## Navigation
Eon has its own way to perform DOM queries: 

```[javascript]
// Same as vanilla JS querySelector();
document.$1("custom-element");
// Same as vanilla JS querySelectorAll();
document.$("custom-element");
```

It looks like other frameworks implementation except for the syntax, but what actually makes Eon implementation stands out is its respectful behavior. Eon checks if another framework, imported in the same project, is using the same syntax and, in this case, Eon gives way to perform the query. Otherwise, Eon takes control of the query operation.

If you want Eon to handle all the queries without conflicts, you have the encapsulated version. Just use `eon.$` and `eon.$1`.

In addition, Eon offers a way to navigate through Eon elements. In particular a way to obtain the first Eon parent element: 

```[html]
<body>

  <eon-form>
    <button><button>
  </eon-form>

  <script>
    var button = document.$1("button");
    // This returns the eon-form element
    button.getEnclosingComponent();
    // This returns the eon-form element
    eon.getEnclosingComponent(button);
  </script>

</body>
  
```

This utility is really handy especially when you want to access a parent Eon element from any node, and there's a lot of intermediate elements that do not belong to Eon and extend the path between the node and the target parent. 

## Custom events
Nowadays, building a web application requires full user interaction support, so the presence of events connections has become a necessity. With Eon, create custom events and register callbacks for them is very simple and intuitive.

Eon's custom events creation works with two main functions: 

- `createCallback`: creates a new connectable event for a specific node.
- `triggerCallback`: fires an event, therefore, runs all its registered callbacks.

When a custom event is created, a new function is added to the target element with the name of the event (e.g. event name: "onClick", function name: element.onClick). This function accepts a callback function as a parameter and it registers a new callback every time it is called.

Let's see this in action. In the code below we declare a simple `div` element representing an agenda and a `button` element that will let us interact with it:

```[html]
<body>

  <div id="agenda"><div>

  <button onclick="logContactName()"></button>

</body>

```

Here, we create a custom event called `onBuilt` that will be triggered when all the contacts have been added to the agenda, that is when the agenda has been built.

```[html]
<script>
  var agenda = document.$1("#agenda");
  
  // Create a new event
  eon.createCallback("onBuilt", agenda);
  
  // Add a new contact
  var contact = document.createElement("div");
  contact.innerHTML = "John";
  agenda.appendChild(contact);

  // Fires the onBuilt event
  eon.triggerCallback("onBuilt", agenda);
</script>

```

Now we will declare the function that will log the first contact name every time the button is clicked.

```[javascript]
function logContactName() {
  // Registers a new callback
  agenda.onBuilt(function(){
    // Logs: "John"
    console.log("First contact name: agenda.children[0].innerHTML);
  });
};
```

As you could expect, this functionality works with Eon elements, so, you can create custom events inside an Eon element configuration or elsewhere in your HTML code. 

## Events propagation monitoring
Events bubbling and capturing are powerful behaviors that enrich the way we work with events. It allows us to track the elements involved in an event firing. But, there is a use case where it lacks and it is related to the way some complex elements structure deal with events. Sometimes we need to detect when an element crossways in the path of a mouse/touch event listener of another element. 

Here is when the HTML Event object comes to the rescue with a function called `getComposedPath`. This function returns an Array of the objects on which that event listeners will be invoked. Unluckily, we have no way to detect an element which has no listener for that event, and even if it would do what we want, this implementation is only supported in a few browsers and platforms.

To overcome this complex task, Eon defines the `registerPathListener` function that lets us monitor if an element is on the path of the mouse/touch events. 

```[javascript]
var element = document.$1("div"); 

// Register our 'div' element
eon.registerPathListener(element);

document.addEventListener("click", function(){

  // Is the 'div' on documents click path?
  console.log(element.isOnPath);

});

```

## Custom element navigation
When you are creating your own Eon element you might need to access constantly to its template nodes references across your code. This task could reduce your processing performance. That's why Eon lets you specify which nodes of the templates must be stored as references, decreasing the times you search for them.

```[html]
<style>
  custom-element {
    color: blue;
  }
</style>

<template>
  <div eon-ref="container">
    <div eon-ref="header"></div>
    <div eon-ref="content"></div>
  </div>
</template>

<script>
  eon.element({
    name: "custom-element",

    onCreated: function() {
      // This logs the specified nodes references
      console.log(this.refs.container, this.refs.header, this.refs.content);
    }
  });
</script>
```

As a consequence, these references are available, wherever the element they belong to, is instantiated.