import * as express from 'express'

export type ExpressCallback = (request: express.Request, response: express.Response, next?: express.NextFunction) => void;

export default interface CrudInterface {
    create: ExpressCallback;
    update: ExpressCallback;
    read: ExpressCallback;
    destroy: ExpressCallback;
}