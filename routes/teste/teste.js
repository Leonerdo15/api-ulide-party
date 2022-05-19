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

// var request = require('sync-request');
// var res = request('GET', 'https://ulide-party-api.herokuapp.com/api/spots')
// var jsonArray = JSON.parse(res.getBody());
//
// console.log(JSON.parse(res.getBody()));
// console.log(jsonArray[0].st_y + " ")
// module.exports.jsonData = jsonArray

// async function f1(url, data) {
//     const postData = async (url, data)=>{
//         console.log(data);
//         const response = await fetch(url, {
//             method: 'POST',
//             credentials: 'same-origin',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             // Body data type must match "Content-Type" header
//             body: JSON.stringify(data),
//         });
//
//         try {
//             const newData = await response.json();
//             console.log(newData);
//             return newData;
//         }catch(error) {
//             console.log("error", error);
//         }
//     }
// }





//
//
// const http = require('http')
//
// const server = http.createServer((req, res) => {
//
//     if (req.url === '/') {
//         async function getData(){
//
//             var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//                 targetUrl = 'https://ulide-party-api.herokuapp.com/api/spots'
//
//
//             const response = await fetch(
//                 proxyUrl + targetUrl)
//             const data = await response.json()
//             console.log(data)
//             return data
//
//         }
//         async function initMap() {
//             const json = await getData()
//             console.log(json)
//         }
//
//         initMap().then(r => {
//             console.log(r)
//         })
//     } else if (req.url === '/about') {
//         res.end('Here is our short history')
//     } else {
//         res.end(`
//     <h1>Oops!</h1>
//     <p>We can't seem to find the page you are looking for</p>
//     <a href="/">back home</a>
//     `)
//     }
// })
//
// server.listen(5000)


// const today = new Date();
//
// const myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
//
// console.log(myToday)


// const json =  {
//     name:"leo",
//     location: [
//         10,
//         30.1273,
//         40
//     ]
// }
//
// console.log(json.location[1])

import ip from "ip"
console.dir ( ip.address() );