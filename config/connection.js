const mysql = require("mysql2");
const winston = require("../winston/config");

let pool;

function handleDisconnect() {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 100,
    });

    pool.on("error", function (err) {
        winston.error("Database error:", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            setTimeout(handleDisconnect, 2000);
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = pool;
