
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


const icons = {
    bar: {
        url: "/images/bar.png",
    },
    rest: {
        url: "/images/rest.png",
    },
    disco: {
        url: "/images/disco.png",
    },



};

async function initMap() {
    const json = await getData()
    console.log(json[0].st_x)
    console.log(typeof json[0].st_x)
    var myLatlng = new google.maps.LatLng(parseFloat(json[0].st_x), parseFloat(json[0].st_y));

    var mapOptions = {
        zoom: 13,
        center: myLatlng,
        styles: styles_map,
        // hide: [
        //     {
        //         featureType: "all",
        //         stylers: [{ visibility: "off" }],
        //     },
        // ],
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    for (let i = 0; i < json.length; i++) {
        var marker = new google.maps.Marker({
            // icon:"/images/rose-dot.png",
            icon: icons.bar.url,
            position: new google.maps.LatLng(parseFloat(json[i].st_x), parseFloat(json[i].st_y)),
            title:json[i].sp_name,
            animation: google.maps.Animation.DROP,

        });

        marker.setMap(map);
    }

}

window.initMap = initMap;


async function getData(){
    var targetUrl = 'https://ulide-party-api.herokuapp.com/api/spots'


    const response = await fetch(targetUrl)
    const data = await response.json()
    console.log(data)
    return data


    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    //     targetUrl = 'https://ulide-party-api.herokuapp.com/api/spots'
    //
    //
    // const response = await fetch(
    //     proxyUrl + targetUrl)
    // const data = await response.json()
    // console.log(data)
    // return data

}

