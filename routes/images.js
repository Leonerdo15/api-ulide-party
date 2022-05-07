const express = require('express');
const router = express.Router();

const formidable = require('formidable');
const fs = require('fs');

router.post('/save',  function (req,res) {
    let form = new formidable.IncomingForm();
    console.log("aaaaaaaaaaaaaa")
    form.parse(req, function (err, fields, files) {
        console.log("bbbbbbbbbbbbbbbbbbbb")
        console.log(req)

        let url = __dirname
        let newUrl = url.replace("routes", "public\\images\\spots\\")

        const oldpath = files.filetoupload.filepath;
        console.log("testeeeetetetettte")

        const newpath = newUrl + files.filetoupload.originalFilename;
        console.log(newpath)
        fs.rename(oldpath, newpath, function (err) {
            console.log("ccccccccccccccccccccccc")
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
})

router.get('/teste', async function (req, res, next) {
    const x = {
      bata:"teste"
    }
    res.status(200).send(x)
})


module.exports = router