# Dialog

## Introduction

The emerging component vc-dialog can contain text and other eon components or HTML components.
The basic dialog consists of a container, but it is possible to add header and footer, which will contain the close button.

To use it import vc-dialog in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/vc-dialog.html");
  </script>
<head>
```

## Declarative usage

The vc-dialog created declaratively is composed by vc-section to add the content and footer.

To indicate that the vc-section will contain the content of the dialog it is necessary to add the attribute `type="content"`, and to indicate that it will contain the footer add the attribute `type="footer"`.

``` [html]
<vc-dialog id="myDialog" heading="Dialog test">
  <vc-section type="content">
    <span>My dialog content</span>
  </vc-section>
  <vc-section type="footer">
    <vc-button value="OK" onclick="alert('¡Hey!');"></vc-button>
  </vc-section>
</vc-dialog>

<!-- Trigger button-->
<vc-button label="SHOW" onclick="document.querySelector('#myDialog').open()"></vc-button>
```

## Programmatic usage

Unlike vc-dialog created declaratively, programmatic vc-dialog does not need vc-section. To interact with the content and the footer only need to use the object `content` and `footer`.

``` [javascript]
eon.onReady(function () {
  // Create vc-dialog
  var myDialog = document.createElement("vc-dialog");
  var myContent = document.createElement("span");
  var myButton = document.createElement("vc-button");

  // Set properties
  myDialog.heading = "Dialog Test";
  // To make the footer visible programmatically this property with `true` value is necessary
  myDialog.hasFooter = "true";
  myContent.innerHTML = "Programmatic dialog content";
  myButton.label = "OK";

  // Add the content and the footer to the vc-dialog
  myDialog.content.appendChild(myContent);
  myDialog.footer.appendChild(myButton);

  // Append vc-dialog
  document.querySelector("body").appendChild(myDialog);

});
```

``` [html]
<!-- Trigger button-->
<vc-button value="SHOW" onclick="document.querySelector('#myDialog').open()" expand="inline"></vc-button>
``` 

## Examples

### Interactive dialog
Using different vc-dialog properties it can be draggable, resizable, maximizable, minimizable and it can be closed if it loses focus.
It also possible to establish maximum or minimum height and width using vc-dialog properties.

``` [html]
<vc-dialog id="myDialog" heading="You can:" max-width="400" max-height="400" drag="true" maximize="true" minimize="true" resize="true" blur="true">
  <vc-section type="content">
    <p>Resize me</p>
    <p>Drag me</p>
    <p>Minimize me</p>
    <p>Maximize me</p>
  </vc-section>
</vc-dialog>

<!-- Trigger button-->
<vc-button value="SHOW" onclick="document.querySelector('#myDialog').open()" ></vc-button>
```

### Containing others components
This example shows a vc-dialog containing vc-form components. 

``` [html]
<vc-dialog id="myDialog" modal="true" heading="Login">
  <vc-section type="content">
    <vc-form action="#" method="get">
      <vc-text name="userName" type="text" placeholder="User name" label="User name" ></vc-text>
      <vc-text name="userPass" type="Password" placeholder="Password" label="Password"></vc-text>
      <vc-button type="submit" value="Sign in" expand="full"></vc-button>
    </vc-form>
  </vc-section>
</vc-dialog>

<!-- Trigger button-->
<vc-button value="LOGIN" onclick="document.querySelector('#myDialog').open()" ></vc-button>
```


### Dynamically content dialog
Dynamically it is possible to modify the content and footer with its objects. Also, there are different callbacks that can be very useful. 

In this example first creates the dialog declaratively and then programmatically changes the content and adds the footer.
``` [html]
<vc-dialog id="myDialog" max-width="250" min-height="100">
  <vc-section type="content">
    <span>This content will change</span>
  </vc-section>
</vc-dialog>

<!-- Trigger button-->
<vc-button value="SHOW" onclick="document.querySelector('#myDialog').open()" ></vc-button>
```

``` [javascript]
eon.onReady(function () {
  var myDialog = document.querySelector("#myDialog");
  var newContent = document.createElement("span");
  var newButton = document.createElement("vc-button");

  newContent.innerHTML = "This is the new dynamically dialog content";
  newButton.label = "New button";

  // When the dialog is opened the functionality will be executed
  myDialog.onOpen(function () {
    myDialog.hasFooter = "true";
    myDialog.content.appendChild(newContent);
    myDialog.footer.appendChild(newButton);
  });

});
```
