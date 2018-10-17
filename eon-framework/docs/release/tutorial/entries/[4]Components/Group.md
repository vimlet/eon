# Group

## Introduction
This form component is meant to contain different vc-radio components. Only one of them will be selectable.

To use it import vc-group in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/vc-group.html");
  </script>
<head>
```

## Declarative usage
``` [html]
<vc-group name="myGroup">
  <vc-radio label="Radio 1" value="myRadio1"></vc-radio>
  <vc-radio label="Radio 2" value="myRadio2"></vc-radio>
</vc-group>
```

## Programmatic usage
``` [javascript]
eon.onReady(function () {
  // Create vc-group and vc-radio 
  var myGroup = document.createElement("vc-group");
  var myRadio1 = document.createElement("vc-radio");
  var myRadio2 = document.createElement("vc-radio");

  // Set property and append vc-group
  myGroup.name = "myGroup";
  document.querySelector(".example").appendChild(myGroup);

  // Set properties of myRadio1
  myRadio1.label = "Radio 1";
  myRadio1.value = "myRadio1";
      
  // Set properties of myRadio2
  myRadio2.label = "Radio 2";
  myRadio2.value = "myRadio2";

  // Append all vc-checkbox
  myGroup.appendChild(myRadio1);
  myGroup.appendChild(myRadio2);
});
```
