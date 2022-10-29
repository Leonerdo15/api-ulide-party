const express = require('express');
const router = express.Router();
const phModel = require('../models/allPhotosModels');
const url = require("url");

router.post('/save',  async function (req,res) {
    let queryObject = url.parse(req.url, true).query;
    let phName = queryObject.us_name
    let spotsId = queryObject.us_name
    let userId = queryObject.us_name
    console.log(name, "name")
    let save = await phModel.createPhoto(name)
    console.log(save, "save")
    res.status(save.status).send(save.data)
})


module.exports = router