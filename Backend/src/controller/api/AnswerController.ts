import AbstractController from "../../base/AbstractController";
import {AnswerModel, AnswerType} from "../../model/AnswerModel";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import {ObjectID} from "bson";

export default class AnswerController extends AbstractController
{
    getPath(): string {
        return "/answer";
    }

    protected initializeRoutes(): void {
        this.router.post(`${this.getPath()}/upvote`, async (req, res, next) => {
            await this.vote(req, res, next, 'upvotes', 'downvotes');
        });

        this.router.post(`${this.getPath()}/downvote`, async (req, res, next) => {
           await this.vote(req, res, next, 'downvotes', 'upvotes');
        });
    }

    protected vote = async (request, response, next, fieldSet, fieldCheck) => {
        request.checkBody('id').notEmpty();

        try {
            await request.getValidationResult();
            const answer: AnswerType = await AnswerModel.findById(request.body.id);
            const user = await AuthMiddleware.authenticate(request, response, next);

            let fieldGetMod = answer.get(fieldCheck) as ObjectID[];

            if(fieldGetMod.indexOf(user._id) !== -1) {
                fieldGetMod.splice(fieldGetMod.indexOf(user._id), 1);
                answer.set(fieldCheck, fieldGetMod);
            }

            let fieldSetMod = answer.get(fieldSet) as ObjectID[];

            if(fieldSetMod.indexOf(user._id) === -1){
                fieldSetMod.push(user._id);
                answer.set(fieldSet, fieldSetMod);
            }

            const saved = await answer.save();

            response.send(saved);
        } catch (e) {
            next(e);
        }
    };
}