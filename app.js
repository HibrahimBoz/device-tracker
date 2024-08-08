document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([40.730610, -73.935242], 12); // Default New York Coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Fetch data from TTN webhook endpoint (your endpoint will be here)
    fetch('https://your-ttn-webhook-endpoint/data')
        .then(response => response.json())
        .then(data => {
            data.forEach(device => {
                L.marker([device.latitude, device.longitude]).addTo(map)
                    .bindPopup(`<b>Device ID:</b> ${device.device_id}<br><b>Temperature:</b> ${device.temperature}°C<br><b>Light:</b> ${device.light}<br><b>Battery:</b> ${device.battery}%`);
            });
        })
        .catch(error => console.log('Error:', error));
});
