import {Model} from '../../models/models';
import UserInterface = Model.UserInterface;
import {combineReducers} from "redux";

export type UserInterfaceTokened = UserInterface & {token: string, message: string};
export type MessageInterface = {message: string}

export interface UserReducer {
    activeUser: UserInterfaceTokened
    allUsers: UserInterface[]
    registerUser: MessageInterface
}

export const activeUserDefault: UserInterfaceTokened = {
    username: 'unset',
    email: 'unset',
    token: null,
    message: ''
};

export const registerUserDefault: MessageInterface = {
    message: ''
};


export const allUsersDefault: UserInterface[] = [];

export const userReducer = combineReducers({
    activeUser: (state = activeUserDefault, action) => {
        if(action.type === 'USER_LOG_SUCCESS') {
            return {
                ...state,
                token: action.token,
                message: action.message,
                ...action.user
            }
        } else if (action.type === 'USER_LOG_ERROR') {
            return {
                ...state,
                message: action.message
            }
        } else if (action.type === 'USER_LOG_REFRESH') {
            return {
                ...state,
                message: ''
            }
        } else if (action.type === 'USER_LOGOUT') {
            return {
                ...activeUserDefault
            }
        } else {
            return {
                ...state
            }
        }
    },
    allUsers: (state = allUsersDefault, action) => {
        return {
            ...state
        }
    },
    registerUser: (state = registerUserDefault, action) => {
        switch(action.type) {
            case 'USER_REGISTER_SUCCESS':
            case 'USER_REGISTER_ERROR':
                return {
                    ...state,
                    message: action.message
                };
            case 'USER_REGISTER_REFRESH':
                return {
                    ...state,
                    message: ''
                };
            default:
                return {
                    ...state
                };
        }
    }
});
