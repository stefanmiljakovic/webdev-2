import * as mongoose from 'mongoose';
import {UserInterface} from "./UserModel";
import {ObjectID} from "bson";
import TimestampInterface from "../interface/TimestampInterface";

// View (title, description, tags, date and time)

export interface ViewInterface extends TimestampInterface{
    question: ObjectID
}

export interface ViewType extends ViewInterface, mongoose.Document {}

const ViewSchema = new mongoose.Schema({
    question: {
        type: ObjectID,
        ref: 'Question',
        required: true
    }
}, {timestamps: true});

export const ViewModel = mongoose.model<ViewType>('View', ViewSchema);