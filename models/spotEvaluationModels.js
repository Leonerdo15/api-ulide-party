const pool = require('../database/connection');

module.exports.getSpotEvaluations = async function (id) {
    try {
        let sql =  `select se_rate, se_comment, TO_CHAR(se_date :: DATE, ' dd, Mon, yyyy'), us_name from spot_evaluations inner join users u on spot_evaluations.se_us_id = u.us_id where se_sp_id = ${id}`
        let result = await pool.query(sql)
        let evaluations = result.rows
        return {status: 200, data: evaluations}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}


module.exports.createSpotEvaluation = async function (se_rate, se_comment, se_sp_id, se_us_id) {
try {
        let sql =  `insert into spot_evaluations(se_rate, se_comment, se_sp_id, se_us_id) values (${se_rate}, '${se_comment}', ${se_sp_id}, ${se_us_id})`
        let result = await pool.query(sql)
        console.log(sql)
        return {status: 200, data: "created"}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.deleteSpotEvaluation = async function (se_id) {
    try {
        let sql =  `delete from spot_evaluations where se_id = ${se_id}`
        let result = await pool.query(sql)
        console.log(sql)
        return {status: 200, data: "deleted"}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}