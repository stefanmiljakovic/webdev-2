import AbstractController from "../../base/AbstractController";
import {ExpressCallback} from "../../interface/CrudInterface";
import {QuestionModel} from "../../model/QuestionModel";
import {ViewModel} from "../../model/ViewModel";

export default class QuestionController extends AbstractController {

    getPath(): string {
        return "/question";
    }

    protected initializeRoutes(): void {
        this.router.post(`${this.getPath()}/view`, (req, res, next) => {
            this.view(req, res, next);
        });

        this.router.get(`${this.getPath()}/view`, (req, res, next) => {
            this.getView(req, res, next);
        });

        this.router.get(`${this.getPath()}/hot`, (req, res, next) => {
            this.getHot(req, res, next);
        });
    }

    view: ExpressCallback = async (request, response, next) => {
        request.checkBody('id').notEmpty();

        try {
            await request.getValidationResult();
            const question = await QuestionModel.findById(request.body.id).exec();

            const model = await ViewModel.create({question: question._id});

            response.send(model);
        } catch (e) {
            next(e);
        }
    };

    getView: ExpressCallback = async (request, response, next) => {
        request.checkQuery('question').notEmpty();

        try {
            await request.getValidationResult();
            const results = await ViewModel.count({question: request.query.question});

            response.send(results);
        } catch (e) {
            next(e);
        }
    };

    getHot: ExpressCallback = async (request, response, next) => {
        const timespan = new Date();

        timespan.setHours(timespan.getHours() - 3);
        try {
            const hot = await QuestionModel.aggregate([
                    {$lookup: {
                        from: 'views',
                        localField: '_id',
                        foreignField: 'question',
                        as: 'views'
                    }},
                    {$unwind: {
                        path: '$views',
                        preserveNullAndEmptyArrays: true
                    }},
                    {$match: {
                        'views.createdAt': {
                            $gte: timespan
                        }
                    }},
                    {$group: {
                        _id: '$_id',
                        title: { "$first": "$title"},
                        views: { $sum: 1 }
                    }},
                    {$sort: {
                        views: -1
                    }}
            ]);

            response.send(hot);
        }
        catch (e) {
            throw e;
        }
    }

}