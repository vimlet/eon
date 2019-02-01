# Using Components
In this tutorial we are going to make a simple To-Do List to teach you about some of the most basic components Eon offers, and to show you how easy it is getting used to them.

## Import components
To create the To-Do List we are going to use 4 components only:  `eon-text`, `eon-button`, `eon-checkbox` and `eon-scroll`. The first thing do is import them into the html file:

```[html]
<script>
    eon.import([
        "eon/ui/eon-text.html",
        "eon/ui/eon-button.html",
        "eon/ui/eon-checkbox.html",
        "eon/ui/eon-scroll.html"
    ]);
</script>
```

Since we need to import multiple components we are passing an `Array` with their paths, but you can also pass a single `String` path if you only want to import one.

 ## Setting up the main structure
 We are going to start by declaring the main `html` structure and the static Eon components that will be loaded with the document, that is, those that are not created dynamically by the user interaction.

```[html]
<body>
  <!-- Input text where we will type the new items text -->
  <eon-text type="text" label="To-Do list" placeholder="New Item"></eon-text>

  <!-- Button to add items. In the onclick attribute we name the function to add new items -->
  <eon-button expand="inline" value="Add" onclick="addItem();"></eon-button>

  <!-- Scroll component that will allow us to scroll through our list -->
  <eon-scroll thickness="5" fill="false">
    <!-- Our items list -->
    <div class="list"></div>
  </eon-scroll>
</body>
```

As you can see we have prepared a basic structure for our `To-Do List` including the next elements:
- a `scroll` component to let us scroll through out list
- a `text` component where the user will type the new items text
- a `button` component to add the new items to the list

If you take a closer look you might find some `attributes` you have never seen before, these are `exclusive` for each type of components and will let us configure the behavior we want for the components, for instance, you can see that in the scroll element we have added two attributes: `thickness` and `fill`; the value of `thickness` will determine the size of the scroll bars, while the value of `fill` will tell the scroll if we want it to fill the size of its parent or it will have its own size.

 ## The logic
 Once we have built the main structure, it's time to establish the logic that will let us add the list items.


 The button for adding the new items will trigger the `addItem()` function, which will store the eon-text input value, create the new item and append it to the list.
``` [javascript]
  function addItem() {
    // Store the eon-text input value
    var text = document.querySelector("eon-text");
    var textValue = text.value;

    // Denied empty values
    if (textValue != "") {
      // Create item
      var item = createItem(textValue);

      // Append item to the list
      appendItem(item);

      // Reset the eon-text value
      text.reset();
    }
  }
}
```
Let's going deep into the previous function operations to see things clearly:


First, we are calling the `createItem` function that will dynamically create two components that will shape the list item, as well
as their interaction logic: an `eon-button` which will allow us to remove an item and a `eon-checkbox` which will let us mark an item as done.
To use Eon programmatically we will do it inside the onReady event, ensuring that all the functionalities are loaded in the document:

``` [javascript]
function createItem(itemText) {
  // Make sure all eon elements are ready
  eon.onReady(function () {
    var item = document.createElement("div");
    // Create item status checkbox
    var statusCheck = document.createElement("eon-checkbox");
    // Set up checkbox
    statusCheck.classList.add("checkboxItem");
    statusCheck.label = itemText;
    statusCheck.inline = true;

    // Create the button that will delete the item
    var removeBtn = document.createElement("eon-button");
    removeBtn.vicon = "vicon-bin";
    // Button click listener
    removeBtn.onclick = function(){
      // Remove item
      item.parentNode.removeChild(item);
    };
    
    // Append content
    item.appendChild(statusCheck);
    item.appendChild(removeBtn);
    return item;
  });
}
```

In this function we are going to insert the new item at the beginning of the list:
``` [javascript]
function appendItem(item) {
  var list = document.querySelector(".list");
  // Inserts the new item at the beginning of the list
  list.insertBefore(item, list.children[0]);
}
```
To conclude let's add the basic style to represent correctly the scrolling list and the items checked as done:

```[html]
<style>
  eon-scroll {
    height: 500px;
  }
  .list eon-checkbox[checked="true"] {
    text-decoration: line-through;
  }
</style>
```
