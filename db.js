const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "node_restful_api",
    password: "postgres",
    port: 5432
});

module.exports = pool;