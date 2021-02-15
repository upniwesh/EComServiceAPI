import {config} from 'dotenv';
import * as mysql from 'mysql';
/**
 * @author val.rudi
 */
export class MysqlConnector{
    private mysqlConnection : mysql.Connection;
    constructor(){
        /**
         * Load environment variables from .env file, where API keys and passwords are configured.
         */
        config({path: '.env'});
        
        this.mysqlConnection = mysql.createConnection({
            host     : process.env.MYSQLDB_URI, // 'localhost',
            user     : process.env.MYSQL_USER, // 'root', 
            password : process.env.MYSQL_PASSWORD, //''   
            database : process.env.MYSQL_DATABASE, // 'ecomservicedb'
          });
        
        
        // this.mysqlConnection.connect();
        // this.mysqlConnection.end();
    }
    connect(): Promise<any>{
        return new Promise<any>((resolve, reject) => {            
            
            this.mysqlConnection.connect(err => {
                if (err) {
                    console.error(`error connecting: ${err.stack}`);
                    return;
                }            
                console.log(`connected as id ${this.mysqlConnection.threadId}`);
            });
        });        
    }
    disconnect(): Promise<any>{
        return new Promise<any>((resolve, reject) => {            
            this.mysqlConnection.end();
        });  
        
    }
}
