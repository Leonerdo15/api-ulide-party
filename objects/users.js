function Users(us_id, us_name, us_bdate, us_email, us_bio, us_tu_id, us_password, us_ph_id ) {
    this.us_id = us_id;
    this.us_name = us_name;
    this.us_bdate = us_bdate;
    this.us_email = us_email;
    this.us_bio = us_bio;
    this.us_tu_id = us_tu_id;
    this.us_password = us_password;
    this.us_ph_id = us_ph_id;

}

Users.prototype= {
    getTest: async function () {
        try {
            let sql = "select * from users"
            let result = await pool.query(sql)
            let users = result.rows
            return {status: 200, data: users}
        }catch (e) {
            console.log(e)
            return {status: 500, data: e}
        }
    }
}

module.exports = Users;