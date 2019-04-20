import "dotenv/config";

import {UserInterface, UserModel, UserType} from "../model/UserModel";
import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import * as moment from "moment";
import * as jwt from "jwt-simple";
import * as passport from "passport";
import express = require("express");
import {ExpressCallback} from "../interface/CrudInterface";


const {
    JWT_SECRET
} = process.env;

export interface TokenInterface extends TokenPayload{
    token: string,
}

interface TokenPayload {
    expires: string,
    id: string
}

const PASSPORT_NAME = "jwt";

class AuthMiddleware {

    initializer: express.Handler;

    constructor() {
        passport.use(PASSPORT_NAME, this.getStrategy());
        this.initializer = passport.initialize();
    }

    public initialize = () => {
        return this.initializer;
    };

    public generateToken = (user: UserType): TokenInterface => {
        let expiry = moment().utc().add(3, "days").unix();
        let token = jwt.encode({
            exp: expiry,
            id: user._id
        }, JWT_SECRET);

        return {
            token: "JWT " + token,
            expires: moment.unix(expiry).format(),
            id: user._id
        }
    };

    protected getStrategy = () => {
        const options: StrategyOptions = {
            secretOrKey: JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(PASSPORT_NAME),
            passReqToCallback: true
        };

        return new Strategy(options, async (request: express.Request, payload: TokenPayload, done) => {

            if(payload === null || payload.id === null)
                return done("Payload undefined");

            UserModel.findById(payload.id, (error: any, user) => {
                if (error) {
                    return done(error);
                }

                if (user === null) {
                    return done(null, false, {message: "User with given token was not found"});
                }

                return done(null, user);
            });
        });
    };

    public authenticate = (request: express.Request, response: express.Response,
                           next: express.NextFunction):Promise<UserType> => {

        return new Promise<UserType>((resolve, reject) => {
            passport.authenticate(PASSPORT_NAME, (err, user, info) => {
                if(err) return next(err);
                if(!user) {
                    reject(null);
                    if(info.name == "TokenExpiredError")
                        return response.status(401).json({message: "Token has expired."});
                    else
                        return response.status(401).json({message: info.message});
                }
                resolve(user);
            })(request, response, next);
        });
    };
}

export default new AuthMiddleware();