const pool = require('../database/connection');

module.exports.getOwers = async function(){
    try {
        let sql = "select * from owers";
        let result  = await pool.query(sql)
        let owers = result.rows
        console.log(JSON.stringify(owers))
        return {status: 200, data: owers}
    }catch (err){
        console.log(err)
        return { status: 500, data: err };
    }
}