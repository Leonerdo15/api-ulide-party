const express = require('express');
const router = express.Router();

const formidable = require('formidable');
const fs = require('fs');

const cloudinary = require('cloudinary').v2



router.post('/save',  function (req,res) {
    let name = req.params.name
    let form = new formidable.IncomingForm();
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
    form.parse(req, function (err, fields, files) {
        const oldpath = files.filetoupload.filepath;
        console.log(oldpath)


        // const newpath = newUrl + files.filetoupload.originalFilename;
        // console.log(newpath)
        // fs.rename(oldpath, newpath, function (err) {
        //     console.log("ccccccccccccccccccccccc")
        //     if (err) throw err;
        //     res.write('File uploaded and moved!');
        //     res.end();
        // });
        cloudinary.config({
            cloud_name: 'ulide-party',
            api_key: '757193529144895',
            api_secret: 'zWOHPeQOb7-ZiQBXHG5STwqITJk'
        });

        // console.log(cloudinary.url(oldpath))

        let imageName = files.filetoupload.originalFilename
        let position = imageName.indexOf(".")
        let newImageName = imageName.substring(0, position)

        cloudinary.uploader.upload(oldpath,
            {
               public_id: newImageName
            },
            function (err, callResult) {
                console.log(err, callResult)
            })
        res.write("batata")
        res.end()
    });
})

router.get('/teste', async function (req, res, next) {
    const x = {
      bata:"teste"
    }
    res.status(200).send(x)
})


module.exports = router