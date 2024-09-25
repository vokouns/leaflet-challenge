// Assign the USGS API URL to a constant variable
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Fetch the earthquake data from the USGS API URL
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Access the features array
    const earthquakes = data.features;

    // Inputs fetched earthquake details into earthquakes array
    earthquakes.forEach(eq => {
      // Fetching long, lat, and depth
      coordinates = eq.geometry.coordinates;
      longitude = coordinates[0];  // These values (longitude, latitude, depth) won't change
      latitude = coordinates[1];
      depth = coordinates[2];
      console.log(`Longitude: ${longitude}, Latitude: ${latitude}, Depth: ${depth}`)
    });
    // Log the total number of results and provides feedback that fetching is complete
    console.log(`Total number of earthquakes retrieved: ${earthquakes.length}`);
    console.log(`This concludes the fetching of data from the USGS API`)

  })
  // This is for seeing if there are errors. Hopefully there are not
  .catch(error => console.error('Error fetching data:', error));

// Time to plot using Leaflet
