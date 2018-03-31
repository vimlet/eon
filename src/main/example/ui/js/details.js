// -------------------
// FUNCTIONS
// -------------------
function getPercent(value, max) {
  return Math.floor(value * 100 / max);
}

function getValue(percent, max) {
  return parseFloat(percent / 100 * max + "").toFixed(2);
}

// -------------------
// FUNCTIONS FOR SR75
// -------------------
function setupSR75Map() {
  var mymap = L.map("detailsMapSR75").setView([51.505, -0.09], 13);

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
    className: "material-icons desactivatedIcon",
    html: "location_on"
  });

  myIcon = L.divIcon({
    className: "material-icons activatedIcon",
    html: "location_on"
  });
  var sm14 = L.marker([51.499, -0.05], { icon: myIcon }).addTo(mymap);
  sm14.bindPopup("<b>SR-75</b>", { className: "popup" }).openPopup();

  // Path
  var latlngs = [
    [51.499, -0.05],
    [51.499196, -0.050164],
    [51.499059, -0.050242],
    [51.498894, -0.050186],
    [51.499, -0.05]
  ];
  var polyline = L.polyline(latlngs, { color: "grey" }).addTo(mymap);
  // Zoom the map to the path
  mymap.fitBounds(polyline.getBounds());
}

function setupSR75Chart() {
  var chart = new Chart(document.querySelector("#detailsChartSR75"), {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [80, 110, 90, 70, 85, 95, 0],
          backgroundColor: "#ff9f40",
          borderColor: "#ff9f40",
          label: "SR-75",
          fill: false
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        text: "",
        display: false
      },
      plugins: {
        filler: {
          propagate: true
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Week"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Meters"
            }
          }
        ]
      }
    }
  });
}

function setupSR75Gauges(rpmId, thrustId) {
  var rpmGauge = new JustGage({
    // id: "rpmGauge",
    id: rpmId,
    title: "R.P.M",
    value: 1550,
    min: 0,
    max: 1800,
    humanFriendly: false,
    decimals: 0,
    counter: true
  });

  var thrustGauge = new JustGage({
    // id: "thrustGauge",
    id: thrustId,
    title: "Thrust",
    value: 205,
    min: 0,
    max: 300,
    humanFriendly: false,
    decimals: 0,
    counter: true
  });

  setInterval(function() {
    var rpmMin = 1400;
    var rpmMax = 1700;

    var torqueMin = 140;
    var torqueMax = 270;

    var rpmInt = getRandom(
      parseInt(rpmGauge.originalValue) - 5,
      parseInt(rpmGauge.originalValue) + 5
    );
    var thrustInt = getRandom(
      parseInt(thrustGauge.originalValue) - 2,
      parseInt(thrustGauge.originalValue) + 2
    );

    rpmInt = rpmInt < rpmMin ? rpmMin : rpmInt;
    rpmInt = rpmInt > rpmMax ? rpmMax : rpmInt;

    thrustInt = thrustInt < torqueMin ? torqueMin : thrustInt;
    thrustInt = thrustInt > torqueMax ? torqueMax : thrustInt;

    rpmGauge.refresh(rpmInt);
    thrustGauge.refresh(thrustInt);
  }, 800);
}

