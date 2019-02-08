import { createReducer } from '../../app/common/util/reducerUtil.js'
import { ERROR, LOGIN, LOGOUT } from './authConstants.jsx'

const initState = {
    errmsg: null,    
    authenticated: false,
    identity: ''
}

export const errors = (state, payload) => {
    return {
        ...state,
        errmsg: payload,
        authenticated: false,
        identity: ''
    }
}

export const login = (state, payload) => {
    return {
        ...state,
        errmsg: null,
        authenticated: true,
        identity: payload.creds.email
    }
}

export const logout = (state, payload) => {
    return {
        ...state,
        authenticated: false,
        identity: ''
    }
}

export default createReducer(initState, {
    [ERROR]: errors,
    [LOGIN]: login,
    [LOGOUT]: logout
})