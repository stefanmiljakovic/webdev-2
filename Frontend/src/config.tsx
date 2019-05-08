import {applyMiddleware, createStore} from "redux";
import rootReducers from "./reducers/root";
import {Link} from "react-router-dom";
import * as React from "react";
import thunk from "redux-thunk";
import axios from 'axios'

export const ROOT_SERVER = "http://localhost:5000";

export const API_ROOT = `${ROOT_SERVER}/api`;
export const CRUD_ROOT = `${ROOT_SERVER}/crud`;

export function setAuthToken(token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = '';
    delete axios.defaults.headers.common['Authorization'];

    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
    }
}


export const LINKS = {
    HomeLink: props => <Link to="/" {...props} />,
    LoginLink: props => <Link to="/login" {...props} />,
    RegisterLink: props => <Link to="/register" {...props} />,
    UserLink: id => props => <Link to={`/user/${id}`} {...props} />,
    QuestionLink: id => props => <Link to={`/question/${id}`} {...props} />,
    MakeQuestionLink: props => <Link to={`/make-question`} {...props} />,
    HotQuestionsLink: props => <Link to={'/hot'} {...props} />
};

export const store = createStore(
    rootReducers,
    applyMiddleware(thunk)
);