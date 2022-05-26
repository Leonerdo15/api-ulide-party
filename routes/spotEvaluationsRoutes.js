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

module.exports = router
