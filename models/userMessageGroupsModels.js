const pool = require('../database/connection');

module.exports.getUserMessageGroups = async function () {
    try {
        let sql = 'select * from user_message_groups umg' +
            '    inner join groups on gr_id = umg.umg_gr_id' +
            '    inner join user_messages um on umg.umg_um_id = um.um_id' +
            '    inner join messages on um.um_me_id = me_id inner join users on um.um_us_id = users.us_id'

        let result = await pool.query(sql)
        let json = result.rows
        return {status: 200, data: json}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getUserMessageGroupsByGroupId = async function (id) {
    try {
        let sql = 'select * from user_message_groups umg' +
            '    inner join groups on gr_id = umg.umg_gr_id' +
            '    inner join user_messages um on umg.umg_um_id = um.um_id' +
            '    inner join messages on um.um_me_id = me_id inner join users on um.um_us_id = users.us_id ' +
            '         where gr_id = ' + id

        let result = await pool.query(sql)
        let json = result.rows
        console.log(result)
        return {status: 200, data: json}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.postMessageOfAUserInAGroup = async function (message, group, user) {

}