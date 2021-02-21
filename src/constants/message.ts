export const MESSAGE_TYPE = {
    ERROR: 'error',
    SUCCESS: 'success'
}

export const POTION_MESSAGE = {
    CREATE: {
        SUCCESS: {
            type: MESSAGE_TYPE.SUCCESS, message: 'Potion created'
        },
        ERROR: {
            type: MESSAGE_TYPE.ERROR, message: 'Creation error'
        },
        INVALID: {
            type: MESSAGE_TYPE.ERROR, message: 'Fill in all the fields'
        }
    }
}
