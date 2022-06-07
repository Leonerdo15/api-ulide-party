const express = require('express');
const router = express.Router();
const phModel = require('../models/photoModels');

router.post('/save/:name',  async function (req,res) {
    let name = req.params.name
    console.log(name, "name")
    let save = await phModel.createPhoto(name)
    console.log(save, "save")
    res.status(save.status).send(save.data)
})

router.post('/saveAll/:name/:id',  async function (req,res) {
    let name = req.params.name
    let id = req.params.id
    let save = await phModel.createPhotoSpot(name, id)
    res.status(save.status).send(save.data)
})

module.exports = router