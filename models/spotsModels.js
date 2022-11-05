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

module.exports.getSpotByName = async function (name) {
    try {
        let sql = `select *, st_x(sp_location) sp_lat, st_y(sp_location) sp_long from spots where sp_name like '%${name}%'`
        let result = await pool.query(sql)
        return {status:200, data: result.rows}
    }catch (e) {
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
        return { status: 200, data: result};
    }catch (e) {
        console.log(e);
        return { status: 500, data: e };
    }
}

module.exports.updateSpotById = async function (id, spot) {
    try {
        let sql = 'UPDATE spots SET '
        let query2 = ' WHERE sp_id = $1 returning *, st_x(sp_location) sp_lat, st_y(sp_location) sp_long'

        for (let i = 0; i < Object.keys(spot).length; i++) {

            sql += `${Object.keys(spot)[i]} = ${ "'" + spot[Object.keys(spot)[i]] + "', " }`

        }

        sql = sql.substring(0, sql.length - 2)
        sql += query2

        let result = await pool.query(sql, [id])
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
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

module.exports.getSpotsForListByIdOrderBy = async function (id, order) {
    
    try {
        let result
        let sqlRateAsc = `select  sp_id, sp_name, ph_name, COALESCE(avg(se_rate),0) avg, sp_verification from all_photos
                                                                                          inner join spots  on sp_id = ph_sp_id
                                                                                          full outer join spot_evaluations on sp_id = se_sp_id
                   where sp_st_id = ${id}
                   group by sp_name, ph_name, sp_id
                   order by avg(se_rate) desc;`
        let sqlViewAsc = `
                            select  sp_id, sp_name, ph_name, sp_views, sp_verification, COALESCE(avg(se_rate),0) avg, sp_verification from all_photos
                                inner join spots  on sp_id = ph_sp_id
                                full outer join spot_evaluations on sp_id = se_sp_id
                                                                                                                                      where sp_st_id = ${id}
                                                                                                                                      group by sp_name, ph_name, sp_id, sp_views
                                                                                                                                      order by sp_views asc;`
        let sqlRateDesc = `select  sp_id, sp_name, ph_name, COALESCE(avg(se_rate),0) avg, sp_verification from all_photos
                                                                                          inner join spots  on sp_id = ph_sp_id
                                                                                          full outer join spot_evaluations on sp_id = se_sp_id
                   where sp_st_id = ${id}
                   group by sp_name, ph_name, sp_id
                   order by avg(se_rate) asc ;`
        let sqlViewDesc =`
            select  sp_id, sp_name, ph_name, sp_views, sp_verification, COALESCE(avg(se_rate),0) avg, sp_verification from all_photos
                                                                                                                               inner join spots  on sp_id = ph_sp_id
                                                                                                                               full outer join spot_evaluations on sp_id = se_sp_id
            where sp_st_id = ${id}
            group by sp_name, ph_name, sp_id, sp_views
            order by sp_views desc;`

        if(order === "rateAsc" ){
            result = await pool.query(sqlRateAsc)
        }
        else if(order === "rateDesc"){
            result = await pool.query(sqlRateDesc)
        }
        else if(order === "viewAsc"){
            result = await pool.query(sqlViewAsc)
        }
        else if(order === "viewDesc"){
            result = await pool.query(sqlViewDesc)
        }

        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
   
}


/*module.exports.getSpotsForListByIdOrderByDistanceAsc = async function (id, lat, long) {
    try {
        let sql = `select  sp_id, sp_name, ph_name, st_distance_sphere(sp_location, st_makepoint(${long}, ${lat})) as distance from all_photos
                                                                                          inner join spots  on sp_id = ph_sp_id
                   where sp_st_id = ${id}
                   group by sp_name, ph_name, sp_id, distance
                   order by distance asc;`

        let result = await pool.query(sql)
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}*/

module.exports.getPhotoAndAvgBySpotId = async function (id) {
    try {
        let sql = `select ph_name, COALESCE(avg(se_rate),0) avg, count(se_rate)from all_photos
                                                                                        inner join spots on sp_id = ph_sp_id
                                                                                        full outer join spot_evaluations on sp_id = se_sp_id
                   where ph_sp_id = ${id}
                   group by ph_name;`
        let result = await pool.query(sql)
        return {status:200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

