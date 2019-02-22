eon.createCallback("onThemeChanged", eon);

document.addEventListener("DOMContentLoaded", function (event) {

    var theme = eon.theme;
    var themeDescriptor = {};

    // Default theme
    if (!theme) {
        theme = "claro";
    }
    
    // If there is no theme specified to the body we set the default one, 
    // otherwise we take that theme as the default one
    if (!document.body.dataset.theme && !document.body.hasAttribute("theme")) {

      document.body.setAttribute("theme", theme);

    } else {

        theme = document.body.dataset.theme ? document.body.dataset.theme : theme;
        theme = document.body.hasAttribute("theme") ? document.body.getAttribute("theme") : theme;

    }
  
    eon.__theme = theme;
    
    // Theme property descriptor, that will notify the theme change triggering onThemeChanged, 
    // import new Main theme and set the new theme body attribute
    themeDescriptor.get = function () {
        return eon.__theme;
    };

    themeDescriptor.set = function (value) {

      eon.domReady(function(){

        document.body.setAttribute("theme", value);

        if (!eon.registry.isThemeRegistered("main", value)) {
            eon.importMainTheme(value);
        }

        eon.triggerCallback("onThemeChanged", eon, null, [eon.__theme, value]);
        eon.__theme = value;
      });

    };
  
    Object.defineProperty(eon, "theme", themeDescriptor);
  
  }); 