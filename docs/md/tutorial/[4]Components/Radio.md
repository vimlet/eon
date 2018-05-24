# Radio

## Introduction
Selectable form component that depends on vc-group.

If this component was to be used alone it would be needed to import it. But if it would be used among other vc-radio components inside a vc-group it won't be necessary to import this components as vc-group will take care of that.
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-radio.html");
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
vcomet.onReady(function () {
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

## Examples

### Enable and check dynamically
In this example one of the vc-radio is disabled and other is checked, but after a second the disabled and unchecked radio will be enable and checked.
``` [html]
<vc-group name="myGroup">
  <!-- Initially radio checked -->
  <vc-radio label="Radio 1" value="myRadio1" check="true"></vc-radio>
  <!-- Initially radio disabled -->
  <vc-radio id="myRadio2" label="Radio 2" value="myRadio2" disabled="true"></vc-radio>
</vc-group>
```

``` [javascript]
vcomet.onReady(function () {
  var myRadio2 = document.querySelector("#myRadio2");

  setTimeout(function () {
    // Set new values of properties
    myRadio2.check = true;
    myRadio2.disabled = false;
  }, 1000);
});
```
