import Axios from "axios";
import {CRUD_ROOT} from "../config";
import {messageError, messageSuccess} from "./snackbar-actions";

export const userRegister = (username: string, email: string, password: string) => {
    return async(dispatch) => {
        try {
            const data = {
                username: username,
                email: email,
                password: password
            };
            const response = await Axios.post(`${CRUD_ROOT}/user`, data);

            dispatch(userRegisterSuccess())
            dispatch(messageSuccess('Registration was successful. Proceed to log in.'))
        } catch (e) {
            dispatch(userRegisterFail())
            dispatch(messageError('Please verify fields again. Something went wrong.'))
        }
    }
};

export const userRegisterSuccess = () => {
    return {
        type: 'USER_REGISTER_SUCCESS',
        message: 'Registration was successful. Proceed to log in.'
    }
};

export const userRegisterFail = () => {
    return {
        type: 'USER_REGISTER_ERROR',
        message: 'Please verify fields again. Something went wrong.'
    }
};

export const userRegisterRefresh = () => {
    return {
        type: 'USER_REGISTER_REFRESH',
    }
};