import * as express from 'express';

export default abstract class AbstractController {

    public abstract getPath(): string;
    public router: express.Router;

    public constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;
}