function setupSR75RealTimeData(realtimeId) {
  var greenColor = "#359835";
  var yellowColor = "rgb(255, 187, 64)";
  var redColor = "#ff6347";

  var realtimeNode = document.querySelector("#" + realtimeId);

  var vfuel = realtimeNode.querySelector(".value.fuel");
  var vhOil = realtimeNode.querySelector(".value.hydraulicOil");
  var vdepth = realtimeNode.querySelector(".value.depth");
  var vdrillingRate = realtimeNode.querySelector(".value.drillingRate");

  var fuel = realtimeNode.querySelector(".bar.fuel");
  var hOil = realtimeNode.querySelector(".bar.hydraulicOil");
  var depth = realtimeNode.querySelector(".bar.depth");
  var drillingRate = realtimeNode.querySelector(".bar.drillingRate");

  var data = {};

  data.fuel = {};
  data.fuel.min = 473.23;
  data.fuel.max = 650;

  data.hOil = {};
  data.hOil.min = 749.41;
  data.hOil.max = 800;

  data.depth = {};
  data.depth.min = 50.31;
  data.depth.max = 75;

  data.drillingRate = {};
  data.drillingRate.min = 7.24;
  data.drillingRate.max = 10.51;

  vfuel.innerHTML = data.fuel.min + " l";
  fuel.style.width = getPercent(data.fuel.min, data.fuel.max) + "%";
  fuel.setAttribute("percentValue", getPercent(data.fuel.min, data.fuel.max));

  vhOil.innerHTML = data.hOil.min + " l";
  hOil.style.width = getPercent(data.hOil.min, data.hOil.max) + "%";
  hOil.setAttribute("percentValue", getPercent(data.hOil.min, data.hOil.max));

  vdepth.innerHTML = data.depth.min + " m";
  depth.style.width = getPercent(data.depth.min, data.depth.max) + "%";
  depth.setAttribute(
    "percentValue",
    getPercent(data.depth.min, data.depth.max)
  );

  vdrillingRate.innerHTML = data.drillingRate.min + " m/h";
  drillingRate.style.width =
    getPercent(data.drillingRate.min, data.drillingRate.max) + "%";
  drillingRate.setAttribute(
    "percentValue",
    getPercent(data.drillingRate.min, data.drillingRate.max)
  );

  setInterval(function() {
    // FUEL
    var fuelNewValue = fuel.getAttribute("percentValue") - 0.1;
    vfuel.innerHTML = getValue(fuelNewValue, data.fuel.max) + " l";

    if (fuelNewValue < 25) {
      fuelNewValue = 90;
    } else if (fuelNewValue >= 100) {
      fuelNewValue = 100;
    }

    // Fuel Coloring
    if (fuelNewValue <= 30) {
      fuel.style.backgroundColor = redColor;
    } else if (fuelNewValue <= 70) {
      fuel.style.backgroundColor = yellowColor;
    } else {
      fuel.style.backgroundColor = greenColor;
    }

    fuel.style.width = fuelNewValue + "%";
    fuel.setAttribute("percentValue", fuelNewValue);

    // HOil - No change

    // DEPTH
    var depthNewValue = getRandom(
      parseInt(depth.getAttribute("percentValue")),
      parseInt(depth.getAttribute("percentValue")) + 2
    );
    vdepth.innerHTML = getValue(depthNewValue, data.depth.max) + " m";

    if (depthNewValue >= 100) {
      depthNewValue = 100;
    }

    depth.style.width = depthNewValue + "%";
    depth.setAttribute("percentValue", depthNewValue);
  }, 5000);

  setInterval(function() {
    // DRILLING RATE
    var drillingRateNewValue = getRandom(
      parseInt(drillingRate.getAttribute("percentValue")),
      parseInt(drillingRate.getAttribute("percentValue")) + 2
    );
    vdrillingRate.innerHTML =
      getValue(drillingRateNewValue, data.drillingRate.max) + " m/h";

    if (drillingRateNewValue >= 100) {
      drillingRateNewValue = 100;
    }

    drillingRate.style.width = drillingRateNewValue + "%";
    drillingRate.setAttribute("percentValue", drillingRateNewValue);
  }, 3000);
}

// -------------------
// FUNCTIONS FOR SR95
// -------------------
function setupSR95Map() {
  var mymap = L.map("detailsMapSR95").setView([51.505, -0.09], 13);

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
    className: "material-icons desactivatedIcon",
    html: "location_on"
  });

  myIcon = L.divIcon({
    className: "material-icons activatedIcon",
    html: "location_on"
  });
  var sm14 = L.marker([51.499, -0.05], { icon: myIcon }).addTo(mymap);
  sm14.bindPopup("<b>SR-95</b>", { className: "popup" }).openPopup();

  // Path
  var latlngs = [
    [51.499, -0.05],
    [51.499196, -0.050164],
    [51.499059, -0.050242],
    [51.498894, -0.050186],
    [51.499, -0.05]
  ];
  var polyline = L.polyline(latlngs, { color: "grey" }).addTo(mymap);
  // Zoom the map to the path
  mymap.fitBounds(polyline.getBounds());
}

function setupSR95Chart() {
  var chart = new Chart(document.querySelector("#detailsChartSR95"), {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [80, 110, 90, 70, 85, 95, 0],
          backgroundColor: "#ff9f40",
          borderColor: "#ff9f40",
          label: "SR-95",
          fill: false
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        text: "",
        display: false
      },
      plugins: {
        filler: {
          propagate: true
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Week"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Meters"
            }
          }
        ]
      }
    }
  });
}

