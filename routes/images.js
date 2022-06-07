const express = require('express');
const router = express.Router();
const spotsModel = require('../models/spotsModels');

const formidable = require('formidable');
const fs = require('fs');
const photo = require("../models/photoModels");

const cloudinary = require('cloudinary').v2

router.post('/save/:name',  async function (req,res) {
    let name = req.params.name
    let spot = req.body
    cloudinary.config({
        cloud_name: 'ulide-party',
        api_key: '757193529144895',
        api_secret: 'zWOHPeQOb7-ZiQBXHG5STwqITJk'
    });

    let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {

        const oldpath = files.filetoupload.filepath;
        let imageName = files.filetoupload.originalFilename
        let position = imageName.indexOf(".")
        let newImageName = imageName.substring(0, position)

        let photoStore = await photo.createPhoto(newImageName)
        console.log(photoStore)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        let photoId = photoStore.ph_id
        let phSp = await photo.createPhotoSpot(photoId, 20)
        console.log(phSp)

        cloudinary.uploader.upload(oldpath,
            {
                public_id: name + "/" + newImageName
            },
            function (err, callResult) {
                console.log(err, callResult)
            })
        res.status(200).send("well done");
        res.end();
    });
})


module.exports = router