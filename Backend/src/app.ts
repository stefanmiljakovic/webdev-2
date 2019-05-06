import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as expressValidator from 'express-validator';
import AbstractController from "./base/AbstractController";
import AbstractCrud from "./base/AbstractCrud";
import AuthService from "./middleware/AuthMiddleware";
import * as cors from 'cors';
import * as path from "path";

export default class App {

    protected app: express.Application;
    protected port: number;

    constructor(controllers: AbstractController[], crudControllers: AbstractCrud[], port: number = 5000) {
        this.app = express();
        this.port = port;

        this.initializeDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers, '/api');
        this.initializeControllers(crudControllers, '/crud');
    }

    protected initializeDatabase = (): void => {
        const {
            MONGO_PATH,
            MONGO_NAMESPACE
        } = process.env;

        mongoose.connect(`mongodb://${MONGO_PATH}/${MONGO_NAMESPACE}`, {
            useNewUrlParser: true
        }).catch(
            reason => {
                console.log(reason);
            }
        );
    };

    protected initializeMiddleware = (): void => {
        this.app.use('/public', express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(expressValidator());
        this.app.use(AuthService.initialize());
        this.app.use(cors());
    };

    protected initializeControllers = (controllers: AbstractController[], path: string = '/'): void => {
        controllers.forEach((controller) => {
            this.app.use(path, controller.router);
        });
    };

    public listen() {
        let server = this.app.listen(this.port, () => {
            console.log(`Application started on ${this.port} port.`);

            const routeList = require('express-list-endpoints');
            console.log(routeList(this.app));
        });
    }
}