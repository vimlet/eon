# Radiogroup

## Introduction
This form component is meant to contain different vc-radio components. Only one of them will be selectable.

To use it import vc-radiogroup in the head of the HTML document:
``` [html]
<head>
  <script>
    vComet.import("/vComet/ui/vc-radiogroup.html");
  </script>
<head>
```

## Declarative usage
``` [html]
<vc-radiogroup name="myRadiogroup">
  <vc-radio label="Radio 1" value="myRadio1"></vc-radio>
  <vc-radio label="Radio 2" value="myRadio2"></vc-radio>
</vc-radiogroup>
```

## Programmatic usage
``` [javascript]
vcomet.onReady(function () {
  // Create vc-radiogroup and vc-radio 
  var myRadiogroup = document.createElement("vc-radiogroup");
  var myRadio1 = document.createElement("vc-radio");
  var myRadio2 = document.createElement("vc-radio");

  // Set property and append vc-radiogroup
  myRadiogroup.name = "myRadiogroup";
  document.querySelector(".example").appendChild(myRadiogroup);

  // Set properties of myRadio1
  myRadio1.label = "Radio 1";
  myRadio1.value = "myRadio1";
      
  // Set properties of myRadio2
  myRadio2.label = "Radio 2";
  myRadio2.value = "myRadio2";

  // Append all vc-checkbox
  myRadiogroup.appendChild(myRadio1);
  myRadiogroup.appendChild(myRadio2);
});
```
