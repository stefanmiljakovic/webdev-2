import AbstractCrud from "../../base/AbstractCrud";
import {ExpressCallback} from "../../interface/CrudInterface";
import {UserInterface, UserModel, UserType} from "../../model/UserModel";
import * as mongoose from "mongoose";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import UserPolicy from "../../policy/UserPolicy";
import {model} from "mongoose";


export default class UserCrud extends AbstractCrud {

    policy: UserPolicy;

    constructor() {
        super();
        this.policy = new UserPolicy();
    }

    create: ExpressCallback = async (request, response, next) => {
        request.checkBody('username').notEmpty();
        request.checkBody('email').notEmpty();
        request.checkBody('password').notEmpty();

        try {
            await request.getValidationResult();
            await this.policy.create();

            const userData: UserInterface = request.body;
            const createdUser = new UserModel(userData);

            const value = await createdUser.save();
            response.send(value);
        } catch (e) {
            next(e);
        }
    };


    destroy: ExpressCallback = async (request, response, next) => {
        request.checkBody('username').notEmpty();

        try {
            await request.getValidationResult();

            const model = await AuthMiddleware.authenticate(request, response, next);
            const target = await UserModel.findOne({username: request.body.username}).exec();
            await this.policy.destroy(model, target);

            const removal = await target.remove();
            response.send(removal);
        } catch (e) {
            next(e);
        }
    };

    read: ExpressCallback = async (request, response, next) => {
        try {
            if(request.query.username){
                const model = await UserModel.findOne({username: request.query.username}).select(['-__v']).exec();
                await this.policy.read(null, model);

                response.send(model);
            } else {
                const model = await UserModel.find({}).select(['-__v']).exec();
                response.send(model);
            }
        }
        catch (e) {
            next(e);
        }
    };

    update: ExpressCallback = async (request, response, next) => {
        request.checkBody('username').notEmpty();

        const properties = ['password', 'email'];

        try {
            await request.getValidationResult();
            const model = await AuthMiddleware.authenticate(request, response, next);
            const target = await UserModel.findOne({username: request.body.username}).exec();
            await this.policy.update(model, target);

            let pushUpdate = false;

            properties.forEach(value => {
                if(request.body[value]){
                    target.set(value, request.body[value]);
                    pushUpdate = true;
                }
            });

            if(pushUpdate) {
                target.save().then(success => {
                    response.send(success);
                }).catch(next)
            }
        } catch (e) {
            next(e);
        }
    };

    getPath(): string {
        return "/user";
    }
}