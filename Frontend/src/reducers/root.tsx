import {combineReducers} from "redux";
import {questionReducer} from "./models/questions";

const rootReducers = combineReducers({
    questions: questionReducer
});

export default rootReducers;