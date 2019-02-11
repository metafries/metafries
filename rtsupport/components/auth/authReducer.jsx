import { createReducer } from '../../app/common/util/reducerUtil.js'
import { ERROR, LOGIN, LOGOUT } from './authConstants.jsx'

const initState = {
    signupError: null,
    loginError: null,    
    authenticated: false,
    identity: ''
}

export const errors = (state, payload) => {
    if (payload.defaultOpts) {
        return {
            ...state,
            loginError: payload.errmsg,
            authenticated: false,
            identity: ''
        }    
    } else {
        return {
            ...state,
            signupError: payload.errmsg,
            authenticated: false,
            identity: ''
        }    
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