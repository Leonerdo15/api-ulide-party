const pool = require('../database/connection');

module.exports.getSpotEvaluations = async function (id) {
    try {
        let sql =  `select se_rate, se_comment, TO_CHAR(se_date :: DATE, ' dd, Mon, yyyy'), us_name from spot_evaluations inner join users u on spot_evaluations.se_us_id = u.us_id where se_sp_id = 1`
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