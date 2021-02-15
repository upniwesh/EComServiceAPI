'use strict';

import { ApiServer } from './api-server';
import { MysqlConnector } from "./mysql-connector";

export async function start(): Promise<void> {    
    const apiServer = new ApiServer();
    const mysqlConnector = new MysqlConnector();
    
    await apiServer.start();    
    await mysqlConnector.connect();    
    const graceful = async () => {
        await mysqlConnector.disconnect();               
        await apiServer.stop();
        process.exit(0);
    };

    // Stop graceful
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
}
