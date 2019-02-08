import { ERROR, LOGIN, LOGOUT } from './authConstants.jsx'

export const login = (creds) => {
    return async (
        dispatch, 
        getState, 
        {getFirebase}
    ) => {
        const firebase = getFirebase()
        try {
            await firebase
                    .auth()
                    .signInWithEmailAndPassword(
                        creds.email,
                        creds.password
                    )
            dispatch({
                type: LOGIN,
                payload: {
                    creds
                }
            })
        } catch(error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}