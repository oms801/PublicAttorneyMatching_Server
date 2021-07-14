const de = require('dotenv')
const mysql = require('mysql');

de.config();

const db_config = {  
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
};

const db_connection = {
    init: () => {
        return mysql.createPool(db_config);
    }
}

module.exports = db_connection;