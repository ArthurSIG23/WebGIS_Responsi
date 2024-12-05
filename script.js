// Contoh data bencana
const disasterData = [
    {
        name: "Banjir",
        location: "Kecamatan Ratu Agung",
        description: "Ketinggian air mencapai 1 meter.",
        coordinates: [102.2682, -3.7887]
    },
    {
        name: "Longsor",
        location: "Kecamatan Selebar",
        description: "Material longsor menutup jalan utama.",
        coordinates: [102.2455, -3.8085]
    },
    {
        name: "Gempa Bumi",
        location: "Kota Bengkulu",
        description: "Gempa berkekuatan 5.5 SR terjadi di laut.",
        coordinates: [102.2655, -3.8000]
    }
];

// Inisialisasi peta
var map = L.map('map').setView([-3.7889, 102.2655], 12);

// Layer peta
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var stamenTerrainLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
    maxZoom: 18,
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
});

var stamenTonerLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
});

// Fungsi untuk mengubah layer peta
function changeLayer(layer) {
    map.eachLayer(function (layer) {
        if (layer !== osmLayer) {
            map.removeLayer(layer);
        }
    });

    if (layer === 'osm') {
        osmLayer.addTo(map);
    } else if (layer === 'stamen-terrain') {
        stamenTerrainLayer.addTo(map);
    } else if (layer === 'stamen-toner') {
        stamenTonerLayer.addTo(map);
    }

    // Tambahkan kembali data bencana setelah mengganti layer
    displayDisasterData();
}

// Menampilkan data bencana dengan marker
function displayDisasterData() {
    const disasterDiv = document.getElementById('disaster-data');
    disasterDiv.innerHTML = '<h2>Data Bencana</h2>';

    disasterData.forEach(disaster => {
        // Menambahkan marker ke peta
        const marker = L.marker(disaster.coordinates).addTo(map);
        marker.bindPopup(`<b>${disaster.name}</b><br>${disaster.location}<br>${disaster.description}`).openPopup();

        // Animasi marker
        marker.on('mouseover', function () {
            this.openPopup();
        });
        marker.on('mouseout', function () {
            this.closePopup();
        });

        // Menampilkan data bencana di div
        disasterDiv.innerHTML += `<p><strong>${disaster.name}</strong> di <strong>${disaster.location}</strong>: ${disaster.description}</p>`;
    });
}

// Fetch data cuaca
async function fetchWeatherData() {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=YOUR_LOCATION'); // Ganti dengan URL API cuaca yang sesuai
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Menampilkan data cuaca
function displayWeatherData(data) {
    const weatherDiv = document.getElementById('weather-data');
    weatherDiv.innerHTML = '<h2>Data Cuaca</h2>';
    weatherDiv.innerHTML += `<p><strong>Lokasi:</strong> ${data.location.name}</p>`;
    weatherDiv.innerHTML += `<p><strong>Suhu:</strong> ${data.current.temp_c} °C</p>`;
    weatherDiv.innerHTML += `<p><strong>Kondisi:</strong> ${data.current.condition.text}</p>`;
}

// Fetch data saat halaman dimuat
displayDisasterData();
fetchWeatherData();