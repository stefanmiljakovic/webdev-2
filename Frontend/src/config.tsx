import {applyMiddleware, createStore} from "redux";
import rootReducers from "./reducers/root";
import {Link} from "react-router-dom";
import * as React from "react";
import thunk from "redux-thunk";

export const ROOT_SERVER = "localhost:5000";

export const API_ROOT = `${ROOT_SERVER}/api`;
export const CRUD_ROOT = `${ROOT_SERVER}/crud`;

export const LINKS = {
    HomeLink: props => <Link to="/home" {...props} />,
    LoginLink: props => <Link to="/login" {...props} />,
    RegisterLink: props => <Link to="/register" {...props} />

};

export const store = createStore(
    rootReducers,
    applyMiddleware(thunk)
);