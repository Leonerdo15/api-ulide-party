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

module.exports.getUsersOfAGroup = async function (id) {

    try {
        let sql = "select * from user_groups inner join users u on u.us_id = user_groups.ug_us_id" +
            " where ug_gr_id = " + id
        let result = await pool.query(sql)
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.createGroup = async function(name) {
    try {
        let sql = "insert into groups (gr_name) values ($1) returning *"
        let result = await pool.query(sql, [name])
        return {status: 200, data: result.rows}
    }catch(e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getAllGroups = async function() {
    try {
        let sql = "select * from groups"
        let result = await pool.query(sql)
        return {status: 200, data: result.rows}
    } catch(e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getFriends = async function (id) {
    try {
        let sql = `select distinct u2.us_id, u2.us_name from (select gr_id, gr_name, us_id, us_name from groups inner join user_groups ug on groups.gr_id = ug.ug_gr_id inner join users u on u.us_id = ug.ug_us_id where us_id = ${id}) friends inner join user_groups on gr_id = user_groups.ug_gr_id inner join users u2 on u2.us_id = user_groups.ug_us_id where u2.us_id != ${id}`
        let result = await pool.query(sql)
        return {status: 200, data: result.rows}
    } catch(e) {
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