const express = require('express');
const router = express.Router();

const formidable = require('formidable');
const fs = require('fs');

const cloudinary = require('cloudinary').v2



router.post('/save',  function (req,res) {

    cloudinary.config({
        cloud_name: 'ulide-party',
        api_key: '757193529144895',
        api_secret: 'zWOHPeQOb7-ZiQBXHG5STwqITJk'
    });

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        const oldpath = files.filetoupload.filepath;
        let imageName = files.filetoupload.originalFilename
        let position = imageName.indexOf(".")
        let newImageName = imageName.substring(0, position)

        cloudinary.uploader.upload(oldpath,
            {
               public_id: "spots/" + newImageName
            },
            function (err, callResult) {
                console.log(err, callResult)
            })
        res.write(cloudinary.url(newImageName))
        res.end()
    });
})


module.exports = router