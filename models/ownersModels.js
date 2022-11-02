const pool = require('../database/connection');

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
        let sql = `insert into spot_requests (sr_text_request, sr_validation, sr_ow_id) values ('${spotRequest.sr_text_request}', '${spotRequest.sr_validation}', '${spotRequest.sr_ow_id}') returning *`
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
        let sql = `insert into photos_spots_requests (psr_ph_id, psr_sr_id) values ('${photoSpotRequest.psr_ph_id}', '${photoSpotRequest.psr_sr_id}') returning *`
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