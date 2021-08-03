const de = require('dotenv')
const mysql = require('mysql');

de.config();

const db_config = {  
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
};

const db_connection = {
    init: () => {
        return mysql.createPool(db_config);
    }
}

module.exports = db_connection;