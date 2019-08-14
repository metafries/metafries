import { createReducer } from '../../app/common/util/reducerUtil.js'
import { 
    PHOTO_ACTION_STARTED,
    PHOTO_ACTION_FINISHED,
    ASYNC_ACTION_STARTED,
    ASYNC_ACTION_FINISHED,
    ASYNC_ACTION_ERROR,
} from './asyncConstants.jsx'

const initState = {
    err: false,
    processing: false,
    loading: false
}

export const photoActionStarted = (state) => {
    return {...state, processing: true}
}

export const photoActionFinished = (state) => {
    return {...state, processing: false}
}

export const asyncActionStarted = (state) => {
    return {...state, loading: true}
}

export const asyncActionFinished = (state) => {
    return {...state, loading: false}
}

export const asyncActionError = (state) => {
    return {...state, err: true, loading: false}
}

export default createReducer(initState, {
    [PHOTO_ACTION_STARTED]: photoActionStarted,
    [PHOTO_ACTION_FINISHED]: photoActionFinished,
    [ASYNC_ACTION_STARTED]: asyncActionStarted,
    [ASYNC_ACTION_FINISHED]: asyncActionFinished,
    [ASYNC_ACTION_ERROR]: asyncActionError,
})