const pool = require('../database/connection');

module.exports.getAllTags = async function () {
    try {
        let sql = `select tg_id, tg_name from tags`
        let result = await pool.query(sql)
        return{status: 200 ,data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getTagsOfSpot = async function (id) {
    try {
        let sql = `select tg_id, tg_name from users_spots_tags
    inner join spots s on s.sp_id = users_spots_tags.ust_sp_id
    inner join tags t on t.tg_id = users_spots_tags.ust_tg_id where sp_id = ${id}`
        let result = await pool.query(sql)
        return{status: 200 ,data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}