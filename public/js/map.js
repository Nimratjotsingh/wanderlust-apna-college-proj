mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbmltbSIsImEiOiJjbW03cXI3eTUwdnYyMm9wOTBwYnk4YzJxIn0.iO31uY4fepYzletWP8xGhQ';
const map = new mapboxgl.Map({
    container: 'map', 
    center: [77.2090, 28.6139], 
    zoom: 9 
});

const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);