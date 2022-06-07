const pool = require('../database/connection');


module.exports.getPhoto = async function (id) {
    try {
        let sql = "select * from photos where ph_id = $1"
        let result = await pool.query(sql, [id])
        let photo = result.rows
        return {status: 200, data: photo}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.createPhoto = async function (photo) {
    try {
        let sql = `insert into photos (ph_photo_path, ph_tp_id) values ('${photo}', 1) returning *`
        console.log(sql)
        let result = await pool.query(sql)
        console.log(result, "result")
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.createPhotoSpot = async function (ph_id, sp_id) {
try {
        let sql = `insert into photo_spots (ps_ph_id, ps_sp_id, ps_us_id) values (${ph_id}, ${sp_id}, 1) returning *`
        let result = await pool.query(sql)
        return {status: 200, data: result}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}