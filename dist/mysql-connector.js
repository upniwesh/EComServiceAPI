"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mysql = require("mysql");
/**
 * @author val.rudi
 */
class MysqlConnector {
    constructor() {
        /**
         * Load environment variables from .env file, where API keys and passwords are configured.
         */
        dotenv_1.config({ path: '.env' });
        this.mysqlConnection = mysql.createConnection({
            host: process.env.MYSQLDB_URI,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
        // this.mysqlConnection.connect();
        // this.mysqlConnection.end();
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.mysqlConnection.connect(err => {
                if (err) {
                    console.error(`error connecting: ${err.stack}`);
                    return;
                }
                console.log(`connected as id ${this.mysqlConnection.threadId}`);
            });
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this.mysqlConnection.end();
        });
    }
}
exports.MysqlConnector = MysqlConnector;
