const pool = require('../database/connection');

/*get all owner*/



module.exports.getNoValidRequests = async function () {
    try {
        let sql = `select ow_id, ow_us_id, ow_sp_id, ow_validation, sr_id, sr_text_request, sr_validation, sr_ow_id, ph_id, ph_name
                   from owners
                            inner join spot_requests on owners.ow_id = spot_requests.sr_ow_id
                            inner join photos_spots_requests on spot_requests.sr_id = photos_spots_requests.psr_sr_id
                            inner join all_photos on photos_spots_requests.psr_ph_id = ph_id
                   where ow_validation = false and sr_validation = false`
        console.log(sql)
        let result = await pool.query(sql)
        return {status: 200, data: result.rows}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}


module.exports.postOwner = async function (owner) {
    try {
        let sql = `insert into owners (ow_us_id, ow_sp_id) values ('${owner.ow_us_id}', '${owner.ow_sp_id}') returning *`
        console.log(sql)
        let result = await pool.query(sql)
        console.log(result.rows[0], "result")
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.postSpotRequests = async function (spotRequest) {
    try {
        let sql = `insert into spot_requests (sr_text_request, sr_ow_id) values ('${spotRequest.sr_text_request}', '${spotRequest.ow_id}') returning *`
        console.log(sql)
        let result = await pool.query(sql)
        console.log(result.rows[0], "result")
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.postPhotosSpotsRequests = async function (photoSpotRequest) {
    try {
        let sql = `insert into photos_spots_requests (psr_ph_id, psr_sr_id) values ('${photoSpotRequest.ph_id}', '${photoSpotRequest.sr_id}') returning *`
        console.log(sql)
        let result = await pool.query(sql)
        console.log(result.rows[0], "result")
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.updateOwnerValidation = async function (owner) {
    try {
        let sql = `update owners set ow_validation = '${owner.ow_validation}' where ow_id = '${owner.ow_id}' returning *`
        console.log(sql)
        let result = await pool.query(sql)
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.updateSpotRequestsValidation = async function (spotRequest) {
    try {
        let sql = `update spot_requests set sr_validation = '${spotRequest.sr_validation}' where sr_id = '${spotRequest.sr_id}' returning *`
        console.log(sql)
        let result = await pool.query(sql)
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}

module.exports.deleteOwner = async function (owner) {
    try {
        let sql = `delete from owners where ow_id = '${owner.ow_id}' returning *`
        console.log(sql)
        let result = await pool.query(sql)
        return {status: 200, data: result.rows[0]}
    }catch (e) {
        console.log(e)
        return {status: 500, data: e}
    }
}