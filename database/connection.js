var pg = require('pg');

const connectionString = "postgres://sjxekzlfzpijfs:56bec9d6cd6270aa830944988d969a4d95a82a513fd742e244f15a752a2d15dc@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/d4i6jhes542r6u\n"
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