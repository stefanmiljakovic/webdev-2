import AbstractCrud from "../../base/AbstractCrud";
import {ExpressCallback} from "../../interface/CrudInterface";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import QuestionPolicy from "../../policy/QuestionPolicy";
import {QuestionInterface, QuestionModel} from "../../model/QuestionModel";


export default class QuestionCrud extends AbstractCrud {
    policy: QuestionPolicy;

    constructor() {
        super();
        this.policy = new QuestionPolicy();
    }

    create: ExpressCallback = async (request, response, next) => {
        request.checkBody('title').notEmpty();
        request.checkBody('description').notEmpty();

        try {
            await request.getValidationResult();
            const model = await AuthMiddleware.authenticate(request, response, next);
            await this.policy.create(model);

            const questionData: QuestionInterface = request.body;
            questionData.user = model._id;
            const createdQuestion = new QuestionModel(questionData);

            const question = await createdQuestion.save();

            response.send(question);
        } catch (e) {
            next(e);
        }
    };

    destroy: ExpressCallback = async (request, response, next) => {
        request.checkBody('id').notEmpty();

        try {
            await request.getValidationResult();
            const question = await QuestionModel.findById(request.body.id).exec();
            const user = await AuthMiddleware.authenticate(request, response, next);

            await this.policy.destroy(user, question);

            const deleted = await question.remove();

            response.send(deleted);
        } catch (e) {
            next(e);
        }
    };

    read: ExpressCallback = async (request, response, next) => {

        try {
            let models = null;

            if (request.query.id) {
                models = await this.readById(request.query.id);
            } else if (request.query.user) {
                models = await this.readByUser(request.query.user);
            } else {
                models = await this.readAll();
            }

            if(models === null)
                response.status(404).send("No results found");
            else
                response.send(models);
        } catch (e) {
            next(e);
        }
    };

    update: ExpressCallback = async (request, response, next) => {
        const changeable = ['title', 'description', 'tags'];
        request.checkBody('id').notEmpty();

        try {
            await request.getValidationResult();
            const question = await QuestionModel.findById(request.body.id).exec();
            const user = await AuthMiddleware.authenticate(request, response, next);

            await this.policy.update(user, question);

            let update = false;

            changeable.forEach(value => {
                if (request.body[value]) {
                    question.set(value, request.body[value]);
                    update = true;
                }
            });

            if (update) {
                const saved = await question.save();
                response.send(saved);
            } else {
                response.send("Nothing to change");
            }
        } catch (e) {
            next(e);
        }
    };

    protected readById = async (id) => {
        try {
            return await QuestionModel.findById(id).exec();
        } catch (e) {
            throw e;
        }
    };

    protected readAll = async () => {
        try {
            return await QuestionModel.find({}).exec();
        } catch (e) {
            throw e;
        }
    };

    protected readByUser = async (username) => {
        try {
            return await QuestionModel.aggregate([
                {$lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'users',
                    }},
                {$match: {'users.username': username}}
            ]).exec();
        } catch (e) {
            throw e;
        }
    };

    getPath(): string {
        return "/question";
    }

}