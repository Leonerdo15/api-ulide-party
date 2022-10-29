const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const photo = require("../models/photoModels");
const allPhotos = require("../models/allPhotosModels");
const url = require("url");

const cloudinary = require('cloudinary').v2

router.post('/save',  async function (req,res) {
    let queryObject = url.parse(req.url, true).query;
    let fileName = queryObject.us_name
    let spotsId = queryObject.us_name
    let userId = queryObject.us_name

    // cloudinary credentials
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


        let photoStore = await allPhotos.createPhoto(spotsId, userId)


        cloudinary.uploader.upload(oldpath,
            {
                public_id: fileName + "/" + photoStore.id
            },
            function (err, callResult) {
                console.log(err, callResult)
            })
        res.status(200).send("Estou farto disto. Nem sou cristao mas Deus ajuda meu pai. sarava!!!!");
        res.end();
    });
})


module.exports = router