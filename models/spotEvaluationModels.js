const pool = require('../database/connection');

module.exports.getSpotEvaluations = async function (id) {
    try {
        let sql =  `select * from spot_evaluations where se_sp_id = ${id}`
        let result = await pool.query(sql)
        let evaluations = result.rows
        console.log(evaluations)
        console.log(sql)
        return {status: 200, data: evaluations}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}