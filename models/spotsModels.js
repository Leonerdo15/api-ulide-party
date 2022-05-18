const pool = require('../database/connection');

module.exports.getSpots = async function () {
    try {
        let sql = 'select *, st_x(sp_location) sp_lat, st_y(sp_location) sp_long from spots'
        let result = await pool.query(sql)
        let spot = result.rows
        console.log(JSON.stringify(spot))
        return {status: 200, data: spot}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getSpotById = async function(id){
    try {
        let sql = "select *, st_x(sp_location) sp_lat, st_y(sp_location) sp_long from spots where sp_id = $1"
        let result = await pool.query(sql, [id])
        let spots = result.rows
        if (spots.length > 0){
            console.log(JSON.stringify(spots[0]))
            return {status: 200, data:spots[0]}
        } else {
            return {status: 404, data: spots[0]}
        }
    } catch (e){
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getSpotsByArea = async function (lat, long, dist) {
    try {
        let sql = `with data as( select st_astext(ST_Buffer( ST_GeomFromText(\'POINT(${lat} ${long})\'), ${dist}, \'quad_segs=8\')) circ ) select ST_AsText(ST_Intersection(sp_location, data.circ::geometry)) from spots, data;`
        let result = await pool.query(sql)
        let spots = result.rows
        return {status: 200, data: spots}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getSpotsByType = async function (type_id) {
    try {
        let sql = "select * from spots where sp_st_id = $1"
        let result = await pool.query(sql, [type_id])
        let spots = result.rows
        return {status: 200, data: spots}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.createSpot = async function (user) {

    try {

        let query1 = 'INSERT INTO spots ('
        let query2 = ' ) VALUES ('

        query1 += `${Object.keys(user)[0]}, `
        query2 += `${ "'" + user[Object.keys(user)[0]] + "', " }`

        for (let i = 1; i < Object.keys(user).length; i++) {

            query1 += `${Object.keys(user)[i]}, `
            query2 += `${ "'" + user[Object.keys(user)[i]] + "', " }`

        }

        query1 = query1.substring(0, query1.length - 2)
        query2 = query2.substring(0, query2.length - 2)
        query2 += ') returning *'

        let fullQuery = query1+query2

        let result = await pool.query(fullQuery);
        let userResult = result.rows[0];
        console.log(result)

        return {status: 200, data: userResult}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e }
    }
}

module.exports.updateViewsById = async function (id) {
    try {
        let sql = 'UPDATE spots SET sp_views = sp_views + 1 WHERE sp_id = $1 returning *, st_x(sp_location) sp_lat, st_y(sp_location) sp_long'
        let result = await pool.query(sql, [id])
        return { status: 200, data: result[0] };
    }catch (e) {
        console.log(e);
        return { status: 500, data: e };
    }
}

module.exports.deleteSpot = async function (id) {
    try {
        let sql = "DELETE FROM spots WHERE sp_id = $1"
        let result = await pool.query(sql, [id]);
        console.log(result)
    }catch (err) {
        console.log(err)
        return {status: 500, data: err}
    }
}

module.exports.getSpotsForListById = async function (id) {
    try {
        let sql = `select sp_id, sp_name, ph_photo_path, avg(se_rate) from photo_spots
                                                                               inner join photos p on p.ph_id = photo_spots.ps_ph_id
                                                                               inner join spots s on s.sp_id = photo_spots.ps_sp_id inner join spot_evaluations se on s.sp_id = se.se_sp_id
                   where sp_st_id = ${id}
                   group by ph_photo_path, sp_name, sp_id order by avg(se_rate) desc`

        let result = await pool.query(sql)
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getPhotoAndAvgBySpotId = async function (id) {
    try {
        let sql = `select ph_photo_path, avg(se_rate), count(se_rate) from photo_spots inner join photos p on photo_spots.ps_ph_id = p.ph_id
    inner join spots s on s.sp_id = photo_spots.ps_sp_id
    inner join spot_evaluations se on sp_id = se_sp_id
where ps_sp_id = ${id} group by ph_photo_path`
        let result = await pool.query(sql)
        return {status:200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.getSpotsForList = async function () {
    try {
        let sql = `select sp_id, sp_name, ph_photo_path, avg(se_rate) from photo_spots
    inner join photos p on p.ph_id = photo_spots.ps_ph_id
    inner join spots s on s.sp_id = photo_spots.ps_sp_id inner join spot_evaluations se on s.sp_id = se.se_sp_id
group by ph_photo_path, sp_name, sp_id order by avg(se_rate) desc `
        let result = await pool.query(sql)
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}