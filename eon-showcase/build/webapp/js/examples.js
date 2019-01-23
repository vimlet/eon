/* EXAMPLE SPECIFICS */

function othersInitialize(){
  eon.onReady(function () {
    /* Loader */
    runLoader();
    runEaseProgress();
    /* Search bar */
    document.querySelector(".onlyInput").onSearch(function (filters) {
      var name = filters.name;
      // Get colors
      var toFilterChildren = document.querySelector(".d-searchbar-colors").children;
      // Show filtered colors
      for (var i = 0; i < toFilterChildren.length; i++) {
        if (toFilterChildren[i].getAttribute("value").toLowerCase().indexOf(name.toLowerCase()) > -1) {
          toFilterChildren[i].classList.add("d-search-item-visible");
        } else {
          toFilterChildren[i].classList.remove("d-search-item-visible");
        }
      }
    });
  });
}

/* DRAWER */
function slideInDrawer(id) {
  var drawer = document.querySelector("#" + id);
  drawer.show();
}
/* PANEL */
function renderLazy() {
  document.querySelector("#d-lazy-content").render();
  // Remove place holder
  document.querySelector("#d-lazy-content .d-place-holder").style.display = "none";
}
function importRemote() {
  document.querySelector("#d-lazy-remote").importContent();
  // Remove place holder
  document.querySelector("#d-lazy-remote .d-place-holder").style.display = "none";
}
/* LOADER */
function runLoader(l1) {
  var l1 = document.querySelector("#d-l1");
  l1.animate(0, 0);
  l1.animate(1);
}
function runEaseProgress() {
  var l4 = document.querySelector("#d-l4");
  l4.animate(0, 0);
  l4.animate(1, 2000);
}
/* LOADINGMASK */
function showComplete() {
  var loadingmask = document.querySelector("#complete");
  loadingmask.show();
}
/* SEARCHBAR */
function searchColor() {
  var input = document.querySelector(".onlyInput");
  input.search(document.querySelector(".onlyInput"));
}