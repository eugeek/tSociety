const { Pool } = require('pg');
const config = require('../config');

const dbConnection = new Pool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.pass,
    database: config.db.base,
    port: 5432
});

module.exports = dbConnection;