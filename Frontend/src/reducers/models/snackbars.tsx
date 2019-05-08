export interface SnackbarReducer {
    message: string;
    open: boolean,
    error: boolean
}

export const snackbarDefault: SnackbarReducer = {
    message: '',
    open: false,
    error: false
};

export const snackbarReducer = (state = snackbarDefault, action) => {
    switch(action.type){
        case 'MESSAGE_ERROR':
            return {
                ...state,
                message: action.message,
                open: true,
                error: true
            };
        case 'MESSAGE_SUCCESS':
            return {
                ...state,
                message: action.message,
                open: true,
                error: false
            };
        case 'MESSAGE_CLOSE':
            return {
                ...state,
                open: false
            };
        default:
            return {
                ...state
            }
    }
};