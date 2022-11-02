const express = require('express');
const router = express.Router();
const ownersModels = require('../models/ownersModels');
const url = require("url");

/*Get the no valid requests*/
router.get('/noValid', async function (req, res, next) {
    let result = await ownersModels.getNoValidRequests()
    res.status(result.status).send(result.data)
})

/* Post a new request*/
router.post('/newRequest', async function (req, res, next) {

    let allData = req.body

    let result = await ownersModels.postOwner(allData)

    allData = {
        ...allData,
        ...result.data
    }

    let result2 = await ownersModels.postSpotRequests(allData)

    allData = {
        ...allData,
        ...result2.data
    }

    let result3 = await ownersModels.postPhotosSpotsRequests(allData)
    res.status(result3.status).send(result3.data)
})

module.exports = router;