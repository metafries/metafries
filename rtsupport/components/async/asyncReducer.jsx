import { createReducer } from '../../app/common/util/reducerUtil.js'
import { 
    ASYNC_ACTION_STARTED,
    ASYNC_ACTION_FINISHED,
    ASYNC_ACTION_ERROR,
} from './asyncConstants.jsx'

const initState = {
    loading: false
}

export const asyncActionStarted = (state) => {
    return {...state, loading: true}
}

export const asyncActionFinished = (state) => {
    return {...state, loading: false}
}

export const asyncActionError = (state) => {
    return {...state, loading: false}
}

export default createReducer(initState, {
    [ASYNC_ACTION_STARTED]: asyncActionStarted,
    [ASYNC_ACTION_FINISHED]: asyncActionFinished,
    [ASYNC_ACTION_ERROR]: asyncActionError,
})