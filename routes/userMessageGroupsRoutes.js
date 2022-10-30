var express = require('express');
var router = express.Router();
var userMessagesGroupsModels = require('../models/userMessageGroupsModels');
const url = require("url");
const {creatMessage} = require("../models/messagesModels");
const {creatUserMessage} = require("../models/userMessagesModels");

/*GET the menssages of a specific group*/
router.get('/group/:id(\\d+)', async function (req, res, next) {
    let gr_id = req.params.id
    let result = await userMessagesGroupsModels.getMessagesOfAGroup(gr_id)
    result = result.data
    console.log(result)
    let store = []
    let format

    for (let i = 0; i < result.length; i++) {
        format = {
            umg_id: result[i].umg_id,
            umg_gr: {
                gr_id: result[i].gr_id,
                gr_name: result[i].gr_name
            },
            umg_um:{
                um_id: result[i].um_id,
                um_me_id:{
                    me_id: result[i].me_id,
                    me_text: result[i].me_text,
                    me_date: result[i].me_date
                },
                um_us:{
                    us_id: result[i].us_id,
                    us_name: result[i].us_name,
                    us_bdate: result[i].us_bdate,
                    us_email: result[i].us_email,
                    us_bio: result[i].us_bio,
                    us_tu_id: result[i].us_tu_id,
                    us_password: result[i].us_password,
                    us_ph_id: result[i].us_ph_id
                }
            }
        }
        store.push(format)
    }
    console.log(store)
    res.status(200).send(store)
})

/*POST a message of a user in a group*/
/*
* body = {
* um_gr_id: 1
* me_text: boas
* us_id: 1
* }
* */
router.post('/', async function (req, res, mext) {
    let newObject = req.body

    let messageResult = await creatMessage(newObject.me_text)
    messageResult = messageResult.data
    console.log(messageResult)

    let userMessageResult = await creatUserMessage(messageResult.me_id, newObject.us_id)
    userMessageResult = userMessageResult.data
    console.log(userMessageResult)



    let result = await userMessagesGroupsModels.postMessageOfAUserInAGroupCompleted(userMessageResult.um_id, newObject.um_gr_id)
    console.log(result)


    res.status(result.status).send(result.data)
})

module.exports = router

