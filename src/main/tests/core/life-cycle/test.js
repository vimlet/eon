var vcomet = vcomet || {};
vcomet.tests = vcomet.tests || {};
vcomet.tests.core = vcomet.tests.core || {
  configLifeCycle: [],
  elementLifeCycle: [],
  configLifeCycleExpected: [
    "vc-el1:onCreated",
    "vc-el1:onInit",
    "vc-el2:onCreated",
    "vc-el2:onInit",
    "vc-el1:onTransformed",
    "vc-el2:onTransformed",
    "vc-el1:onRender",
    "vc-el2:onRender",
    "vc-el2:onBubbleRender",
    "vc-el1:onBubbleRender",
    "vc-el1:onReady",
    "vc-el2:onReady"
  ],
  elementLifeCycleExpected: [
    "vc-el3:onCreated",
    "vc-el3:onInit",
    "vc-el4:onCreated",
    "vc-el4:onInit",
    "vc-el3:onTransformed",
    "vc-el4:onTransformed",
    "vc-el3:onRender",
    "vc-el4:onRender",
    "vc-el4:onBubbleRender",
    "vc-el3:onBubbleRender",
    "vc-el3:onReady",
    "vc-el4:onReady"
  ],
};

function testConfigLifeCycle(cb) {
  vcomet.onReady(function () {
    try {
      var configExpected = JSON.stringify(vcomet.tests.core.configLifeCycleExpected);
      var configCurrent = JSON.stringify(vcomet.tests.core.configLifeCycle);
      cb(null, configExpected == configCurrent);
    } catch (error) {
      cb(error, false)
    }
  });
}

function testElementLifeCycle(cb) {
  vcomet.onReady(function () {
    try {
      var elementExpected = JSON.stringify(vcomet.tests.core.elementLifeCycleExpected);
      var elementCurrent = JSON.stringify(vcomet.tests.core.elementLifeCycle);
      cb(null, elementExpected == elementCurrent);
    } catch (error) {
      cb(error, false)
    }
  });
}

function test(cb) {
  testConfigLifeCycle(function (error, configResult) {
    if (error) {
      cb(error, configResult);
    } else {
      testElementLifeCycle(function (error, elementResult) {
        if (error) {
          cb(error, elementResult);
        } else {
          if (configResult && elementResult) {
            cb(null, true);
          } else {
            cb(null, false);
          }
        }
      });
    }
  });
}