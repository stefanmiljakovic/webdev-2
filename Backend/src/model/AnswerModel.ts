import * as mongoose from 'mongoose';
import {ObjectID} from "bson";
import TimestampInterface from "../interface/TimestampInterface";

// Answer (title, description, tags, date and time)

export interface AnswerInterface extends TimestampInterface {
    content?: String,
    chosen: Boolean,

    upvotes: ObjectID[],
    downvotes: ObjectID[],

    childAnswers?: ObjectID[],
    parentAnswer?: ObjectID,
    question?: ObjectID,
    user?: ObjectID
}

export interface AnswerType extends AnswerInterface, mongoose.Document {

}

const AnswerSchema = new mongoose.Schema({
    content: String,
    chosen: {
        type: Boolean,
        default: false
    },
    childAnswers: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Answer'}],
    parentAnswer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Answer'
    },

    upvotes: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
    downvotes: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],

    question: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Question'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const recursiveChildren = function(next){
    this.populate('childAnswers');
    next();
};

AnswerSchema.pre('find', recursiveChildren);

AnswerSchema.pre('findOne', recursiveChildren);

export const AnswerModel = mongoose.model<AnswerType>('Answer', AnswerSchema);