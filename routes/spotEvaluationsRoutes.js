const express = require('express');
const router = express.Router();
const spotEvaluations = require('../models/spotEvaluationModels');

/*GET the groups of a user*/
router.get('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    console.log(id)

    let result = await spotEvaluations.getSpotEvaluations(id)
    res.status(result.status).send(result.data)
})

router.get('/us_id/:us_id(\\d+)/sp_id/:sp_id(\\d+)', async function (req, res, next) {
    let sp_id = req.params.sp_id
    let us_id = req.params.us_id
    console.log(sp_id)
    console.log(us_id)

    let result = await spotEvaluations.getSpotEvaluationsBySpIdAndUsId(us_id, sp_id)
    res.status(result.status).send(result.data)
})

router.post('/', async function (req, res, next) {
    let se_rate = req.body.se_rate
    let se_comment = req.body.se_comment
    let se_sp_id = req.body.se_sp_id
    let se_us_id = req.body.se_us_id

    let result = await spotEvaluations.createSpotEvaluation(se_rate, se_comment, se_sp_id, se_us_id)
    res.status(result.status).send(result.data)
})

router.delete('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    console.log(id)

    let result = await spotEvaluations.deleteSpotEvaluation(id)
    res.status(result.status).send(result.data)
})

module.exports = router
