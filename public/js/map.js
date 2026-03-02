mapboxgl.accessToken = token;
const map = new mapboxgl.Map({
    container: 'map', 
    center: [77.2090, 28.6139], 
    zoom: 9 
});

const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);