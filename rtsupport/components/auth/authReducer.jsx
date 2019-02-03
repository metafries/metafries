import { createReducer } from '../../app/common/util/reducerUtil.js'
import { LOGIN, LOGOUT } from './authConstants.jsx'

const initState = {
    authenticated: false,
    identity: ''
}

export const login = (state, payload) => {
    return {
        ...state,
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
    [LOGIN]: login,
    [LOGOUT]: logout
})