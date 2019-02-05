import { 
    ASYNC_ACTION_STARTED,
    ASYNC_ACTION_FINISHED,
    ASYNC_ACTION_ERROR,
} from './asyncConstants.jsx'

export const startAsyncAction = () => {
    return {
        type: ASYNC_ACTION_STARTED
    }
}

export const finishAsyncAction = () => {
    return {
        type: ASYNC_ACTION_FINISHED
    }
}

export const asyncActionError = () => {
    return {
        type: ASYNC_ACTION_ERROR
    }
}