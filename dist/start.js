'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_server_1 = require("./api-server");
const mysql_connector_1 = require("./mysql-connector");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiServer = new api_server_1.ApiServer();
        const mysqlConnector = new mysql_connector_1.MysqlConnector();
        yield apiServer.start();
        yield mysqlConnector.connect();
        const graceful = () => __awaiter(this, void 0, void 0, function* () {
            yield mysqlConnector.disconnect();
            yield apiServer.stop();
            process.exit(0);
        });
        // Stop graceful
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
    });
}
exports.start = start;
