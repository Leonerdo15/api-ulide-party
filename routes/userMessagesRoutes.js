const express = require('express');
const router = express.Router();
const userMessagesRouter = require('../models/userMessagesModels');

/*POST a message of a user*/
router.post('/', async function (req, res,next) {
    let newUserMessage = req.body
    let result = await userMessagesRouter.creatUserMessage(newUserMessage.um_me_id, newUserMessage.um_us_id)
    res.status(result.status).send(result.data)
})

module.exports = router