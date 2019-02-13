import { createReducer } from '../../app/common/util/reducerUtil.js'
import { THIRD_PARTY, SIGNUP, LOGIN, LOGOUT, ERROR } from './authConstants.jsx'

const initState = {
    useThirdPartyError: null,
    signupError: null,
    loginError: null,    
    authenticated: false,
    identity: ''
}

export const errors = (state, payload) => {
    switch (payload.opts) {
        case LOGIN:
            return {
                ...state,
                loginError: payload.errmsg,
                authenticated: false,
                identity: ''
            }
            break
        case SIGNUP:
            return {
                ...state,
                signupError: payload.errmsg,
                authenticated: false,
                identity: ''
            }
            break
        case THIRD_PARTY:
            return {
                ...state,
                useThirdPartyError: payload.errmsg,
                authenticated: false,
                identity: ''
            }    
            break
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