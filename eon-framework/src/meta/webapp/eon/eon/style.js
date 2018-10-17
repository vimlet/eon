// ############################################################################################
// STYLE
// ############################################################################################

// Creates a style node and saves the reference
eon.style = document.createElement("style");
eon.rules = {};

// Appends the style to the head
document.head.appendChild(eon.style);

// Hides initial elements
eon.style.sheet.insertRule(".eon-until-rendered { opacity: 0; }", 0);
// Hide vc-script
eon.style.sheet.insertRule("vc-script { display: none; }", 0);

// ############################################################################################
// RESPONSIVE
// ############################################################################################

eon.mobileWidth = 450;
eon.tabletWidth = 800;

eon.addViewportMeta = eon.addViewportMeta || true;

if (eon.addViewportMeta) {
    document.write(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    );
}

// ############################################################################################
// DEFAULT THEME
// ############################################################################################
if (!eon.theme) {
    eon.theme = "noire";
}