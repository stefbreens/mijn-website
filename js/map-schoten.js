
let map = L.map('schotenMap').setView([51.2514, 4.5020], 8);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let schotenMarker = L.marker([51.2514, 4.5020]).addTo(map);
schotenMarker
  .bindPopup("<b>Schoten</b>")
  .openPopup();