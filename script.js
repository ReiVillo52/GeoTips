// Inicjalizacja mapy
var map = L.map('map').setView([20, 0], 2);

// Dodanie warstwy mapy
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// kraje dostępne w GeoGuessr
var countries = {
    "Poland": [52, 19, "kraje/polska.html"],
    "France": [46.603, 2.888, "kraje/france.html"],
    "Germany": [51.24, 11.092, "kraje/niemcy.html"],
    "Belgium": [50.49, 4.936],
    "Italy": [41.87, 12.56],
    "Spain": [39.86, -2.74, "kraje/spain.html"],
    "Switzerland": [46.81, 8.22, "kraje/szwajcaria.html"],
    "Czech Republic": [49.81, 15.47],
    "Slovakia": [48.66, 19.69],
    "Hungary": [47.16, 19.50],
    "Sweden": [59.12, 17.64, "kraje/sweden.html"],
    "Norway": [60.47, 8.46, "kraje/norway.html"],
    "Finland": [61.92, 25.74, "kraje/finlandia.html"],
    "Denmark": [55.56, 9.50, "kraje/denmark.html"],
    "Netherlands": [51.97, 5.89],
    "Austria": [47.353, 15.210],
    "Bulgaria": [42.733, 25.485],
    "Croatia": [44.1, 15.8],
    "Cyprus": [35.126, 33.429],
    "Estonia": [58.595, 25.013],
    "Greece": [39.074, 21.824],
    "Ireland": [53.012, -7.643, "kraje/Ireland.html"],
    "Iceland": [64.963, -19.020, "kraje/Iceland.html"],
    "Lithuania": [55.169, 23.881, "kraje/Lithuania.html"],
    "Latvia": [56.879, 24.603, "kraje/latvia.html"],
    "Malta": [35.937, 14.375],
    "Portugal": [39.399, -8.224, "kraje/portugal.html"],
    "Romania": [45.943, 24.966],
    "Slovenia": [46.151, 14.995],
    "Serbia": [44.016, 21.005],
    "Ukraine": [48.379, 31.165],
    "United Kingdom": [55.378, -3.436, "kraje/uk.html"],
    "Albania": [40.82, 20.03],
    "Montenegro": [42.895, 19.113],
    "North Macedonia": [41.627, 21.773],
    "Belarus": [53.806, 28.516],
    "Liechtenstein": [47.137, 9.521],
    "Luxembourg": [49.718, 6.134],
    "Andorra": [42.506, 1.521, "kraje/andora.html"],

    "USA": [37, -95],
    "Mexico": [23.177, -102.587],
    "Canada": [53.270, -116.241],
    "Guatemala": [15.012, -90.541],
    "Costa Rica": [10.081, -84.211],
    "Panama": [8.259, -80.938],
    "Dominican Republic": [18.946, -70.888],

    "Brazil": [-10, -55],
    "Colombia": [3.462, -73.237],
    "Ecuador": [-1.519, -78.588],
    "Peru": [-9.517, -75.466],
    "Bolivia": [-17.859, -63.828],
    "Chile": [-35.767, -71.780],
    "Argentina": [-36.113, -65.069],
    "Uruguay": [-33.423, -55.945],

    "Tunisia": [32.554, 9.638],
    "Senegal": [14.449, -14.923],
    "Ghana": [6.782, -1.257],
    "Nigeria": [7.947, 7.591],
    "Kenya": [-0.113, 37.784],
    "Uganda": [1.019, 32.667],
    "Rwanda": [-2.104, 29.945],
    "Botswana": [-22.819, 23.716],
    "South Africa": [-30.794, 23.699],
    "Lesotho": [-29.903, 28.264],
    "Eswatini(Swaziland)": [-26.751, 31.572],

    "Oman": [21.060, 57.511],
    "United Arab Emirates": [24.639, 55.243],
    "Qatar": [25.097, 51.167],
    "Jordan": [30.972, 36.077],
    "Israel and Palestina": [31.383, 34.819],
    "Lebanon": [33.999, 35.978],
    "Turkey": [38.665, 32.285],
    "Russia": [61.051, 63.236],
    "Kazachstan": [48.39, 67.809],
    "Mongolia": [46.609, 102.989],
    "Kyrgyzstan": [41.499, 74.922],
    "India": [19.677, 77.671],
    "Sri Lanka": [7.24, 80.721],
    "Bangladesh": [23.451, 90.301],
    "Bhutan": [27.229, 90.557],
    "Laos": [19.609, 102.763],
    "Thailand": [15.059, 100.894],
    "Cambodia": [12.606, 105.049],
    "South Korea": [36.074, 128.008],
    "Japan": [36.152, 139.086],
    "Taiwan": [23.249, 120.845],
    "Philippines": [10.956, 123.196],
    "Indonesia": [-6.568, 106.714],
    "Singapore": [1.298, 103.825],
    "Australia": [-27.305, 135.124],
    "New Zealand": [-42.926, 172.255]
};

// Jednolita, mała ikona
var smallIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [15, 25],
    iconAnchor: [7, 25],
    popupAnchor: [1, -20]
});

// Dodanie znaczników do mapy
Object.keys(countries).forEach(country => {
    let [lat, lng, link] = countries[country];

    // Jeśli nie podano linku, generujemy domyślną nazwę
    if (!link) {
        link = `kraje/${country.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.html`;
    }

    L.marker([lat, lng], { icon: smallIcon }).addTo(map)
        .bindPopup(`<b>${country}</b><br><a href="${link}">Go to the guide</a>`);
});

// ---------------------------------------------------
// Tworzenie menu "poradniki" (np. w <ul id="countries-list"></ul>)
// ---------------------------------------------------
var countryList = document.getElementById("countries-list");

Object.keys(countries).forEach(country => {
    let [lat, lng, link] = countries[country];

    if (!link) {
        link = `kraje/${country.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}.html`;
    }

    let listItem = document.createElement("li");
    let a = document.createElement("a");
    a.href = link;
    a.textContent = country;
    listItem.appendChild(a);
    countryList.appendChild(listItem);
});
