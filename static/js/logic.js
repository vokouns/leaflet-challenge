// Initialize the Leaflet map, centering on North America
var eqMap = L.map('map', {
    center: [50, -115],  // Center moved west to make Alaska visible
    zoom: 4  // Zoomed out to show a wider area, including Alaska
  });
  
// Add OpenStreetMap as the default base layer
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  });
  
  // Add Esri's satellite imagery as an optional base layer
  var satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
  });
  
  // Add the OpenStreetMap layer to the map by default
  streetMap.addTo(eqMap);
  
  // Store base layers (Street Map and Satellite Map) in an object for layer control
  var baseMaps = {
    "Street Map": streetMap,
    "Satellite Map": satelliteMap
  };
  
  // Create a LayerGroup for earthquake markers
  var earthquakeLayer = L.layerGroup();
  
  // Fetch earthquake data from the USGS API using D3
  d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
  
    // Extract the earthquake features from the data
    var earthquakes = data.features;
  
    // Loop through each earthquake feature to create markers
    earthquakes.forEach(function(eq) {
      
      // Extract relevant data: magnitude, location, time, coordinates, and depth
      var magnitude = eq.properties.mag;
      var location = eq.properties.place;
      var time = new Date(eq.properties.time);  // Convert timestamp to a readable date
      var coordinates = eq.geometry.coordinates;
      var longitude = coordinates[0];
      var latitude = coordinates[1];
      var depth = coordinates[2];
  
      // Define the marker options based on earthquake magnitude and depth
      var markerOptions = {
        radius: magnitude * 4,  // Marker size proportional to magnitude
        fillColor: getDepthColor(depth),  // Color depends on depth
        color: "#000",  // Black outline
        weight: 1,  // Outline thickness
        opacity: 1,
        fillOpacity: 0.8
      };
  
      // Create a circle marker with the extracted data and options
      var circleMarker = L.circleMarker([latitude, longitude], markerOptions)
        .bindPopup(`<h3>Location: ${location}</h3>
                    <p>Magnitude: ${magnitude}</p>
                    <p>Depth: ${depth} km</p>
                    <p>Time: ${time}</p>`);
  
      // Add the circle marker to the earthquake LayerGroup
      earthquakeLayer.addLayer(circleMarker);
    });
  
    // Add the earthquake LayerGroup to the map
    earthquakeLayer.addTo(eqMap);
  });
  
  // Function to determine marker color based on earthquake depth
  function getDepthColor(depth) {
    if (depth > 90) {
      return "#8B0000";  // Dark red for deep earthquakes
    } else if (depth > 70) {
      return "#FF4500";  // Red-orange
    } else if (depth > 50) {
      return "#FFA500";  // Orange
    } else if (depth > 30) {
      return "#FFFF00";  // Yellow
    } else if (depth > 10) {
      return "#ADFF2F";  // Yellow-green
    } else {
      return "#00FF00";  // Green for shallow earthquakes
    }
  }
  
  // Add the legend for depth ranges to the bottom-right corner of the map
  var legend = L.control({ position: 'bottomright' });
  
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<h4>Earthquake Depth (km)</h4>';
    var depthRanges = [-10, 10, 30, 50, 70, 90];
    var colors = ["#00FF00", "#ADFF2F", "#FFFF00", "#FFA500", "#FF4500", "#8B0000"];
  
    // Loop through depth ranges and create a color box and label for each range
    for (var i = 0; i < depthRanges.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
        depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+');
    }
    return div;
  };
  
  // Add the legend to the map
  legend.addTo(eqMap);
  
  // Add a control to toggle between base layers (Street Map and Satellite Map) and overlay (Earthquake markers)
  var overlayMaps = {
    "Earthquakes": earthquakeLayer
  };
  
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(eqMap);