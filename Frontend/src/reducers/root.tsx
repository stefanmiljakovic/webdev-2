import {combineReducers} from "redux";
import {questionReducer, QuestionReducer} from "./models/questions";
import {Model} from "../models/models";
import QuestionInterface = Model.QuestionInterface;
import {userReducer, UserReducer} from "./models/users";
import {snackbarReducer, SnackbarReducer} from "./models/snackbars";

export interface RootStateInterface {
    questions: QuestionReducer
    users: UserReducer
    snackbar: SnackbarReducer
}

const rootReducers = combineReducers({
    questions: questionReducer,
    users: userReducer,
    snackbar: snackbarReducer
});

export default rootReducers;