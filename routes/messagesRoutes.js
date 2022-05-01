const express = require('express');
const router = express.Router();
const messageModel = require('../models/messagesModels');

/* GET a specific message */
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id;
    console.log("Retrieving user with id " + id);
    let result = await messageModel.getMessageById(id);
    res.status(result.status).send(result.data);
});

router.post('/', async function (req, res,next) {
    let newMessage = req.body
    let result = await messageModel.creatMessage(newMessage.me_text)
    res.status(result.status).send(result.data)
})

router.delete('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    let result = await messageModel.deleteMessage(id)
    res.status(result.status).send(result.data)
})


module.exports = router