
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
    getData()
    var myLatlng = new google.maps.LatLng(38,  12);
    var mapOptions = {
        zoom: 9,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: citymap.Porto.center,
        title:"Hello World!"
    });

    marker.setMap(map);

}

window.initMap = initMap;


async function getData(){
    // let lat
    // let long
    // const data = await fetch('http://localhost:5000/api/users')
    // const json = await data.json()
    // lat = json[0].st_x
    // long = json[0].st_y
    //
    // return {lat, long}

    const url = 'http://localhost:5000/api/users';

    const options = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_YAMMER_ACCESS_TOKEN}`,
        }
    };

    fetch(url, options).then(function(response) {
        console.log(response);
        return response.json();
    }).then(function(json) {
        console.log(json);
    }).catch(e => {
        console.log(e);
    });;
}

