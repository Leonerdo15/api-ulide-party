const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const allPhotos = require("../models/allPhotosModels");
const url = require("url");

const cloudinary = require('cloudinary').v2

router.post('/save',  async function (req,res) {
    let queryObject = url.parse(req.url, true).query;
    let directory = queryObject.dir
    let spotsId = queryObject.spot
    let userId = queryObject.user

    // cloudinary credentials
    cloudinary.config({
        cloud_name: 'ulide-party',
        api_key: '757193529144895',
        api_secret: 'zWOHPeQOb7-ZiQBXHG5STwqITJk'
    });

    let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {

        const oldpath = files.filetoupload.filepath;

        let photoStore = await allPhotos.createPhoto(spotsId, userId)

        await cloudinary.uploader.upload(oldpath,
            {
                public_id: directory + "/" + photoStore.ph_name
            },
            function (err, callResult) {
                console.log(err, callResult)
            })
        res.status(200).send(photoStore.data);
        res.end();
    });
})


module.exports = router