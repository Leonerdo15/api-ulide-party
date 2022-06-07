const pool = require('../database/connection');


module.exports.getMessageById = async function (id) {
    try {
        let sql = "select * from messages where me_id = $1"
        let result = await pool.query(sql, [id])
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.creatMessage = async function (message) {
    const today = new Date();
    const myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
    console.log(myToday)

    try {
        let sql = "insert into messages (me_text) values ($1) returning *"
        let result = await pool.query(sql, [message])
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}



module.exports.deleteMessage = async function (id) {
    try {
        let sql = "delete from messages where me_id = $1 returning *"
        let result = await pool.query(sql, [id])
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}