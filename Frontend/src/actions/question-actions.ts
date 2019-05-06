import Axios from "axios";
import {CRUD_ROOT} from "../config";

export const makeQuestion = (title: string, description: string, tags: string) => {
    return async (dispatch) => {
        try {
            const data = {
                title: title,
                description: description,
                tags: tags
            };

            await Axios.post(`${CRUD_ROOT}/question`, data);
            dispatch(makeQuestionSuccess());
        } catch (e) {
            dispatch(makeQuestionError());
        }
    }
};

export const makeQuestionError = () => {
    return {
        type: 'MAKE_QUESTION_ERROR',
        message: 'Error in creating of question, verify fields and try again',
    }
};

export const makeQuestionSuccess = () => {
    return {
        type: 'MAKE_QUESTION_SUCCESS',
        message: 'Question made successfully',
    }
};

export const loadQuestions = () => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`${CRUD_ROOT}/question`);
            dispatch(setQuestions(response.data));
        } catch (e) {
            console.log('Error getting questions. Server down?');
        }
    }
};

export const setQuestions = (questions) => {
    return {
        type: 'SET_ALL_QUESTIONS',
        questions: questions
    }
};