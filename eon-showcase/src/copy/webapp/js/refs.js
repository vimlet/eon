refs = this.refs || {}
paths = this.paths || {}
paths.section = "section/";
paths.example = "example/";

refs.initialize = function () {
  // Store useful nodes references
  refs.tree = document.querySelector(".tTree");
  refs.drawer = document.querySelector(".tTreeContainer");
  refs.mask = document.querySelector("eon-loading");
}
refs.createSections = function () {
  // refs.view = document.querySelector("#tViewContent");
  var stackContainer = document.querySelector(".tViewContainer");
  refs.view = document.createElement("eon-stack");
  refs.view.id = "tViewContent";

  var examples = eon.util.getBrowser() == "IE" ? "ie-example/" : "example/";

  var forms = document.createElement('eon-panel');
  forms.name = "forms";
  forms.thickness = "10";
  forms.href = examples + "forms.html";
  forms.classList.add("formsPanel");

  var containers = document.createElement('eon-panel');
  containers.name = "containers";
  containers.thickness = "10";
  containers.href = examples + "containers.html";
  containers.classList.add("containersPanel");

  var media = document.createElement('eon-panel');
  media.name = "media";
  media.thickness = "10";
  media.href = examples + "media.html";
  media.classList.add("mediaPanel");

  var menu = document.createElement('eon-panel');
  menu.name = "menus";
  menu.thickness = "10";
  menu.href = examples + "menu.html";
  menu.classList.add("menusPanel");

  var other = document.createElement('eon-panel');
  other.name = "other";
  other.thickness = "10";
  other.href = examples + "other.html";
  other.classList.add("otherPanel");

  refs.view.appendChild(forms);
  refs.view.appendChild(containers);
  refs.view.appendChild(media);
  refs.view.appendChild(menu);
  refs.view.appendChild(other);

  stackContainer.appendChild(refs.view);
}

