import * as mongoose from 'mongoose';
import {UserInterface} from "./UserModel";
import {ObjectID} from "bson";
import TimestampInterface from "../interface/TimestampInterface";

// Question (title, description, tags, date and time)

export interface QuestionInterface extends TimestampInterface {
    title?: String,
    description?: String,
    tags?: String[],
    views?: Number,
    user: UserInterface
}

export interface QuestionType extends QuestionInterface, mongoose.Document {
}

const QuestionSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});


// @ts-ignore
// Mongoose is a piece of shit
/*QuestionSchema.pre<QuestionType>('init', async (model : QuestionType) => {
    const results = await ViewModel.aggregate([
        {
            $match: {
                $and: [
                    {createdAt: {$gt: new Date(Date.now() - 3 * 60 * 60 * 1000)}},
                    {question: model._id}
                ]
            }
        }
    ]).exec();

    model.views = results.length;

});*/

// In case User Ref needed
/*const populateAdditional = function(next: express.NextFunction) {
    this.populate('user');
    next();
};

QuestionSchema.pre<QuestionType>('find', populateAdditional);

QuestionSchema.pre<QuestionType>('findOne', populateAdditional);*/

export const QuestionModel = mongoose.model<QuestionType>('Question', QuestionSchema);