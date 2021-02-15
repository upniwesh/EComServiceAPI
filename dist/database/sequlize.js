"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = require("dotenv");
const index_1 = require("../models/index");
dotenv_1.config({ path: '.env' });
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: process.env.MYSQLDB_URI,
    database: process.env.MYSQL_DATABASE,
    dialect: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    storage: ':memory:',
});
exports.sequelize.addModels([index_1.User]);
exports.sequelize.addModels([index_1.Product]);
exports.sequelize.addModels([index_1.Order]);
