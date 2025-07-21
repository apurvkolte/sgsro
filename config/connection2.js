
const mysql = require("mysql2");
const mysqlbackup = require('./mysqldump');
const winston = require('../winston/config');

var connection;
function handleDisconnect() {
    connection = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "sgsro",
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 100,
    });
    connection.getConnection(function (err) {
        if (err) {
            winston.info('error when connecting to db:', err);
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
            mysqlbackup()
        }
    });
    connection.on('error', function (err) {
        winston.info('db error', err);
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
            mysqlbackup()
        } else {
            throw err;
        }
    });

}

handleDisconnect();

module.exports = connection;