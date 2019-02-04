## Data introduction

Every Eon component may have its own data property, with consists of an object with keys specified by the user, these properties will be redefined to have `getters/setters` created with [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) , and since this object is `immutable` its properties must be declared from the start and any new property assigned later on wont be taken into account. These setters will allow us to detect any changes on the properties and notify the user with our `onDataChanged` callback.

Lets set an eon component as an example with a basic and simple data declaration:

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

If we then change the color property, our `onDataChanged` callback will get fired bringing us the next log:

```[html]
<script>
var component = document.querySelector("eon-component");
component.data.color = "Red";
</script>
```
```
Key: color , Previous: Blue , New: Red
```

We have earlier said that the data object is immutable, but you can change the initial object declaration by setting and changing the whole Data property, this will restart the Data object and also trigger the onDataChanged callback for every property own by the previous data and the new ones given by the new one:

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

Since `setters/getters` cannot listen to changes made by pushing/removing new items to arrays or adding new properties to an object, in those cases the whole property must be changed, lets take the following data example:

```[html]
<script>
eon.element({

  name: "eon-component",

  parse: true,

  data: {;
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

If we now want to add a new key to the pet object property and still have it properly defined and taken into account, we have to reassign the whole object with the new key:

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







