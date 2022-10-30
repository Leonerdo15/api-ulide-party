const express = require('express');
const router = express.Router();
const favSpots = require('../models/favspotsModels');

router.get('/us_id/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id;
    console.log("Retrieving user with id " + id);
    let result = await favSpots.getFavSpotBySpId(id);
    res.status(result.status).send(result.data);
});

router.get('/us_id/:us_id(\\d+)/sp_id/:sp_id(\\d+)', async function (req, res, next) {
    console.log("Sending all favSpots")
    let result = await favSpots.getFavSpotByUsIdAndSpId(req.params.us_id, req.params.sp_id)
    console.log(result)
    res.status(result.status).send(result.data)
});

router.post('/', async function (req, res, next) {
    let newFavSpot = req.body
    console.log(JSON.stringify(newFavSpot))
    let result = await favSpots.creatFavSpot(newFavSpot.us_id, newFavSpot.sp_id)
    res.status(result.status).send(result.data)
});

router.delete('/us_id/:us_id(\\d+)/sp_id/:sp_id(\\d+)', async function (req, res, next) {
    let us_id = req.params.us_id
    let sp_id = req.params.sp_id
    let result = await favSpots.deleteFavSpot(us_id, sp_id);
    res.status(200).send(result.data)
});

module.exports = router