const pool = require('../database/connection');


module.exports.creatUserMessage = async function (me_id, us_id) {
    try {
        let sql = "insert into user_messages (um_me_id, um_us_id) VALUES ($1, $2) returning *"
        let result = await pool.query(sql, [me_id, us_id])
        return  {status: 200, data: result.rows[0]}
    }catch (e){
        console.log(e)
        return {status: 500, data: e}
    }
}