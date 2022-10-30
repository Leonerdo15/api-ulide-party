const pool = require('../database/connection');

module.exports.getMessagesOfAGroup = async function (id) {
    try {
        let sql = `select * from user_message_groups umg
                    inner join groups on gr_id = umg.umg_gr_id
                    inner join user_messages um on umg.umg_um_id = um.um_id
                    inner join messages on um.um_me_id = me_id
                    inner join users on um.um_us_id = users.us_id
                where gr_id = ${id}
                order by me_date`

        let result = await pool.query(sql)
        let json = result.rows
        console.log(result)
        return {status: 200, data: json}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.postMessageOfAUserInAGroupCompleted = async function (um_id, gr_id) {
    try {
        let sql = "insert into user_message_groups (umg_gr_id, umg_um_id) VALUES ($1, $2) returning *"
        let result = await pool.query(sql, [gr_id, um_id])
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}