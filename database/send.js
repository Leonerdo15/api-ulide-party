const cloud = require('cloudinary').v2

cloud.c('batata.jpg',
    {

    },
    function (err, callResult) {
        console.log(err, callResult)
    })