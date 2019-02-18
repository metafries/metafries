import { createReducer } from '../../app/common/util/reducerUtil.js'
import { 
    UPDATE_PWD, 
    THIRD_PARTY, 
    SIGNUP, 
    LOGIN, 
    LOGOUT,
    SUCCESS,
    ERROR 
} from './authConstants.jsx'

const initState = {
    updatePwdInform: null,
    updatePwdError: null,
    useThirdPartyError: null,
    signupError: null,
    loginError: null,    
    authenticated: false,
    identity: ''
}

export const inform = (state, payload) => {
    switch (payload.opts) {
        case UPDATE_PWD:
            return {
                ...state,
                updatePwdInform: payload.okmsg,
                updatePwdError: null,
            }
            break
    }
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
        case UPDATE_PWD:
            return {
                ...state,
                updatePwdError: payload.errmsg,
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
    [SUCCESS]: inform,
    [ERROR]: errors,
    [LOGIN]: login,
    [LOGOUT]: logout
})