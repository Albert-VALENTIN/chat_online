const mysql = require("mysql");

const db = mysql.createConnection({
    user: "epy",
    host: "localhost",
    password: "01234",
    database: "chat_test",
});

module.exports = db;
