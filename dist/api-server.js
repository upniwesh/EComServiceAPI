"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../dist/swagger.json");
const passport_jwt_1 = require("passport-jwt");
const typescript_rest_1 = require("typescript-rest");
const constant_1 = require("./config/constant");
const bodyParser = require("body-parser");
const sequlize_1 = require("./database/sequlize");
class ApiServer {
    constructor() {
        this.PORT = +process.env.PORT || 3000;
        this.server = null;
        this.app = express();
        this.config();
        typescript_rest_1.Server.useIoC();
        typescript_rest_1.Server.loadServices(this.app, 'controllers/*', __dirname);
        typescript_rest_1.Server.swagger(this.app, { filePath: './dist/swagger.json' });
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
    /**
     * Start the server
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.server = this.app.listen(this.PORT, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    // call database configuration of sequelize
                    sequlize_1.sequelize.sync({ force: false });
                    console.log(`Listening to http://127.0.0.1:${this.PORT}/swagger`);
                    return resolve();
                });
            });
        });
    }
    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (this.server) {
                    this.server.close(() => {
                        return resolve(true);
                    });
                }
                else {
                    return resolve(true);
                }
            });
        });
    }
    /**
     * Configure the express app.
     */
    config() {
        this.app.use(cors());
        this.configureAuthenticator();
        this.app.use(bodyParser.json({ limit: 10 * 1024 * 1024 }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + '/'));
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.engine('html', require('ejs').renderFile);
        this.app.set('view engine', 'html');
        this.app.set('views', __dirname);
    }
    configureAuthenticator() {
        const JWT_SECRET = constant_1.default;
        const jwtConfig = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(JWT_SECRET)
        };
        const strategy = new passport_jwt_1.Strategy(jwtConfig, (payload, done) => {
            done(null, payload);
        });
        const authenticator = new typescript_rest_1.PassportAuthenticator(strategy, {
            deserializeUser: (user) => JSON.parse(user),
            serializeUser: (user) => {
                return JSON.stringify(user);
            }
        });
        typescript_rest_1.Server.registerAuthenticator(authenticator);
    }
}
exports.ApiServer = ApiServer;
