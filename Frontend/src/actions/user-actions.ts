import Axios from 'axios';
import {API_ROOT, CRUD_ROOT, setAuthToken} from '../config';
import {Model} from '../models/models';
import LoginResponse = Model.LoginResponse;
import validator from 'validator';

export const userLogin = (usernameOrEmail: string, password: string) => {
    return async (dispatch) => {
        try {
            let data: any = {password: password};

            if (validator.isEmail(usernameOrEmail))
                data = {...data, email: usernameOrEmail};
            else
                data = {...data, username: usernameOrEmail};

            const response: any = await Axios.post(`${API_ROOT}/auth/login`, data);
            dispatch(applyUserToken(response.data.token));

        } catch (e) {
            console.log(e);
            dispatch(userLoginError())
        }
    };
};

export const applyUserToken = (token) => {
    return async (dispatch) => {
        try {
            setAuthToken(token);
            console.log(token);

            const userResponse: any = await Axios.get(`${API_ROOT}/auth/whoami`);
            dispatch(userLoginSuccess({token: token}, userResponse.data));
        } catch (e) {
            console.log(e);
            dispatch(userLoginError());
        }
    }
};

export const userLogout = () => {
    localStorage.removeItem('token');
    return {
        type: 'USER_LOGOUT'
    }
};

export const userLoginSuccess = (data, userData) => {
    console.log(userData);
    return {
        type: "USER_LOG_SUCCESS",
        token: data.token,
        message: 'Login successful',
        user: userData
    };
};

export const userLoginError = () => {
    return {
        type: "USER_LOG_ERROR",
        message: 'Wrong accreditation entered'
    }
};

export const userLoginRefresh = () => {
    return {
        type: "USER_LOG_REFRESH"
    }
};
