const pool = require('../database/connection');

/*
* this function gets all the photos of a spot from the database
* */
module.exports.getPhoto = async function (id) {
    try {
        let sql = "select * from all_photos where ph_id = $1"
        let result = await pool.query(sql, [id])
        let photo = result.rows
        return {status: 200, data: photo}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

/*
* This function creates a new photo in the database
* @param {string} phName - the name of the photo
* @param {string} spotsId - the id of the spot
* @param {string} userId - the id of the user
* @returns {object} - returns an object with the status and the data inserted
* */
module.exports.createPhoto = async function (phName, spotsId, userId) {
    try {
        let sql = `insert into all_photos (ph_name, ph_sp_id, ph_us_id) values ('${phName}', '${spotsId}', '${userId}') returning *`
        console.log(sql)
        let result = await pool.query(sql)
        console.log(result.rows[0], "result")
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}