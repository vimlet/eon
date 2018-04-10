var vcomet = vcomet || {};
vcomet.tests = vcomet.tests || {};
vcomet.tests.core = vcomet.tests.core || {
  configBefore: [],
  configBeforeExpected: [
    "config-before1:onCreated",
    "config-before1:onInit",
    "config-before2:onCreated",
    "config-before2:onInit",
    "config-before1:onTransformed",
    "config-before2:onTransformed",
    "config-before1:onRender",
    "config-before2:onRender",
    "config-before2:onBubbleRender",
    "config-before1:onBubbleRender",
    "config-before1:onReady",
    "config-before2:onReady"
  ],
  configAfter: [],
  configAfterExpected: [
    "config-after1:onCreated",
    "config-after2:onCreated",
    "config-after1:onInit",
    "config-after2:onInit",
    "config-after1:onTransformed",
    "config-after2:onTransformed",
    "config-after1:onRender",
    "config-after2:onRender",
    "config-after2:onBubbleRender",
    "config-after1:onBubbleRender",
    "config-after1:onReady",
    "config-after2:onReady"
  ],
  elementBefore: [],
  elementBeforeExpected: [
    "element-before1:onCreated",
    "element-before1:onInit",
    "element-before2:onCreated",
    "element-before2:onInit",
    "element-before1:onTransformed",
    "element-before2:onTransformed",
    "element-before1:onRender",
    "element-before2:onRender",
    "element-before2:onBubbleRender",
    "element-before1:onBubbleRender",
    "element-before1:onReady",
    "element-before2:onReady"
  ],
  elementAfter: [],
  elementAfterExpected: [
    "element-after1:onCreated",
    "element-after2:onCreated",
    "element-after1:onInit",
    "element-after2:onInit",
    "element-after1:onTransformed",
    "element-after2:onTransformed",
    "element-after1:onRender",
    "element-after2:onRender",
    "element-after2:onBubbleRender",
    "element-after1:onBubbleRender",
    "element-after1:onReady",
    "element-after2:onReady"
  ]
};

function isArrayEqual(a1, a2) {
  return JSON.stringify(a1) == JSON.stringify(a2);
}

function loadExpected() {
  // Expected life-cycle visualization
  document.querySelector("#configBeforeExpected").value = JSON.stringify(vcomet.tests.core.configBeforeExpected, null, 2);
  document.querySelector("#configAfterExpected").value = JSON.stringify(vcomet.tests.core.configAfterExpected, null, 2);
  document.querySelector("#elementBeforeExpected").value = JSON.stringify(vcomet.tests.core.elementBeforeExpected, null, 2);
  document.querySelector("#elementAfterExpected").value = JSON.stringify(vcomet.tests.core.elementAfterExpected, null, 2);
}

function createElementRegistrable(name, registry) {

  var el = vcomet.createElement(name, {

    onCreated: function () {
      vcomet.tests.core[registry].push(this.tagName.toLowerCase() + ":onCreated");
    },
  
    onInit: function () {
      vcomet.tests.core[registry].push(this.tagName.toLowerCase() + ":onInit");
    },
  
    onTransformed: function () {
      vcomet.tests.core[registry].push(this.tagName.toLowerCase() + ":onTransformed");
    },
  
    onRender: function () {
      vcomet.tests.core[registry].push(this.tagName.toLowerCase() + ":onRender");
    },
  
    onBubbleRender: function () {
      vcomet.tests.core[registry].push(this.tagName.toLowerCase() + ":onBubbleRender");
    },
  
    onReady: function () {
      vcomet.tests.core[registry].push(this.tagName.toLowerCase() + ":onReady");
    }

  });

  return el;
}

function test() {
  console.log("Test executed!");
  return false;
}