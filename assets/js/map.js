const map = L.map('map').setView([-3.7319, -38.5267], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let totalArvores = 0;
let confirmadas = new Set();

// CAMADA SATÉLITE
fetch('data/copas_detectadas.geojson')
  .then(res => res.json())
  .then(data => {

    totalArvores = data.features.length;
    document.getElementById('count-total').textContent = totalArvores;

    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: '#7fbf7f',
          color: '#4f8f4f',
          weight: 1,
          fillOpacity: 0.8
        });
      }
    }).addTo(map);
  });

// CAMADA CONFIRMAÇÕES
fetch('data/confirmacoes_comunitarias.geojson')
  .then(res => res.json())
  .then(data => {

    data.features.forEach(f => {
      confirmadas.add(f.properties.id_copa);
    });

    document.getElementById('count-confirmed').textContent = confirmadas.size;

    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 5,
          fillColor: '#2e7d32',
          color: '#1b5e20',
          weight: 1,
          fillOpacity: 0.9
        });
      }
    }).addTo(map);
  });
