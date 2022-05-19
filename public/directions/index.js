let latUser
let longUser

async function initMap() {
    latUser = localStorage.getItem("user_latitude")
    longUser = localStorage.getItem("user_longitude")
    console.log(latUser, longUser)
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: latUser, lng: longUser },
    });

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("mode").addEventListener("change", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    latUser = localStorage.getItem("user_latitude")
    longUser = localStorage.getItem("user_longitude")
    const selectedMode = document.getElementById("mode").value;
    /*
    * { lat: 38.7160369, lng: -9.1370057}
    * { lat: 41.14961, lng: -8.61099}
    * */
    directionsService
        .route({
            origin: { lat: parseFloat(latUser), lng: parseFloat(longUser) },
            destination: { lat: 38.7160369, lng: -9.1370057},
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode[selectedMode],
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;