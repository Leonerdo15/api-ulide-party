const express = require('express');
const router = express.Router();
const favSpots = require('../models/favspotsModels');

router.get('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id;
    console.log("Retrieving user with id " + id);
    let result = await favSpots.getFavSpot(id);
    res.status(result.status).send(result.data);
});

router.get('/us_id/:us_id/sp_id/:sp_id', async function (req, res, next) {
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

router.delete('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    console.log("Retrieving user with id " + id);
    let result = await favSpots.deleteFavSpot(id)
    res.status(200).send("Deleted")
});

module.exports = router