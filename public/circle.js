const citymap = {
    lisboa: {
        center: { lat: 38.736946, lng: -9.142685 },
        population: 504718,
    },
    Porto: {
        center: { lat: 41.15, lng: -8.61024 },
        population: 214349,
    },
};

const styles_map = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
    {
        "featureType": "poi",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            { "visibility": "true" }
        ]
    }

]

async function initMap() {
    const json = await getData()
    // console.log(json)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: citymap.lisboa.center,
        mapTypeId: "terrain",
        styles: styles_map ,

    });

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    // for (const spot in json) {
    //     // Add the circle for this city to the map.
    //     const cityCircle = new google.maps.Circle({
    //         strokeColor: "#FF0000",
    //         strokeOpacity: 0.8,
    //         strokeWeight: 2,
    //         fillColor: "#FF0000",
    //         fillOpacity: 0.35,
    //         map,
    //         center: { lat: spot.st_x, lng: spot.st_y },
    //         radius: Math.sqrt(spot.sp_view) * 100,
    //     });
    // }


    for (let i = 0; i < json.length; i++) {
        const cityCircle = new google.maps.Circle({
            strokeColor: "#ffb500",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#ffb500",
            fillOpacity: 0.35,
            map,
            center: { lat: json[i].sp_lat, lng: json[i].sp_long },
            // center: citymap.lisboa.center,
            radius: Math.sqrt(json[i].sp_views) * 10,
        });
    }
}

async function getData(){
    /**
     *  online version
     *
     * */
    const targetUrl = 'https://ulide-party-api.herokuapp.com/api/spots';


    const response = await fetch(targetUrl)
    const data = await response.json()
    console.log(data)
    return data



    /**
     *  offline version
     *
     * */

    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    //     targetUrl = 'https://ulide-party-api.herokuapp.com/api/spots'
    //
    // const response = await fetch(
    //     proxyUrl + targetUrl)
    // const data = await response.json()
    // return data

}

window.initMap = initMap;