# Using Components
In this tutorial we are going to make a simple To-Do List to teach you about some of the most basic components Eon offers, and to show you how easy it is getting used to them.

## Setting up our custom component

To create the To-Do List we will create a custom component named `todo-list`, this will encapsulate our functionality to deal with it as a single item separated from the rest of the application functionality block. Our component depends on another 4 basic Eon components: `eon-text`, `eon-button`, `eon-checkbox` and `eon-scroll`. 

```[html]
<script>
  eon.element({
    name: "eon-todo",
    // Our custom component dependencies
    // ** Make sure you set the relative path for each of the dependencies
    dependencies: [
      "../../ui/eon-scroll",
      "../../ui/eon-button",
      "../../ui/eon-text",
      "../../ui/eon-checkbox"
    ]
    //...
  })
</script>
```

In this example we are following the single source truth practice. This means that only the modifications on the list data, stored in a single source, will cause a reaction on the layout components and not the other way around.


Been said that, it is too easy to take advantage of this methodology since Eon give us a way of observe changes on our component `data` property:

``` [javascript]
//...
data: {
  items: []
},
onDataChanged: function (key) {
  if (key == "items") {
    // ...
  }
}
//...
```
Once set up our custom component, let's start building its main structure:

```[html]
<template>
  <!-- Input text where we'll type the new items text -->
  <eon-text type="text" label="To-Do list" placeholder="New Item"></eon-text>

  <!-- Button to add items. In the onclick attribute we name the function to add new items -->
  <eon-button expand="inline" value="Add"></eon-button>

  <!-- Scroll component that will allow us to scroll through our list -->
  <eon-scroll thickness="5" fill="false">
    <!-- Our items container -->
    <div class="list"></div>
  </eon-scroll>
</template>
```

As you can see we have prepared a basic structure for our `To-Do List` component including the next elements:
- a `scroll` component to let us scroll through out list
- a `text` component where the user will type the new items text
- a `button` component to add the new items to the list

If you take a closer look at the components declaration you might find some `attributes` you have never seen before, these are `exclusive` for each type of components and will let us configure the behavior we want for the components, for instance, you can see that in the scroll element we have added two attributes: `thickness` and `fill`; the value of `thickness` will determine the size of the scroll bars, while the value of `fill` will tell the scroll if we want it to fill the size of its parent or it will have its own size.

Since we need to import multiple components we are passing an `Array` with their paths, but you can also pass a single `String` path if you only want to import one.


## The logic
Now we have built the main structure and set up the environment, it's time to add the logic to our `todo-list` component. To see the `todo-list` full code go to the end of this example.

The button for adding the new items will trigger the `component.addItem()` function, which will store the eon-text input value and create a new item object that will be added to our source data.

``` [javascript]
addItem: function (itemText) {
  var el = this;
  // Create the new item object
  var item = {
    text: itemText,
    checked: false
  }
  // Push the item to the data source
  el.data.items.push(item);
  // Needed to trigger a data change
  el.data.items = el.data.items;
}
```
Now, we are going to implement what is going to happen when the data source change. The function below will be called on the `onDataChange` event fire:

``` [javascript]
paint: function () {
  var el = this;
  var fragment = document.createDocumentFragment();
  // Loop through data items
  for (var i = 0; i < el.data.items.length; i++) {
    // Create item representation
    var item = el._createItem(el.data.items[i]);
    fragment.appendChild(item);
  }
  // Empty list old items
  el._refs.list.innerHTML = "";
  el._refs.list.appendChild(fragment);
  // Reset the eon-text value
  el._refs.text.reset();
}
```

Let's see what it's happening on this function:

- First, we loop through the data items and call the `component.createItem` for each one. The elements that will shape each item list are: an `eon-button` which will allow us to remove an item and a `eon-checkbox` which will let us mark an item as done (see code at the end of this example).
- Then, we remove the old list items and append the new ones.

That's how we make our components react to data source changes.

To conclude, let's import our new custom component to our application `index.html`:

``` [html]
<head>
 <!-- Import eon.js -->
  <script src="eon/eon.js"></script>
  <!-- Import eon components -->
  <script>
    eon.import([
      "eon/custom/todo-list"
    ]);
  </script>
</head>

<body>
  // Our independent and reusable To-Do List component
  <eon-todo></eon-todo>  
</body>
```

** Here is the full `todo-list` component code:

``` [html]
<template>
  <!-- Input text where we'll type the new items text -->
  <eon-text type="text" label="To-Do list" placeholder="New Item"></eon-text>

  <!-- Button to add items. In the onclick attribute we name the function to add new items -->
  <eon-button expand="inline" value="Add"></eon-button>

  <!-- Scroll component that will allow us to scroll through our list -->
  <eon-scroll thickness="5" fill="false">
    <!-- Our items container -->
    <div class="list"></div>
  </eon-scroll>
</template>

<script>
  eon.element({

    name: "eon-todo",
    style: "eon-todo.css",

    dependencies: [
      "../../ui/eon-scroll",
      "../../ui/eon-button",
      "../../ui/eon-text",
      "../../ui/eon-checkbox"
    ],

    data: {
      items: []
    },

    privateProperties: {
      /*
        @property (private) {Object} _refs
        @description Object with useful information
      */
      refs: {
        value: {},
        reflect: false
      }
    },

    functions: {
      /*
        Push item to the data source array
      */
      addItem: function (itemText) {
        var el = this;
        // Create the new item object
        var item = {
          text: itemText,
          checked: false
        }
        // Push the item to the data source
        el.data.items.push(item);
        // Needed to trigger a data change
        el.data.items = el.data.items;
      }
    },

    privateFunctions: {
      /*
        Create list item
      */
      createItem: function (data) {
        var el = this;
        var item = document.createElement("div");
        // Create item status checkbox
        var statusCheck = document.createElement("eon-checkbox");
        // Set up checkbox
        statusCheck.classList.add("checkboxItem");
        statusCheck.label = data.text;
        statusCheck.inline = true;
        statusCheck.checked = data.checked;

        statusCheck.onChange(function(value){
          data.checked = value;
        });

        // Create the button that will delete the item
        var removeBtn = document.createElement("i");
        removeBtn.classList.add("vicon", "vicon-bin");
        // Button click listener
        removeBtn.onclick = function () {
          // Remove item
          el.data.items.splice(el.data.items.indexOf(data), 1);
          el.data.items = el.data.items;
        };

        // Append content
        item.appendChild(removeBtn);
        item.appendChild(statusCheck);
        return item;
      },
      /*
        Append list items
      */
      paint: function () {
        var el = this;
        var fragment = document.createDocumentFragment();
        // Loop through data items
        for (var i = 0; i < el.data.items.length; i++) {
          // Create item representation
          var item = el._createItem(el.data.items[i]);
          fragment.appendChild(item);
        }
        // Empty list old items
        el._refs.list.innerHTML = "";
        el._refs.list.appendChild(fragment);
        // Reset the eon-text value
        el._refs.text.reset();
      }
    },
    /*
      Set up add item button functionality 
    */
    onCreated: function () {
      var el = this;
      // References
      el._refs.text = el.template.querySelector("eon-text");
      el._refs.addBtn = el.template.querySelector("eon-button");
      el._refs.list = el.template.querySelector(".list");
      // Add button click listener
      el._refs.addBtn.onclick = function () {
        if(el._refs.text.value){
          el.addItem(el._refs.text.value);
        }
      };
    },
    /*
      Monitor source data changes
    */
    onDataChanged: function (key) {
      if (key == "items") {
        // Paint list
        this._paint();
      }
    }
  });
</script>
```