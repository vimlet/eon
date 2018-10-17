var data = {};

data.loadedContent = "";

// NAVIGABILITY

function logout() {
  window.location.pathname = "/dms";
}

function htmlAjaxCall(file, el) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", file, true);
  xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return;
    if (this.status !== 200) return;

    var contentWrapper = document.createElement("div");
    var fragment = document
      .createRange()
      .createContextualFragment(this.responseText);

    el.appendChild(fragment);

    setTimeout(function() {
      el.style.display = "block";

      hideLoadingMask();
    }, 300);
  };
  xhr.send();
}

function loadContent(id, url) {
  if (data.loadedContent != id) {
    var el = document.querySelector("#" + id);

    if (
      window.innerWidth <= eon.tabletWidth ||
      window.innerWidth <= eon.mobileWidth
    ) {
      document.querySelector("eon-drawer").close();
    }

    // updateColor(id, colors[id]);
    hideLoaded();
    showLoadingMask();

    if (el.innerHTML == "") {
      htmlAjaxCall(url, el);
    } else {
      showLoaded(el);
    }

    data.loadedContent = id;
  }
}

// Functions used to toggle the desired content
function showLoaded(el) {
  setTimeout(function() {
    el.style.display = "block";
    hideLoadingMask();
  }, 300);
}

function hideLoaded() {
  var contents = document.querySelectorAll(
    "#contentWrapper div[type='content']"
  );
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
}

// Loading Mask related functions
function showLoadingMask() {
  var loadingMask = document.querySelector("eon-loadingmask");

  loadingMask.onReady(function() {
    loadingMask.showMask();
  });
}

function hideLoadingMask() {
  var loadingMask = document.querySelector("eon-loadingmask");

  loadingMask.onReady(function() {
    loadingMask.hideMask();
  });
}
