/**
 * Create leaflet custom map
 * @return {[type]} [description]
 */
function setMap() {
  //  Wait until maps has been imported
  setTimeout(function() {
    var mymap = L.map("mapId").setView([51.505, -0.09], 13);

    // Create main map layer
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0ZWNodSIsImEiOiJjajUxNGZvYnowdW14MndwOGpxejgxeGtjIn0.fdr2AQZyAPslT3-QdcbSJQ",
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets"
      }
    ).addTo(mymap);

    // Set machines markers with custom icons
    var myIcon = L.divIcon({
      className: "material-icons activatedIcon",
      html: "location_on"
    });
    var sr75 = L.marker([51.505, -0.09], { icon: myIcon }).addTo(mymap);
    sr75.bindPopup("<b>SR-75</b>", { className: "popup" }).openPopup();

    myIcon = L.divIcon({
      className: "material-icons activatedIcon",
      html: "location_on"
    });
    var sr95 = L.marker([51.513, -0.12], { icon: myIcon }).addTo(mymap);
    sr95.bindPopup("<b>SR-95</b>", { className: "popup" }).openPopup();

    myIcon = L.divIcon({
      className: "material-icons desactivatedIcon",
      html: "location_on"
    });
    var sr45 = L.marker([51.5, -0.1], { icon: myIcon }).addTo(mymap);
    sr45.bindPopup("<b>SR-45</b>", { className: "popup" }).openPopup();

    myIcon = L.divIcon({
      className: "material-icons activatedIcon",
      html: "location_on"
    });
    var sf70 = L.marker([51.499, -0.05], { icon: myIcon }).addTo(mymap);
    sf70.bindPopup("<b>SF-70</b>", { className: "popup" }).openPopup();

    // Create top left expandable leyend
    var active = L.layerGroup([sr95, sf70, sr75]);
    var inactive = L.layerGroup([sr45]);
    var all = L.layerGroup([sr45, sr75, sr95, sf70]);
    // Leyend lables
    var overlayMaps = {
      Active: active,
      Inactive: inactive,
      All: all
    };
    L.control.layers(overlayMaps).addTo(mymap);
  }, 1000);
}
