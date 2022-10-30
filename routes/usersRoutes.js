const express = require('express');
const router = express.Router();
const usersModel = require('../models/usersModels');
const md5 = require('md5');
const url = require("url");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    console.log("Sending all users")
    let result = await usersModel.getUsers()
    res.status(result.status).send(result.data)
})

/* GET a specific users */
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id;
    console.log("Retrieving user with id " + id);
    let result = await usersModel.getUserById(id);
    res.status(result.status).send(result.data);
});


// router.get('/:name', async function (req, res, next) {
//     let name = req.params.name
//     let result = await usersModel.getUserByUsName(name)
//     res.status(result.status).send(result.data)
// })

/*GET login authentication*/
router.get('/login', async function (req, res ,next) {
    console.log("Login authentication")
    let queryObject = url.parse(req.url, true).query;
    let name = queryObject.us_name
    let password = md5(queryObject.us_password)

    console.log(name)
    let result = await usersModel.getLoginAuthentication(name, password)
    let user = result.rows
    res.status(result.status).send(result.data)
})

/* POST a user */
router.post('/',  async function (req, res, next) {
    let newUser = req.body
    console.log(JSON.stringify(newUser))
    let result = await usersModel.saveUsers(newUser)
    res.status(result.status).send(result.data)
})

/*DELETE a specific user */
router.delete('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    console.log("Retrieving user with id " + id);
    let result = await usersModel.deleteUser(id)
    res.status(200).send("Deleted")
})

module.exports = router;