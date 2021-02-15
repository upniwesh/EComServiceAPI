import {Sequelize} from 'sequelize-typescript';
import {config} from 'dotenv';
import {User, Product, Order } from '../models/index'
config({path: '.env'});

export const sequelize =  new Sequelize({        
        host : process.env.MYSQLDB_URI, // 'localhost',
        database: process.env.MYSQL_DATABASE, // 'testnodejs'
        dialect: 'mysql',
        username: process.env.MYSQL_USER, // 'root', 
        password: process.env.MYSQL_PASSWORD, //''   
        storage: ':memory:',
        //models: [User, Product, Order]
        //models: [__dirname + '/model/index']
});


sequelize.addModels([User]);
sequelize.addModels([Product]);
sequelize.addModels([Order]);