function setupSR95Gauges(rpmId, thrustId) {
  var rpmGauge = new JustGage({
    // id: "rpmGauge",
    id: rpmId,
    title: "R.P.M",
    value: 1550,
    min: 0,
    max: 1800,
    humanFriendly: false,
    decimals: 0,
    counter: true
  });

  var thrustGauge = new JustGage({
    // id: "thrustGauge",
    id: thrustId,
    title: "Thrust",
    value: 205,
    min: 0,
    max: 300,
    humanFriendly: false,
    decimals: 0,
    counter: true
  });

  setInterval(function() {
    var rpmMin = 1400;
    var rpmMax = 1700;

    var torqueMin = 140;
    var torqueMax = 270;

    var rpmInt = getRandom(
      parseInt(rpmGauge.originalValue) - 5,
      parseInt(rpmGauge.originalValue) + 5
    );
    var thrustInt = getRandom(
      parseInt(thrustGauge.originalValue) - 2,
      parseInt(thrustGauge.originalValue) + 2
    );

    rpmInt = rpmInt < rpmMin ? rpmMin : rpmInt;
    rpmInt = rpmInt > rpmMax ? rpmMax : rpmInt;

    thrustInt = thrustInt < torqueMin ? torqueMin : thrustInt;
    thrustInt = thrustInt > torqueMax ? torqueMax : thrustInt;

    rpmGauge.refresh(rpmInt);
    thrustGauge.refresh(thrustInt);
  }, 800);
}

function setupSR95RealTimeData(realtimeId) {
  var greenColor = "#359835";
  var yellowColor = "rgb(255, 187, 64)";
  var redColor = "#ff6347";

  var realtimeNode = document.querySelector("#" + realtimeId);

  var vfuel = realtimeNode.querySelector(".value.fuel");
  var vhOil = realtimeNode.querySelector(".value.hydraulicOil");
  var vdepth = realtimeNode.querySelector(".value.depth");
  var vdrillingRate = realtimeNode.querySelector(".value.drillingRate");

  var fuel = realtimeNode.querySelector(".bar.fuel");
  var hOil = realtimeNode.querySelector(".bar.hydraulicOil");
  var depth = realtimeNode.querySelector(".bar.depth");
  var drillingRate = realtimeNode.querySelector(".bar.drillingRate");

  var data = {};

  data.fuel = {};
  data.fuel.min = 779.23;
  data.fuel.max = 830;

  data.hOil = {};
  data.hOil.min = 994.61;
  data.hOil.max = 1050;

  data.depth = {};
  data.depth.min = 89.51;
  data.depth.max = 106;

  data.drillingRate = {};
  data.drillingRate.min = 6.74;
  data.drillingRate.max = 10;

  vfuel.innerHTML = data.fuel.min + " l";
  fuel.style.width = getPercent(data.fuel.min, data.fuel.max) + "%";
  fuel.setAttribute("percentValue", getPercent(data.fuel.min, data.fuel.max));

  vhOil.innerHTML = data.hOil.min + " l";
  hOil.style.width = getPercent(data.hOil.min, data.hOil.max) + "%";
  hOil.setAttribute("percentValue", getPercent(data.hOil.min, data.hOil.max));

  vdepth.innerHTML = data.depth.min + " m";
  depth.style.width = getPercent(data.depth.min, data.depth.max) + "%";
  depth.setAttribute(
    "percentValue",
    getPercent(data.depth.min, data.depth.max)
  );

  vdrillingRate.innerHTML = data.drillingRate.min + " m/h";
  drillingRate.style.width =
    getPercent(data.drillingRate.min, data.drillingRate.max) + "%";
  drillingRate.setAttribute(
    "percentValue",
    getPercent(data.drillingRate.min, data.drillingRate.max)
  );

  setInterval(function() {
    // FUEL
    var fuelNewValue = fuel.getAttribute("percentValue") - 0.1;
    vfuel.innerHTML = getValue(fuelNewValue, data.fuel.max) + " l";

    if (fuelNewValue < 25) {
      fuelNewValue = 90;
    } else if (fuelNewValue >= 100) {
      fuelNewValue = 100;
    }

    // Fuel Coloring
    if (fuelNewValue <= 30) {
      fuel.style.backgroundColor = redColor;
    } else if (fuelNewValue <= 70) {
      fuel.style.backgroundColor = yellowColor;
    } else {
      fuel.style.backgroundColor = greenColor;
    }

    fuel.style.width = fuelNewValue + "%";
    fuel.setAttribute("percentValue", fuelNewValue);

    // HOil - No change

    // DEPTH
    var depthNewValue = getRandom(
      parseInt(depth.getAttribute("percentValue")),
      parseInt(depth.getAttribute("percentValue")) + 2
    );
    vdepth.innerHTML = getValue(depthNewValue, data.depth.max) + " m";

    if (depthNewValue >= 100) {
      depthNewValue = 100;
    }

    depth.style.width = depthNewValue + "%";
    depth.setAttribute("percentValue", depthNewValue);
  }, 5000);

  setInterval(function() {
    // DRILLING RATE
    var drillingRateNewValue = getRandom(
      parseInt(drillingRate.getAttribute("percentValue")),
      parseInt(drillingRate.getAttribute("percentValue")) + 2
    );
    vdrillingRate.innerHTML =
      getValue(drillingRateNewValue, data.drillingRate.max) + " m/h";

    if (drillingRateNewValue >= 100) {
      drillingRateNewValue = 100;
    }

    drillingRate.style.width = drillingRateNewValue + "%";
    drillingRate.setAttribute("percentValue", drillingRateNewValue);
  }, 3000);
}

