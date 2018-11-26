// TODO
function showNotices(el) {
  var notices = document.querySelector(".noticesPanel");

  if (notices.getAttribute("version") == "noticesSmallDevice") {
    dialogNotices(el);
  } else {
    displayNotices(el);
  }
}

function dialogNotices(el) {
  var noticesContent = document.querySelector(".noticesContent");

  if (el.classList.contains("notifications")) {
    document.querySelector("#dialogNotifications").openDialog();
    noticesContent.setAttribute("dialog", "true");
  } else {
    document.querySelector("#dialogAlerts").openDialog();
    noticesContent.setAttribute("dialog", "true");
  }
}

function displayNotices() {
  var noticesSignpost = document.querySelector(".noticesSignpost");
  var noticesContent = document.querySelector(".noticesContent");
  var expand = document.querySelector(".expand");

  if (noticesContent.getAttribute("visible") == "true") {
    noticesContent.removeAttribute("visible");
    expand.removeAttribute("expand");
  } else {
    noticesContent.setAttribute("visible", "true");
    expand.setAttribute("expand", "true");
  }
}

function noticesResizeListener() {
  var notices = document.querySelector(".noticesPanel");
  notices.onResize(function() {
    verifyResolution();
  });
}

function verifyResolution() {
  var notices = document.querySelector(".noticesPanel");

  // Tablet view
  if (
    window.innerWidth <= eon.tabletWidth &&
    window.innerWidth > eon.mobileWidth
  ) {
    noticesSmallDevice(notices);
    // Mobile view
  } else if (window.innerWidth <= eon.mobileWidth) {
    noticesSmallDevice(notices);
    // Desktop view
  } else {
    noticesDesktop(notices);
  }
}

function noticesSmallDevice(notices) {
  var noticesContent = document.querySelector(".noticesContent");

  notices.setAttribute("version", "noticesSmallDevice");

  if (noticesContent.getAttribute("visible") == "true") {
    noticesContent.removeAttribute("visible");
  }
}

function noticesDesktop(notices) {
  var noticesContent = document.querySelector(".noticesContent");
  var dialogNotifications;
  var dialogAlerts;

  notices.setAttribute("version", "desktop");

  if (noticesContent.getAttribute("dialog") == "true") {
    dialogNotifications = document.querySelector("#dialogNotifications");
    dialogAlerts = document.querySelector("#dialogAlerts");

    dialogNotifications.closeDialog();
    dialogAlerts.closeDialog();
    noticesContent.removeAttribute("dialog");
  }
}
