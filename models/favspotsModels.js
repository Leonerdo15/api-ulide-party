const pool = require('../database/connection');

module.exports.getFavSpot = async function (id) {
    try {
        let sql = `select * from fav_spots where fs_id = ${id}`;
        let result  = await pool.query(sql)
        let users = result.rows
        console.log(JSON.stringify(users))
        return {status: 200, data: users}
    }catch (err){
        console.log(err)
        return { status: 500, data: err };
    }
}

module.exports.getFavSpotByUsIdAndSpId = async function(us_id, sp_id){
    try {
        let sql = `select * from fav_spots where fs_sp_id = ${sp_id} and fs_us_id = ${us_id}`;
        let result  = await pool.query(sql)
        let users = result.rows
        console.log(JSON.stringify(users))
        return {status: 200, data: users}
    }catch (err){
        console.log(err)
        return { status: 500, data: err };
    }
}

module.exports.creatFavSpot = async function (us_id, spot_id) {

    try {

        let sql = `INSERT INTO public.fav_spots ( fs_us_id, fs_sp_id) VALUES (${us_id}, ${spot_id}) returning *`

        let result = await pool.query(sql);
        let fav = result.rows[0];
        console.log(result)

        return {status: 200, data: fav}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e }
    }
}

module.exports.deleteFavSpot = async function (id) {
    try {
        let sql = "DELETE FROM fav_spots WHERE fs_id = $1"
        let result = await pool.query(sql, [id]);
        console.log(result)
        return {status: 200, data: result.rows[0]}
    }catch (err) {
        console.log(err)
        return {status: 500, data: err}
    }
}