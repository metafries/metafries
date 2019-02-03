import { LOGIN, LOGOUT } from './authConstants.jsx'

export const login = (creds) => {
    return {
        type: LOGIN,
        payload: {
            creds
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}