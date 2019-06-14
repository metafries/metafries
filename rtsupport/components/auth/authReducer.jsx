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
    isValidUsername: true,
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
        default: 
            return {
                ...state,
            }        
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
        default: 
            return {
                ...state,
            }
    }
}

export const login = (state, payload) => {
    return {
        ...state,
        errmsg: null,
        authenticated: true,
        useThirdPartyError: null,
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