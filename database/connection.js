const pg = require('pg');

const connectionString = "postgres://bqqiwhxdlkihkz:3e55facb250dd021aca3977240f9b5836c6f8fef228301730c4dfb66782bb39f@ec2-54-228-125-183.eu-west-1.compute.amazonaws.com:5432/dbhrosptinttsp"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
})

module.exports = pool;