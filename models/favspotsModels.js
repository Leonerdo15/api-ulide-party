const pool = require('../database/connection');

// module.exports.getUsers = async function(){
//     try {
//         let sql = "select * from users";
//         let result  = await pool.query(sql)
//         let users = result.rows
//         console.log(JSON.stringify(users))
//         return {status: 200, data: users}
//     }catch (err){
//         console.log(err)
//         return { status: 500, data: err };
//     }
// }