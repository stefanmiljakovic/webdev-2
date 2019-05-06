import {combineReducers} from "redux";
import {questionReducer, QuestionReducer} from "./models/questions";
import {Model} from "../models/models";
import QuestionInterface = Model.QuestionInterface;
import {userReducer, UserReducer} from "./models/users";

export interface RootStateInterface {
    questions: QuestionReducer
    users: UserReducer
}

const rootReducers = combineReducers({
    questions: questionReducer,
    users: userReducer,
});

export default rootReducers;