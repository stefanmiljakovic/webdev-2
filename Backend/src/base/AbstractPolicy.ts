import {UserType} from "../model/UserModel";
import * as express from "express";

export default abstract class AbstractPolicy<T> {
    public abstract create(manipulator?: UserType): Promise<any>;
    public abstract update(manipulator: UserType, target?: T): Promise<any>;
    public abstract destroy(manipulator: UserType, target?: T): Promise<any>;
    public abstract read(manipulator: UserType, target?: T): Promise<any>;

    public deny = (response: express.Response) => {
        response.status(401).send("Permission denied by policy.");
    };
}