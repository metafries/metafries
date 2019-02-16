import { THIRD_PARTY, SIGNUP, LOGIN, LOGOUT, ERROR } from './authConstants.jsx'

export const useThirdParty = (selectedProvider) => 
    async (
        dispatch,
        getState,
        {getFirebase, getFirestore}
    ) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        try {
            let data = await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            })
            if (data.additionalUserInfo.isNewUser) {
                await firestore.set(
                    `users/${data.user.uid}`,
                    {
                        displayName: data.profile.displayName,
                        photoURL: data.profile.avatarUrl,
                        createdAt: firestore.FieldValue.serverTimestamp(),                        
                    }
                )
            }
        } catch(error) {
            dispatch({
                type: ERROR,
                payload: {
                    opts: THIRD_PARTY,
                    errmsg: error
                }
            })
        }
    }

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
                    opts: SIGNUP,
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
                    opts: LOGIN,
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