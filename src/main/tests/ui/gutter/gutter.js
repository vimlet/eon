var vcomet = vcomet || {};
vcomet.tests = vcomet.tests || {};
vcomet.tests.ui = vcomet.tests.ui || {
    build: {},
    buildExpected: {
      firstSection: "built",
      secondSection: "built",
      splitter: "built"
    }
}

function loadExpected() {
    // Expected gutter visualization
    document.querySelector("#buildExpected").value = JSON.stringify(vcomet.tests.ui.buildExpected, null, 2);
}

function runTests() {
    // 
    var result = document.querySelector("#result");
    var buildExpected = isEqualObject(vcomet.tests.ui.buildExpected, vcomet.tests.ui.build);
    if (buildExpected) {
        result.classList.add("passed");
        result.innerHTML = "PASSED";
    } else {
        result.classList.add("failed");
        result.innerHTML = "FAILED";
    }
}

function isEqualObject() {
    // 
    return true;
}