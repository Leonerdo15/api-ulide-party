const express = require('express');
const router = express.Router();
const messageModel = require('../models/messagesModels');

/*DELETE a specific message */
router.delete('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    let result = await messageModel.deleteMessage(id)
    res.status(result.status).send(result.data)
})


module.exports = router