// -------------------
// FUNCTIONS FOR SR45
// -------------------
function setupSR45Map() {
  var mymap = L.map("detailsMapSR45").setView([51.505, -0.09], 13);

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
    className: "material-icons desactivatedIcon",
    html: "location_on"
  });

  myIcon = L.divIcon({
    className: "material-icons activatedIcon",
    html: "location_on"
  });
  var sm14 = L.marker([51.499, -0.05], { icon: myIcon }).addTo(mymap);
  sm14.bindPopup("<b>SR-45</b>", { className: "popup" }).openPopup();

  // Path
  var latlngs = [
    [51.499, -0.05],
    [51.499196, -0.050164],
    [51.499059, -0.050242],
    [51.498894, -0.050186],
    [51.499, -0.05]
  ];
  var polyline = L.polyline(latlngs, { color: "grey" }).addTo(mymap);
  // Zoom the map to the path
  mymap.fitBounds(polyline.getBounds());
}

function setupSR45Chart() {
  var chart = new Chart(document.querySelector("#detailsChartSR45"), {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [80, 110, 90, 70, 85, 95, 0],
          backgroundColor: "#ff9f40",
          borderColor: "#ff9f40",
          label: "SR-45",
          fill: false
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        text: "",
        display: false
      },
      plugins: {
        filler: {
          propagate: true
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Week"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Meters"
            }
          }
        ]
      }
    }
  });
}

function setupSR45Gauges(rpmId, thrustId) {
  var rpmGauge = new JustGage({
    // id: "rpmGauge",
    id: rpmId,
    title: "R.P.M",
    value: 1550,
    min: 0,
    max: 1800,
    humanFriendly: false,
    decimals: 0,
    counter: true
  });

  var thrustGauge = new JustGage({
    // id: "thrustGauge",
    id: thrustId,
    title: "Thrust",
    value: 205,
    min: 0,
    max: 300,
    humanFriendly: false,
    decimals: 0,
    counter: true
  });

  setInterval(function() {
    var rpmMin = 1400;
    var rpmMax = 1700;

    var torqueMin = 140;
    var torqueMax = 270;

    var rpmInt = getRandom(
      parseInt(rpmGauge.originalValue) - 5,
      parseInt(rpmGauge.originalValue) + 5
    );
    var thrustInt = getRandom(
      parseInt(thrustGauge.originalValue) - 2,
      parseInt(thrustGauge.originalValue) + 2
    );

    rpmInt = rpmInt < rpmMin ? rpmMin : rpmInt;
    rpmInt = rpmInt > rpmMax ? rpmMax : rpmInt;

    thrustInt = thrustInt < torqueMin ? torqueMin : thrustInt;
    thrustInt = thrustInt > torqueMax ? torqueMax : thrustInt;

    rpmGauge.refresh(rpmInt);
    thrustGauge.refresh(thrustInt);
  }, 800);
}

