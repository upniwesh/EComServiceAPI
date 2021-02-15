import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require("../dist/swagger.json");
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportAuthenticator, Server } from 'typescript-rest';
import secretKey from "./config/constant";
import bodyParser = require('body-parser');
import {sequelize} from "./database/sequlize";

export class ApiServer {
    public PORT: number = +process.env.PORT || 3000;
    private readonly app: express.Application;
    private server: http.Server = null;

    constructor() {
        this.app = express();
        this.config();        
        Server.useIoC();
        
        Server.loadServices(this.app, 'controllers/*', __dirname);
        Server.swagger(this.app, { filePath: './dist/swagger.json' });
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    

    /**
     * Start the server
     */
    public async start() {
        return new Promise<any>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }
                // call database configuration of sequelize
                sequelize.sync({force: false});                                
                console.log(`Listening to http://127.0.0.1:${this.PORT}/swagger`);

                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public async stop(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

    /**
     * Configure the express app.
     */
    private config(): void {                
        this.app.use(cors());        
        this.configureAuthenticator();        
        this.app.use(bodyParser.json({ limit: 10 * 1024 * 1024 }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + '/'));        
        this.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        }));        
        this.app.engine('html', require('ejs').renderFile);
        this.app.set('view engine', 'html');
        this.app.set('views', __dirname);        
    }

    private configureAuthenticator() {
        const JWT_SECRET: string = secretKey;
        const jwtConfig: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(JWT_SECRET)
        };
        const strategy = new Strategy(jwtConfig, (payload: any, done: (err: any, user: any) => void) => {
            done(null, payload);
        });
        const authenticator = new PassportAuthenticator(strategy, {
            deserializeUser: (user: string) => JSON.parse(user),
            serializeUser: (user: any) => {
                
                return JSON.stringify(user);
            }
        });
        Server.registerAuthenticator(authenticator);
    }
}