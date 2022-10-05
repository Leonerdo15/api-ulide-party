const pool = require('../database/connection');
const md5 = require("md5");

module.exports.getUsers = async function(){
    try {
        let sql = "select * from users";
        let result  = await pool.query(sql)
        let users = result.rows
        console.log(JSON.stringify(users))
        return {status: 200, data: users}
    }catch (err){
        console.log(err)
        return { status: 500, data: err };
    }
}

module.exports.getUserByUsName = async function (name) {
    console.log(JSON.stringify(name))

    try {
        let sql = "select * from users where us_name = $1"
        let result = await pool.query(sql, [name])
        let users = result.rows
        if (users.length > 0){
            console.log(JSON.stringify(users[0]))
            return {status: 200, data:users[0]}
        } else {
            return {status: 404, data: users[0]}
        }
    } catch (err){
        console.log(err)
        return {status: 500, data: err}
    }
}

module.exports.getUserById = async function(id){
    console.log(JSON.stringify(id))

    try {
        let sql = "select * from users where us_id = $1"
        let result = await pool.query(sql, [id.toString()])
        let users = result.rows
        if (users.length > 0){
            console.log(JSON.stringify(users[0]))
            return {status: 200, data:users[0]}
        } else {
            return {status: 404, data: users[0]}
        }
    } catch (err){
        console.log(err)
        return {status: 500, data: err}
    }
}

module.exports.getLoginAuthentication = async function (name, password) {
    console.log("us_name: " + name + " password: " + password)
    try {
        let sql = "select us_id, us_name, us_tu_id from users where us_name = $1 and us_password = $2"
        let result = await pool.query(sql, [name, password])
        let user = result.rows[0]
        return {status: 200, data: user}
    }catch (err) {
        console.log(err)
        return {status: 500, data: err}
    }
}

module.exports.saveUsers = async function(user){
    console.log(JSON.stringify(user))

    try {

        let query1 = 'INSERT INTO users ('
        let query2 = ' ) VALUES ('

        if (Object.keys(user)[0] === "us_password"){
            query1 += `${Object.keys(user)[0]}, `
            query2 += `${ "'" + md5(user[Object.keys(user)[0]]) + "', " }`
        }else {
            query1 += `${Object.keys(user)[0]}, `
            query2 += `${ "'" + user[Object.keys(user)[0]] + "', " }`
        }

        for (let i = 1; i < Object.keys(user).length; i++) {
            if (Object.keys(user)[i] === "us_password"){
                query1 += `${Object.keys(user)[i]}, `
                query2 += `${ "'" + md5(user[Object.keys(user)[i]]) + "', " }`
            }else {
                query1 += `${Object.keys(user)[i]}, `
                query2 += `${ "'" + user[Object.keys(user)[i]] + "', " }`
            }
        }

        query1 = query1.substring(0, query1.length - 2)
        query2 = query2.substring(0, query2.length - 2)
        query2 += ')  returning *'

        let fullQuery = query1+query2

        let result = await pool.query(fullQuery);
        let userResult = result.rows[0];
        console.log(JSON.stringify(userResult));
        return { status: 200, data: userResult };
    } catch (e) {
        console.log(e);
        return { status: 500, data: e };
    }
}


module.exports.deleteUser = async function (id) {
    console.log(JSON.stringify(id));
    try {
        let sql = "DELETE FROM users WHERE us_id = $1 returning *"
        let result = await pool.query(sql, [id]);
        console.log(result)
        return  {status: 200, data: result}
    }catch (err) {
        console.log(err)
        return {status: 500, data: err}
    }
}



// function failUser(user) {
//     if (typeof user.us_name != "string" ) {
//         user.errMsg = "Invalid name";
//         return true;
//     }
//     return false;
// }