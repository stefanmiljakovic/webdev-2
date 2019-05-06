import {Model} from "../../models/models";
import QuestionInterface = Model.QuestionInterface;
import {combineReducers} from "redux";
import {MessageInterface} from "./users";
import {RootStateInterface} from "../root";

export interface QuestionReducer {
    allQuestions: {
        questions: QuestionInterface[]
    }
    makeQuestion: MessageInterface
}

export const allQuestionsDefault = {questions: []};
export const makeQuestionDefault: MessageInterface = {
    message: ''
};

export const questionReducer = combineReducers({
    allQuestions: (state = allQuestionsDefault, action) => {
        switch (action.type) {
            case 'SET_ALL_QUESTIONS':
                return {
                    ...state,
                    questions: action.questions
                };
            default:
                return {
                    ...state
                }
        }
    },
    makeQuestion: (state = makeQuestionDefault, action) => {
        switch (action.type) {
            case 'MAKE_QUESTION_ERROR':
            case 'MAKE_QUESTION_SUCCESS':
                return {
                    ...state,
                    message: action.message
                };
            default:
                return {
                    ...state
                };
        }
    }
});
