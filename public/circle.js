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

async function initMap() {
    const json = await getData()
    // console.log(json)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: citymap.lisboa.center,
        mapTypeId: "terrain",
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
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: { lat: json[i].st_x, lng: json[i].st_y },
            // center: citymap.lisboa.center,
            radius: Math.sqrt(json[i].sp_views) * 10,
        });
    }
}

async function getData(){
    var targetUrl = 'https://ulide-party-api.herokuapp.com/api/spots'


    const response = await fetch(targetUrl)
    const data = await response.json()
    console.log(data)
    return data

    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    //     targetUrl = 'https://ulide-party-api.herokuapp.com/api/spots'
    //
    // const response = await fetch(
    //     proxyUrl + targetUrl)
    // const data = await response.json()
    // return data

}

window.initMap = initMap;