function setupSR45RealTimeData(realtimeId) {
  var greenColor = "#359835";
  var yellowColor = "rgb(255, 187, 64)";
  var redColor = "#ff6347";

  var realtimeNode = document.querySelector("#" + realtimeId);

  var vfuel = realtimeNode.querySelector(".value.fuel");
  var vhOil = realtimeNode.querySelector(".value.hydraulicOil");
  var vdepth = realtimeNode.querySelector(".value.depth");
  var vdrillingRate = realtimeNode.querySelector(".value.drillingRate");

  var fuel = realtimeNode.querySelector(".bar.fuel");
  var hOil = realtimeNode.querySelector(".bar.hydraulicOil");
  var depth = realtimeNode.querySelector(".bar.depth");
  var drillingRate = realtimeNode.querySelector(".bar.drillingRate");

  var data = {};

  data.fuel = {};
  data.fuel.min = 379.23;
  data.fuel.max = 380;

  data.hOil = {};
  data.hOil.min = 390.41;
  data.hOil.max = 450;

  data.depth = {};
  data.depth.min = 40.31;
  data.depth.max = 65;

  data.drillingRate = {};
  data.drillingRate.min = 8.24;
  data.drillingRate.max = 11;

  vfuel.innerHTML = data.fuel.min + " l";
  fuel.style.width = getPercent(data.fuel.min, data.fuel.max) + "%";
  fuel.setAttribute("percentValue", getPercent(data.fuel.min, data.fuel.max));

  vhOil.innerHTML = data.hOil.min + " l";
  hOil.style.width = getPercent(data.hOil.min, data.hOil.max) + "%";
  hOil.setAttribute("percentValue", getPercent(data.hOil.min, data.hOil.max));

  vdepth.innerHTML = data.depth.min + " m";
  depth.style.width = getPercent(data.depth.min, data.depth.max) + "%";
  depth.setAttribute(
    "percentValue",
    getPercent(data.depth.min, data.depth.max)
  );

  vdrillingRate.innerHTML = data.drillingRate.min + " m/h";
  drillingRate.style.width =
    getPercent(data.drillingRate.min, data.drillingRate.max) + "%";
  drillingRate.setAttribute(
    "percentValue",
    getPercent(data.drillingRate.min, data.drillingRate.max)
  );

  setInterval(function() {
    // FUEL
    var fuelNewValue = fuel.getAttribute("percentValue") - 0.1;
    vfuel.innerHTML = getValue(fuelNewValue, data.fuel.max) + " l";

    if (fuelNewValue < 25) {
      fuelNewValue = 90;
    } else if (fuelNewValue >= 100) {
      fuelNewValue = 100;
    }

    // Fuel Coloring
    if (fuelNewValue <= 30) {
      fuel.style.backgroundColor = redColor;
    } else if (fuelNewValue <= 70) {
      fuel.style.backgroundColor = yellowColor;
    } else {
      fuel.style.backgroundColor = greenColor;
    }

    fuel.style.width = fuelNewValue + "%";
    fuel.setAttribute("percentValue", fuelNewValue);

    // HOil - No change

    // DEPTH
    var depthNewValue = getRandom(
      parseInt(depth.getAttribute("percentValue")),
      parseInt(depth.getAttribute("percentValue")) + 2
    );
    vdepth.innerHTML = getValue(depthNewValue, data.depth.max) + " m";

    if (depthNewValue >= 100) {
      depthNewValue = 100;
    }

    depth.style.width = depthNewValue + "%";
    depth.setAttribute("percentValue", depthNewValue);
  }, 5000);

  setInterval(function() {
    // DRILLING RATE
    var drillingRateNewValue = getRandom(
      parseInt(drillingRate.getAttribute("percentValue")),
      parseInt(drillingRate.getAttribute("percentValue")) + 2
    );
    vdrillingRate.innerHTML =
      getValue(drillingRateNewValue, data.drillingRate.max) + " m/h";

    if (drillingRateNewValue >= 100) {
      drillingRateNewValue = 100;
    }

    drillingRate.style.width = drillingRateNewValue + "%";
    drillingRate.setAttribute("percentValue", drillingRateNewValue);
  }, 3000);
}

