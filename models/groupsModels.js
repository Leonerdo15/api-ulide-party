const pool = require('../database/connection');

module.exports.getGroupsOfAUser = async function (id) {
    try {
        let sql = "select * from user_groups inner join groups g on g.gr_id = user_groups.ug_gr_id" +
            "         where ug_us_id = " + id

        console.log(sql)
        let result = await pool.query(sql)
        let groups = result.rows
        console.log(groups)
        console.log(sql)
        return {status: 200, data: groups}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getGroupById = async function (id) {
    try {
        let sql = "select * from groups where gr_id = $1"
        let result = await pool.query(sql, [id])
        return{status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getUsersOfAGroup = async function (id) {

    try {
        let sql = "select * from user_groups inner join users u on u.us_id = user_groups.ug_us_id" +
            "         where ug_gr_id = " + id
        let result = await pool.query(sql)
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.createGroup = async function (name) {
    try {
        let sql = "insert into groups (gr_name) values ($1) returning *"
        let result = await pool.query(sql, [name])
        return {status: 200, data: result.rows}
    }catch (e){
        console.log(e)
        return {status: 500, data: e}
    }
}

/**
 * To execute the delete function is necessary to delete others things
 *
 *
 * */
module.exports.deleteGroup = async function () {

}