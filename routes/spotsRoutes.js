const express = require('express');
const router = express.Router();
const spotsModel = require('../models/spotsModels');
const url = require("url");

/*GET all spots*/
router.get('/', async function (req, res, next) {
    console.log("Sending all spots")
    let result = await spotsModel.getSpots()
    res.status(result.status).send(result.data)
})

/*GET a specific spot*/
router.get('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id

    let result = await spotsModel.getSpotById(id)
    res.status(result.status).send(result.data)
})

/*GET a specific spot by name*/
router.get('name/:name', async function (req, res, next) {
    let name = req.params.name
    let result = await spotsModel.getSpotByName(name)
    res.status(result.status).send(result.data)
})

/*GET the spots in designated area*/
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

/*GET a spot asn update the views by 1*/
router.get('/update/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    let result = await spotsModel.updateViewsById(id)
    console.log(result.data.rows)
    res.status(200).send(result.data.rows[0])
})

//get spots for list
router.get('/type/:id(\\d+)/listUse', async function (req, res, next) {
    let id = req.params.id
    let result = await spotsModel.getSpotsForListByIdOrderBy(id,"rateDesc")

    res.status(result.status).send(result.data)
})

//get spots for list by different order
router.get('/type/:id(\\d+)/listUse/:order', async function (req, res, next) {
    let id = req.params.id
    let order = req.params.order
    let result = await spotsModel.getSpotsForListByIdOrderBy(id, order)

    res.status(result.status).send(result.data)
})

router.get('/:id(\\d+)/photo/avg', async function (req, res,next) {
    let id = req.params.id
    let result = await spotsModel.getPhotoAndAvgBySpotId(id)
    res.status(result.status).send(result.data)
})

router.put('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    let spot = req.body
    let result = await spotsModel.updateSpotById(id, spot)
    res.status(result.status).send(result.data)
})

/*POST a new spot*/
router.post('/', async function (req, res, next) {
    let newUser = req.body
    console.log(newUser)
    let result = await spotsModel.createSpot(newUser)
    res.status(result.status).send(result.data)
})

/*DELETE a specific spot */
router.delete('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    let result = await spotsModel.deleteSpot(id)
    console.log(result)
    res.status(200).send("Deleted")
})

module.exports = router