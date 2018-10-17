# Radio

## Introduction
Selectable form component that depends on eon-group.

If this component was to be used alone it would be needed to import it. But if it would be used among other eon-radio components inside a eon-group it won't be necessary to import this components as eon-group will take care of that.
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-radio.html");
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

## Examples

### Enable and check dynamically
In this example one of the eon-radio is disabled and other is checked, but after a second the disabled and unchecked radio will be enable and checked.
``` [html]
<eon-group name="myGroup">
  <!-- Initially radio checked -->
  <eon-radio label="Radio 1" value="myRadio1" check="true"></eon-radio>
  <!-- Initially radio disabled -->
  <eon-radio id="myRadio2" label="Radio 2" value="myRadio2" disabled="true"></eon-radio>
</eon-group>
```

``` [javascript]
eon.onReady(function () {
  var myRadio2 = document.querySelector("#myRadio2");

  setTimeout(function () {
    // Set new values of properties
    myRadio2.check = true;
    myRadio2.disabled = false;
  }, 1000);
});
```