// -------------------
// FUNCTIONS FOR SF70
// -------------------
function setupSF70Map() {
  var mymap = L.map("detailsMapSF70").setView([51.505, -0.09], 13);

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
    className: "material-icons desactivatedIcon",
    html: "location_on"
  });

  myIcon = L.divIcon({
    className: "material-icons activatedIcon",
    html: "location_on"
  });
  var sm14 = L.marker([51.499, -0.05], { icon: myIcon }).addTo(mymap);
  sm14.bindPopup("<b>SF-70</b>", { className: "popup" }).openPopup();

  // Path
  var latlngs = [
    [51.499, -0.05],
    [51.499196, -0.050164],
    [51.499059, -0.050242],
    [51.498894, -0.050186],
    [51.499, -0.05]
  ];
  var polyline = L.polyline(latlngs, { color: "grey" }).addTo(mymap);
  // Zoom the map to the path
  mymap.fitBounds(polyline.getBounds());
}

function setupSF70Chart() {
  var chart = new Chart(document.querySelector("#detailsChartSF70"), {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [80, 110, 90, 70, 85, 95, 0],
          backgroundColor: "#ff9f40",
          borderColor: "#ff9f40",
          label: "SF-70",
          fill: false
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        text: "",
        display: false
      },
      plugins: {
        filler: {
          propagate: true
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Week"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Meters"
            }
          }
        ]
      }
    }
  });
}

function setupSF70Gauges(rpmId, thrustId) {
  var rpmGauge = new JustGage({
    // id: "rpmGauge",
    id: rpmId,
    title: "R.P.M",
    value: 1550,
    min: 0,
    max: 1800,
    humanFriendly: false,
    decimals: 0,
    counter: true
  });

  var thrustGauge = new JustGage({
    // id: "thrustGauge",
    id: thrustId,
    title: "Thrust",
    value: 205,
    min: 0,
    max: 300,
    humanFriendly: false,
    decimals: 0,
    counter: true
  });

  setInterval(function() {
    var rpmMin = 1400;
    var rpmMax = 1700;

    var torqueMin = 140;
    var torqueMax = 270;

    var rpmInt = getRandom(
      parseInt(rpmGauge.originalValue) - 5,
      parseInt(rpmGauge.originalValue) + 5
    );
    var thrustInt = getRandom(
      parseInt(thrustGauge.originalValue) - 2,
      parseInt(thrustGauge.originalValue) + 2
    );

    rpmInt = rpmInt < rpmMin ? rpmMin : rpmInt;
    rpmInt = rpmInt > rpmMax ? rpmMax : rpmInt;

    thrustInt = thrustInt < torqueMin ? torqueMin : thrustInt;
    thrustInt = thrustInt > torqueMax ? torqueMax : thrustInt;

    rpmGauge.refresh(rpmInt);
    thrustGauge.refresh(thrustInt);
  }, 800);
}

