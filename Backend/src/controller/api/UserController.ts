import AbstractController from "../../base/AbstractController";
import {ExpressCallback} from "../../interface/CrudInterface";
import {UserModel} from "../../model/UserModel";
import * as sharp from "sharp";
import * as fs from "fs";
import * as util from "util";

import AuthMiddleware from "../../middleware/AuthMiddleware";
import QuestionController from "./QuestionController";
import {QuestionModel} from "../../model/QuestionModel";


export default class UserController extends AbstractController {
    getPath(): string {
        return "/user";
    }

    protected initializeRoutes(): void {
        this.router.get(`${this.getPath()}/thumbnail`, (req, res, next) => {
            this.getThumbnail(req, res, next);
        });

        this.router.route(`${this.getPath()}/image`).get((req, res, next) => {

        }).post((req, res, next) => {
            this.setImage(req, res, next);
        });

        this.router.get(`${this.getPath()}/question-count`, (req, res, next) => {
            this.getQuestionCount(req, res, next);
        });

        this.router.get(`${this.getPath()}/answer-count`, (req, res, next) => {
            this.getAnswerCount(req, res, next);
        });

        this.router.get(`${this.getPath()}/chosen-count`, (req, res, next) => {
            this.getChosenCount(req, res, next);
        })
    }

    getThumbnail: ExpressCallback = async (request, response, next) => {
        request.checkQuery('username').notEmpty();

        try {
            await request.getValidationResult();
            const user = await UserModel.findOne({username: request.query.username});

            const readFile = util.promisify(fs.readFile);
            const data = await readFile(user.image as string);

            const path = `public/cache/${user._id}`;

            const cached = sharp(data).resize()

        } catch (e) {
            next(e);
        }
    };

    setImage: ExpressCallback = async (request, response, next) => {
        request.checkBody('image').notEmpty();

        try {
            await request.getValidationResult();
            const user = await AuthMiddleware.authenticate(request, response, next);

            const path = `public/images/${user._id}.png`;
            const cache = `public/cache/${user._id}.png`;

            const writeFile = util.promisify(fs.writeFile);
            await writeFile(path, request.body.image, 'base64');

            await sharp(path).resize(32, 32).toFile(cache);

            user.image = path;
            const save = await user.save();

            response.send(save);
        } catch (e) {
            next(e);
        }
    };

    getQuestionCount: ExpressCallback = async (request, response, next) => {
        request.checkQuery('username').notEmpty();

        try {
            await request.getValidationResult();
            const user = await UserModel.findOne({username: request.query.username}).exec();

            const total = await UserModel.aggregate([
                {$lookup: {
                    from: 'questions',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'questions'
                }},
                {$project: {
                    "_id": 1,
                    "username": 1,
                    "questions": { "$size": "$questions" }
                }},
                {$match: {
                    "username": user.username
                }}
            ]);

            response.send(total);
        } catch (e) {
            next(e);
        }
    };

    getAnswerCount: ExpressCallback = async (request, response, next) => {
        request.checkQuery('username').notEmpty();

        try {
            await request.getValidationResult();
            const user = await UserModel.findOne({username: request.query.username}).exec();

            const total = await UserModel.aggregate([
                {$lookup: {
                    from: 'answers',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'answers'
                }},
                {$project: {
                    "_id": 1,
                    "username": 1,
                    "answers": { "$size": "$answers" }
                }},
                {$match: {
                    "username": user.username
                }}
            ]);

            response.send(total);
        } catch (e) {
            next(e);
        }
    };

    getChosenCount: ExpressCallback = async (request, response, next) => {
        request.checkQuery('username').notEmpty();

        try {
            await request.getValidationResult();
            const user = await UserModel.findOne({username: request.query.username}).exec();

            const total = await UserModel.aggregate([
                {$lookup: {
                    from: 'answers',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'answers'
                }},
                {$unwind: {
                    path: '$answers'
                }},
                {$match: {
                   'answers.chosen': false
                }},
                {$group: {
                    _id: "$_id",
                    count: {
                        $sum: 1
                    }
                }},
                {$match: {
                    _id: user._id
                }}
            ]).exec();

            if(total.length > 0)
                response.send(total[0]);
            else
                response.send({
                    _id: user._id,
                    count: 0
                });
        } catch (e) {
            next(e);
        }
    };
}