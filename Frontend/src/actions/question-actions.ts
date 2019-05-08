import Axios from "axios";
import {API_ROOT, CRUD_ROOT} from "../config";
import {messageError, messageSuccess} from "./snackbar-actions";

export const makeQuestion = (title: string, description: string, tags: string) => {
    return async (dispatch) => {
        try {
            let tagArray = tags.split(' ').filter((value, index, self) => {
               return self.indexOf(value) === index;
            });

            const data = {
                title: title,
                description: description,
                tags: tagArray
            };

            await Axios.post(`${CRUD_ROOT}/question`, data);
            dispatch(messageSuccess('Question successfully made.'));
            dispatch(loadQuestions());
        } catch (e) {
            dispatch(messageError('There was an error in making a question.'));
        }
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

export const deleteQuestion = (id: string) => {
    return async (dispatch) => {
        try {
            await Axios.delete(`${CRUD_ROOT}/question?id=${id}`);
            dispatch(loadQuestions())
            dispatch(messageSuccess('Successfully deleted question'));
        } catch (e) {
            console.log('Error deleting the question.')
            dispatch(messageError('Unable to delete question'));
        }
    }
};

export const loadUserQuestions = (userId: string) => {
    return async (dispatch) => {
        try {
            const questions = await Axios.get(`${CRUD_ROOT}/question?user=${userId}`);
            console.log(questions.data);
            dispatch(userQuestionsLoaded(questions.data));
        } catch (e) {
            console.log('Questions could not be loaded for userID ' + userId);
        }
    }
};

export const userQuestionsLoaded = (questions: any) => {
    return {
        type: 'USER_QUESTIONS_LOAD',
        questions: questions
    }
}

export const loadHotQuestions = () => {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`${API_ROOT}/question/hot`);
            console.log("Hot Questions loaded");
            console.log(response.data);

            dispatch(updateHotQuestions(response.data));
        } catch (e) {
            console.log("Failed to load hot questions");
        }
    }
};

export const updateHotQuestions = (questions) => {
    return {
        type: 'HOT_QUESTIONS_LOAD',
        questions: questions
    }
}