// ############################################################################################
// STYLE
// ############################################################################################

// Creates a style node and saves the reference
vcomet.style = document.createElement("style");
vcomet.rules = {};

// Appends the style to the head
document.head.appendChild(vcomet.style);

// Hides initial elements
vcomet.style.sheet.insertRule(".vcomet-until-rendered { opacity: 0; }", 0);
// Hide vc-script
vcomet.style.sheet.insertRule("vc-script { display: none; }", 0);

// ############################################################################################
// RESPONSIVE
// ############################################################################################

vcomet.mobileWidth = 450;
vcomet.tabletWidth = 800;

vcomet.addViewportMeta = vcomet.addViewportMeta || true;

if (vcomet.addViewportMeta) {
    document.write(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    );
}

// ############################################################################################
// DEFAULT THEME
// ############################################################################################
if (!vcomet.theme) {
    vcomet.theme = "noire";
}