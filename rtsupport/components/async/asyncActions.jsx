import { 
    PHOTO_ACTION_STARTED,
    PHOTO_ACTION_FINISHED,
    ASYNC_ACTION_STARTED,
    ASYNC_ACTION_FINISHED,
    ASYNC_ACTION_ERROR,
} from './asyncConstants.jsx'

export const startPhotoAction = () => {
    return {
        type: PHOTO_ACTION_STARTED
    }
}

export const finishPhotoAction = () => {
    return {
        type: PHOTO_ACTION_FINISHED
    }
}

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