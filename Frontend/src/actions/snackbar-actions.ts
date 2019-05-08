export const messageSuccess = (message: string) => {
    return {
        type: 'MESSAGE_SUCCESS',
        message: message
    }
};

export const messageError = (message: string) => {
    return {
        type: 'MESSAGE_ERROR',
        message: message
    }
};

export const messageClose = () => {
    return {
        type: 'MESSAGE_CLOSE'
    }
};