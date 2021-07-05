const mysql = require('mysql');
const dbConfig = require('./init_db');


const connection = mysql.createConnection(dbConfig.connection);

connection.query('CREATE DATABASE ' + dbConfig.database);

connection.query('\
CREATE TABLE `' + dbConfig.database + '`.`' + dbConfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log('Success: Database Created!')

connection.end();
