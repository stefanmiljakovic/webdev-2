import AbstractCrud from "../../base/AbstractCrud";
import {ExpressCallback} from "../../interface/CrudInterface";
import AnswerPolicy from "../../policy/AnswerPolicy";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import {AnswerModel} from "../../model/AnswerModel";
import {QuestionModel} from "../../model/QuestionModel";

export default class AnswerCrud extends AbstractCrud {

    policy: AnswerPolicy;

    constructor() {
        super();
        this.policy = new AnswerPolicy();
    }

    create: ExpressCallback = async (request, response, next) => {
        request.checkBody('content').notEmpty();
        request.checkBody('question').notEmpty();

        try {
            await request.getValidationResult();
            const user = await AuthMiddleware.authenticate(request, response, next);
            await this.policy.create(user);

            const question = await QuestionModel.findById(request.body.question);

            if (request.body.answer) {
                const parent = await AnswerModel.findById(request.body.answer);
                const answer = await AnswerModel.create({
                    content: request.body.content,
                    user: user._id,
                    question: question._id,
                    parentAnswer: parent._id
                });

                parent.childAnswers.push(answer._id);
                await parent.save();
                response.send(answer);
            } else {
                const answer = await AnswerModel.create({
                    content: request.body.content,
                    user: user._id,
                    question: question._id
                });

                response.send(answer);
            }
        } catch (e) {
            next(e);
        }
    };

    destroy: ExpressCallback = async (request, response, next) => {
        request.checkBody('id').notEmpty();

        try {
            await request.getValidationResult();
            const user = await AuthMiddleware.authenticate(request, response, next);
            const answer = await AnswerModel.findById(request.body.id).exec();

            await this.policy.destroy(user, answer);

            const parent = await AnswerModel.findById(answer.parentAnswer).exec();
            parent.childAnswers.splice(parent.childAnswers.indexOf(answer._id), 1);
            await parent.save();

            const removal = await answer.remove();

            response.send(removal);
        } catch (e) {
            next(e);
        }
    };

    read: ExpressCallback = async (request, response, next) => {
        let model = null;
        try {
            if (request.query.id) {
                model = await AnswerModel.findById(request.query.id).exec();
            } else {
                model = await AnswerModel.find({parentAnswer: null});
            }
            response.send(model);
        } catch (e) {
            next(e);
        }
    };


    update: ExpressCallback = async (request, response, next) => {
        request.checkBody('id').notEmpty();
        request.checkBody('chosen').notEmpty();

        try {
            await request.getValidationResult();
            const answer = await AnswerModel.findById(request.body.id).exec();
            const user = await AuthMiddleware.authenticate(request, response, next);

            await this.policy.update(user, answer);

            answer.chosen = request.body.chosen;
            const saved = await answer.save();

            response.send(saved);
        } catch (e) {
            next(e);
        }
    };

    getPath(): string {
        return "/answer";
    }

}