# Group

## Introduction
This form component is meant to contain different eon-radio components. Only one of them will be selectable.

To use it import eon-group in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-group.html");
  </script>
<head>
```

## Declarative usage
``` [html]
<eon-group name="myGroup">
  <eon-radio label="Radio 1" value="myRadio1"></eon-radio>
  <eon-radio label="Radio 2" value="myRadio2"></eon-radio>
</eon-group>
```

## Programmatic usage
``` [javascript]
eon.onReady(function () {
  // Create eon-group and eon-radio 
  var myGroup = document.createElement("eon-group");
  var myRadio1 = document.createElement("eon-radio");
  var myRadio2 = document.createElement("eon-radio");

  // Set property and append eon-group
  myGroup.name = "myGroup";
  document.querySelector(".example").appendChild(myGroup);

  // Set properties of myRadio1
  myRadio1.label = "Radio 1";
  myRadio1.value = "myRadio1";
      
  // Set properties of myRadio2
  myRadio2.label = "Radio 2";
  myRadio2.value = "myRadio2";

  // Append all eon-checkbox
  myGroup.appendChild(myRadio1);
  myGroup.appendChild(myRadio2);
});
```
