const express = require('express');
const router = express.Router();
const groupsModels = require('../models/groupsModels');

/*GET the groups of a user*/
router.get('/user/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    console.log(id)

    let result = await groupsModels.getGroupsOfAUser(id)
    res.status(result.status).send(result.data)
})

/*GET the users in a group*/
router.get('/:id(\\d+)/users', async function (req, res, next) {
    let id = req.params.id
    console.log(id)

    let result = await groupsModels.getUsersOfAGroup(id)
    res.status(result.status).send(result.data)
})

/*POST a new group*/
router.post('/', async function (req, res, next) {
    let newGroup = req.body
    let result = await groupsModels.createGroup(newGroup.gr_name)
    console.log(result)
    res.status(result.status).send(result.data[0])
})

/*GET all groups*/
router.get('/', async function (req,res) {
    let result = await groupsModels.getAllGroups()
    console.log(result)
    res.status(result.status).send(result.data)
})

/* GET Friends from a User by id */
router.get('/friends/user/:id(\\d+)', async function (req,res) {
    let id = req.params.id
    let result = await groupsModels.getFriends(id)
    console.log(result)
    res.status(result.status).send(result.data)
})

module.exports = router