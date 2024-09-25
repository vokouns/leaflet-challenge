# USGS earthquake information utilizing LeafLet

This project fetched data from the USGS GeoJSON  API in order to map earthquake locations.

To view the map as a user please [visit this page](https://vokouns.github.io/leaflet-challenge/).

### **Steps to Completion**:

1. **Initialize the Leaflet Map**  
We began by setting up a Leaflet map, centering it on North America. The zoom level was adjusted to display a broad view of the region.

2. **Add Base Layers and Layer Control**  
Two map layers were added: a street map and a satellite map. A layer control was implemented to allow users to switch between these two views.

3. **Fetch Earthquake Data Using D3**  
We retrieved earthquake data from the USGS API using D3. The relevant information, such as magnitude, location, and depth, was extracted from the data for further use.

4. **Create and Style Circle Markers for Earthquakes**  
Circle markers were created to represent each earthquake. The size of the markers corresponded to the earthquake magnitude, while the color reflected the depth of the earthquake. Pop-up windows were added to display detailed information when a marker was clicked.

5. **Add a Legend for Depth Ranges**  
A legend was added to the map to show the color gradient representing different earthquake depths. A title was added to the legend, and adjustments were made to ensure the spacing and layout were visually appealing.

6. **Display Earthquake Markers as an Overlay**  
The earthquake markers were grouped into an overlay layer, allowing users to toggle them on and off independently of the base layers. The layer control was updated to include the option to display or hide the earthquake markers.

### **Tools Utilized**

1. **OpenStreetMap**
   - **Description**: A collaborative project to create a free editable map of the world. It was used as one of the base layers in the map.
   - **Link**: [OpenStreetMap](https://www.openstreetmap.org/)

2. **Esri World Imagery**
   - **Description**: A satellite imagery layer provided by Esri, offering a detailed view of the Earth. It was used as the satellite map option.
   - **Link**: [Esri World Imagery](https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer)

3. **Leaflet.js**
   - **Description**: A leading open-source JavaScript library for interactive maps. Leaflet was used to initialize the map, add layers, and manage markers and controls.
   - **Link**: [Leaflet Documentation](https://leafletjs.com/)

4. **D3.js**
   - **Description**: A JavaScript library for producing dynamic, interactive data visualizations in web browsers. D3 was used to fetch earthquake data from the USGS GeoJSON API.
   - **Link**: [D3 Documentation](https://d3js.org/)

5. **JavaScript Date Object**
   - **Description**: The JavaScript `Date` object is used to work with dates and times. We utilized the `Date` object to convert UNIX timestamps from the USGS data into readable date formats.
   - **Link**: [JavaScript Date Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

6. **Leaflet Legends**
   - **Description**: Leaflet provides options to add custom controls, such as legends, to maps. A custom legend was added to display the earthquake depth color scale.
   - **Link**: [Leaflet Custom Controls Documentation](https://leafletjs.com/examples/choropleth/#custom-legend-control)
