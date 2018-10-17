var swap = true;

function addElement() {
  var el;

  if (swap) {
    el = document.createElement("vc-test1");
    swap = false;
  } else {
    el = document.createElement("vc-test2");
    swap = true;
  }

  document.querySelector("#eventsExample1").appendChild(el);
}

function addNestedElement() {
  var el, child;

  if (swap) {
    el = document.createElement("vc-test1");
    child = document.createElement("vc-test2");
    child2 = document.createElement("vc-test3");
    child.appendChild(child2);

    swap = false;
  } else {
    el = document.createElement("vc-test2");
    child = document.createElement("vc-test1");
    child2 = document.createElement("vc-test3");
    child.appendChild(child2);

    swap = true;
  }

  el.appendChild(child);

  document.querySelector("#eventsExample1").appendChild(el);
}

function removeElement() {
  var example1 = document.querySelector("#eventsExample1");
  var example2 = document.querySelector("#eventsExample2");

  var el = example2.children[example2.children.length - 1];

  if (example2.children.length == 0) {
    el = example1.children[example1.children.length - 1];
  }

  if (el) {
    el.parentNode.removeChild(el);
  }
}

function moveElement() {
  var example1 = document.querySelector("#eventsExample1");
  var el = example1.children[example1.children.length - 1];

  if (el) {
    document.querySelector("#eventsExample2").appendChild(el);
  }
}

function changeObservedProperty() {
  var el = document.querySelector("#observedExample vc-test1");

  el.onPropertyChanged(function(key, oldVal, newVal) {
    console.log("Property: " + [key, oldVal, newVal]);
    this.innerHTML = newVal;
  });

  el.onAttributeChanged(function(key, oldVal, newVal) {
    console.log("Attribute: " + [key, oldVal, newVal]);
    this.innerHTML = newVal;
  });

  el.a = "observed";
}

function changeReflectProperty() {
  var el = document.querySelector("#reflectExample vc-test1");

  el.onPropertyChanged(function(key, oldVal, newVal) {
    console.log("Property: " + [key, oldVal, newVal]);
    this.innerHTML = newVal;
  });

  el.onAttributeChanged(function(key, oldVal, newVal) {
    console.log("Attribute: " + [key, oldVal, newVal]);
    this.innerHTML = newVal;
  });

  el.b = "reflect";
}

function changeReflectAttribute() {
  var el = document.querySelector("#reflectExample vc-test1");

  console.dir(el);

  el.onPropertyChanged(function(key, oldVal, newVal) {
    console.log("Property: " + [key, oldVal, newVal]);
    this.innerHTML = newVal;
  });

  el.onAttributeChanged(function(key, oldVal, newVal) {
    console.log("Attribute: " + [key, oldVal, newVal]);
    this.innerHTML = newVal;
  });

  el.setAttribute("b", "reflect");
}

function toggleAdapterDebug(checkbox) {
  vcomet.debug.adapterEvents = checkbox.checked;
}

function toggleConfigDebug(checkbox) {
  vcomet.debug.configEvents = checkbox.checked;
}

function toggleElementDebug(checkbox) {
  vcomet.debug.elementEvents = checkbox.checked;
}