function setupSF70RealTimeData(realtimeId) {
  var greenColor = "#359835";
  var yellowColor = "rgb(255, 187, 64)";
  var redColor = "#ff6347";

  var realtimeNode = document.querySelector("#" + realtimeId);

  var vfuel = realtimeNode.querySelector(".value.fuel");
  var vhOil = realtimeNode.querySelector(".value.hydraulicOil");
  var vdepth = realtimeNode.querySelector(".value.depth");
  var vdrillingRate = realtimeNode.querySelector(".value.drillingRate");

  var fuel = realtimeNode.querySelector(".bar.fuel");
  var hOil = realtimeNode.querySelector(".bar.hydraulicOil");
  var depth = realtimeNode.querySelector(".bar.depth");
  var drillingRate = realtimeNode.querySelector(".bar.drillingRate");

  var data = {};

  data.fuel = {};
  data.fuel.min = 559.23;
  data.fuel.max = 620;

  data.hOil = {};
  data.hOil.min = 760.41;
  data.hOil.max = 895;

  data.depth = {};
  data.depth.min = 15.35;
  data.depth.max = 28;

  data.drillingRate = {};
  data.drillingRate.min = 23.24;
  data.drillingRate.max = 31;

  vfuel.innerHTML = data.fuel.min + " l";
  fuel.style.width = getPercent(data.fuel.min, data.fuel.max) + "%";
  fuel.setAttribute("percentValue", getPercent(data.fuel.min, data.fuel.max));

  vhOil.innerHTML = data.hOil.min + " l";
  hOil.style.width = getPercent(data.hOil.min, data.hOil.max) + "%";
  hOil.setAttribute("percentValue", getPercent(data.hOil.min, data.hOil.max));

  vdepth.innerHTML = data.depth.min + " m";
  depth.style.width = getPercent(data.depth.min, data.depth.max) + "%";
  depth.setAttribute(
    "percentValue",
    getPercent(data.depth.min, data.depth.max)
  );

  vdrillingRate.innerHTML = data.drillingRate.min + " m/h";
  drillingRate.style.width =
    getPercent(data.drillingRate.min, data.drillingRate.max) + "%";
  drillingRate.setAttribute(
    "percentValue",
    getPercent(data.drillingRate.min, data.drillingRate.max)
  );

  setInterval(function() {
    // FUEL
    var fuelNewValue = fuel.getAttribute("percentValue") - 0.1;
    vfuel.innerHTML = getValue(fuelNewValue, data.fuel.max) + " l";

    if (fuelNewValue < 25) {
      fuelNewValue = 90;
    } else if (fuelNewValue >= 100) {
      fuelNewValue = 100;
    }

    // Fuel Coloring
    if (fuelNewValue <= 30) {
      fuel.style.backgroundColor = redColor;
    } else if (fuelNewValue <= 70) {
      fuel.style.backgroundColor = yellowColor;
    } else {
      fuel.style.backgroundColor = greenColor;
    }

    fuel.style.width = fuelNewValue + "%";
    fuel.setAttribute("percentValue", fuelNewValue);

    // HOil - No change

    // DEPTH
    var depthNewValue = getRandom(
      parseInt(depth.getAttribute("percentValue")),
      parseInt(depth.getAttribute("percentValue")) + 2
    );
    vdepth.innerHTML = getValue(depthNewValue, data.depth.max) + " m";

    if (depthNewValue >= 100) {
      depthNewValue = 100;
    }

    depth.style.width = depthNewValue + "%";
    depth.setAttribute("percentValue", depthNewValue);
  }, 5000);

  setInterval(function() {
    // DRILLING RATE
    var drillingRateNewValue = getRandom(
      parseInt(drillingRate.getAttribute("percentValue")),
      parseInt(drillingRate.getAttribute("percentValue")) + 2
    );
    vdrillingRate.innerHTML =
      getValue(drillingRateNewValue, data.drillingRate.max) + " m/h";

    if (drillingRateNewValue >= 100) {
      drillingRateNewValue = 100;
    }

    drillingRate.style.width = drillingRateNewValue + "%";
    drillingRate.setAttribute("percentValue", drillingRateNewValue);
  }, 3000);
}

function setupDailyActivity(dailyActivityId) {
  var dailyActivityNode = document.querySelector("#" + dailyActivityId);

  var timelineNode = dailyActivityNode.querySelector(".timeline");
  var activityLineNode = dailyActivityNode.querySelector(".activityLine");
  var colors = {};
  var node, lineWrapper, line, time, activity;
  var randomColorNumber, hour;

  colors[1] = "#359835";
  colors[2] = "#ffbb40";
  colors[3] = "#ff6347";

  for (var i = 0; i <= 23; i++) {
    randomColorNumber = Math.floor(Math.random() * 3) + 1;

    node = document.createElement("div");
    lineWrapper = document.createElement("div");
    line = document.createElement("div");
    time = document.createElement("div");
    activity = document.createElement("div");

    node.classList.add("node");
    lineWrapper.classList.add("lineWrapper");
    line.classList.add("line");
    time.classList.add("time");
    activity.classList.add("activity");

    if (i > 8 && i < 18 && i != 14) {
      activity.style.backgroundColor = colors[randomColorNumber];
    } else {
      activity.style.backgroundColor = "#e6e6e6";
    }

    if (i < 10) {
      hour = "0" + i;
    } else if (i == 24) {
      hour = "00";
    } else {
      hour = i;
    }

    time.innerHTML = hour;

    lineWrapper.appendChild(line);

    node.appendChild(lineWrapper);
    node.appendChild(time);

    timelineNode.appendChild(node);
    activityLineNode.appendChild(activity);
  }
}
