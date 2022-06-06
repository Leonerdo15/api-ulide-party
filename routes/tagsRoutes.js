const express = require('express');
const router = express.Router();
const tagsModels = require('../models/tagsModels');


router.get('/', async function (req, res, next) {
    console.log("Sending all tags")
    let result = await tagsModels.getAllTags()
    res.status(result.status).send(result.data)
})

router.get('/spot/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    let result = await tagsModels.getTagsOfSpot(id)
    console.log(result)
    console.log(Object.keys(result.data).length)
    res.status(result.status).send(result.data)
})


module.exports = router