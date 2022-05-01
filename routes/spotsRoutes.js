var express = require('express');
var router = express.Router();
var spotsModel = require('../models/spotsModels');
const url = require("url");
const md5 = require("md5");


router.get('/', async function (req, res, next) {
    console.log("Sending all spots")
    let result = await spotsModel.getSpots()
    res.status(result.status).send(result.data)
})

router.get('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id

    let result = await spotsModel.getSpotById(id)
    res.status(result.status).send(result.data)
})

router.get('/area', async function (req, res ,next) {
    let queryObject = url.parse(req.url, true).query;
    let lat = queryObject.lat
    let long = queryObject.long
    let dist = queryObject.dist


    console.log(lat)
    let result = await spotsModel.getSpotsByArea(lat, long, dist)
    let user = result.rows
    res.status(result.status).send(result.data)
})

router.post('/', async function (req, res, next) {
    let newUser = req.body
    console.log(newUser)
    let result = await spotsModel.createSpot(newUser)
    res.status(result.status).send(result.data)
})

router.delete('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    let result = await spotsModel.deleteSpot(id)
    console.log(result)
    res.status(200).send("Deleted")
})

module.exports = router