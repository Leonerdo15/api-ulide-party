// let http = require('http');
// let fs = require('fs');
//
// let handleRequest = (request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.readFile('./index.html', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             respone.write('Whoops! File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// };
//
// http.createServer(handleRequest).listen(8000);


// const http = require('http');
// const url = require('url');
//
// http
//     .createServer(function (req, res) {
//         const queryObject = url.parse(req.url, true).query;
//         console.log(queryObject);
//
//         console.log(Object.keys(queryObject)[0])
//
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end('Feel free to add query parameters to the end of the url');
//     })
//     .listen(8080);

// var XMLHttpRequest = require('xhr2');
// var xhr = new XMLHttpRequest();
//
//
// xhr.open("POST", "http://localhost:5000/api/users");
//
// xhr.setRequestHeader("Accept", "application/json");
// xhr.setRequestHeader("Content-Type", "application/json");
//
// xhr.onload = () => console.log(xhr.responseText);
//
// let data = `{
//   "us_email": "batata",
//   "us_name": "Teste"
// }`;
//
// xhr.send(data);



// const fetch = require("node-fetch");
//
// let url = "http://localhost:5000/api/spots";
//
// let settings = { method: "Get" };
// function getLocations(){
//     fetch(url, settings)
//         .then(res => res.json())
//         .then((json) => {
//             console.log(json)
//             for (let i = 0; i < json.length; i++) {
//                 var data = JSON.parse(JSON.stringify(json[i]));
//                 a = data.st_x
//                 console.log("1")
//             }
//
//         });
// }
//
// module.exports.func = getLocations

var request = require('sync-request');
var res = request('GET', 'https://ulide-party-api.herokuapp.com/api/spots')
var jsonArray = JSON.parse(res.getBody());

console.log(JSON.parse(res.getBody()));
console.log(jsonArray[0].st_y + " ")
module.exports.jsonData = jsonArray