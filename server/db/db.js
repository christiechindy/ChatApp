const {Pool} = require("pg");
require("dotenv").config({path: __dirname + '/.env' });

const pool = new Pool ({
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DATABASE,
    user: process.env.DATABASE,
    password: process.env.DB_PASSWORD
})

module.exports = pool;