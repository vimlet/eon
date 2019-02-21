# Dialog

## Introduction

The emerging component eon-dialog can contain text and other eon components or HTML components.
The basic dialog consists of a container, but it is possible to add header and footer, which will contain the close button.

To use it import eon-dialog in the head of the HTML document:
``` [html]
<head>
  <script>
    eon.import("/eon/ui/eon-dialog.html");
  </script>
<head>
```

## Declarative usage

The eon-dialog created declaratively is composed by eon-section to add the content and footer.

To indicate that the eon-section will contain the content of the dialog it is necessary to add the attribute `type="content"`, and to indicate that it will contain the footer add the attribute `type="footer"`.

``` [html]
<eon-dialog id="myDialog" heading="Dialog test">
  <eon-section type="content">
    <span>My dialog content</span>
  </eon-section>
  <eon-section type="footer">
    <eon-button value="OK" onclick="alert('¡Hey!');"></eon-button>
  </eon-section>
</eon-dialog>

<!-- Trigger button-->
<eon-button label="SHOW" onclick="document.querySelector('#myDialog').open()"></eon-button>
```

## Programmatic usage

Unlike eon-dialog created declaratively, programmatic eon-dialog does not need eon-section. To interact with the content and the footer only need to use the object `content` and `footer`.

``` [javascript]
eon.onReady(function () {
  // Create eon-dialog
  var myDialog = document.createElement("eon-dialog");
  var myContent = document.createElement("span");
  var myButton = document.createElement("eon-button");

  // Set properties
  myDialog.heading = "Dialog Test";
  // To make the footer visible programmatically this property with `true` value is necessary
  myDialog.hasFooter = "true";
  myContent.innerHTML = "Programmatic dialog content";
  myButton.label = "OK";

  // Add the content and the footer to the eon-dialog
  myDialog.content.appendChild(myContent);
  myDialog.footer.appendChild(myButton);

  // Append eon-dialog
  document.querySelector("body").appendChild(myDialog);

});
```

``` [html]
<!-- Trigger button-->
<eon-button value="SHOW" onclick="document.querySelector('#myDialog').open()" expand="inline"></eon-button>
``` 

## Examples

### Interactive dialog
Using different eon-dialog properties it can be draggable, resizable, maximizable, minimizable and it can be closed if it loses focus.
It also possible to establish maximum or minimum height and width using eon-dialog properties.

``` [html]
<eon-dialog id="myDialog" heading="You can:" max-width="400" max-height="400" drag="true" maximize="true" minimize="true" resize="true" blur="true">
  <eon-section type="content">
    <p>Resize me</p>
    <p>Drag me</p>
    <p>Minimize me</p>
    <p>Maximize me</p>
  </eon-section>
</eon-dialog>

<!-- Trigger button-->
<eon-button value="SHOW" onclick="document.querySelector('#myDialog').open()" ></eon-button>
```

### Containing others components
This example shows a eon-dialog containing eon-form components. 

``` [html]
<eon-dialog id="myDialog" modal="true" heading="Login">
  <eon-section type="content">
    <eon-form action="#" method="get">
      <eon-text name="userName" type="text" placeholder="User name" label="User name" ></eon-text>
      <eon-text name="userPass" type="Password" placeholder="Password" label="Password"></eon-text>
      <eon-button type="submit" value="Sign in" expand="full"></eon-button>
    </eon-form>
  </eon-section>
</eon-dialog>

<!-- Trigger button-->
<eon-button value="LOGIN" onclick="document.querySelector('#myDialog').open()" ></eon-button>
```


### Dynamically content dialog
Dynamically it is possible to modify the content and footer with its objects. Also, there are different callbacks that can be very useful. 

In this example first creates the dialog declaratively and then programmatically changes the content and adds the footer.
``` [html]
<eon-dialog id="myDialog" max-width="250" min-height="100">
  <eon-section type="content">
    <span>This content will change</span>
  </eon-section>
</eon-dialog>

<!-- Trigger button-->
<eon-button value="SHOW" onclick="document.querySelector('#myDialog').open()" ></eon-button>
```

``` [javascript]
eon.onReady(function () {
  var myDialog = document.querySelector("#myDialog");
  var newContent = document.createElement("span");
  var newButton = document.createElement("eon-button");

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
