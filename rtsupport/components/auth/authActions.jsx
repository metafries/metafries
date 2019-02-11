import { ERROR, LOGIN, LOGOUT } from './authConstants.jsx'

export const signup = (user) => 
    async (
        dispatch,
        getState,
        {getFirebase, getFirestore}
    ) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        try {
            await firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        user.email,
                        user.password
                    )
            let currentUser = firebase.auth().currentUser;    
            currentUser.updateProfile({
                displayName: user.username
            })     
            firestore.set(
                `users/${currentUser.uid}`,
                {
                    displayName: user.username,
                    createdAt: firestore.FieldValue.serverTimestamp()
                }
            )
        } catch(error) {
            dispatch({
                type: ERROR,
                payload: {
                    defaultOpts: false,
                    errmsg: error
                }
            })
        }
    }

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
                payload: {
                    defaultOpts: true,
                    errmsg: error
                }
            })
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}