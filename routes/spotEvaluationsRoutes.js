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

router.post('/', async function (req, res, next) {
    let se_rate = req.body.se_rate
    let se_comment = req.body.se_comment
    let sp_id = req.body.sp_id
    let us_id = req.body.us_id

    let result = await spotEvaluations.createSpotEvaluation(se_rate, se_comment, sp_id, us_id)
    res.status(result.status).send(result.data)
})

router.delete('/:id(\\d+)', async function (req, res, next) {
    let id = req.params.id
    console.log(id)

    let result = await spotEvaluations.deleteSpotEvaluation(id)
    res.status(result.status).send(result.data)
})

module.exports = router
