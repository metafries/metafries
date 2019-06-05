import { 
    UPDATE_PWD, 
    THIRD_PARTY, 
    SIGNUP, 
    LOGIN, 
    LOGOUT,
    SUCCESS,
    ERROR 
} from './authConstants.jsx'

export const updatePassword = (creds) => 
    async (
        dispatch,
        getState,
        {getFirebase},
    ) => {
        const firebase = getFirebase()
        let currentUser = firebase.auth().currentUser; 
        try {
            await currentUser.updatePassword(
                creds.new_password
            )
            dispatch({
                type: SUCCESS,
                payload: {
                    opts: UPDATE_PWD,
                    okmsg: {
                        message: 'Password changed successfully.'
                    }
                }
            })
        } catch(error) {
            dispatch({
                type: ERROR,
                payload: {
                    opts: UPDATE_PWD,
                    errmsg: error
                }
            })
        }
    }

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
                        userName: data.profile.displayName,
                        avatarUrl: data.profile.avatarUrl,
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
        const userQuery = firebase.firestore()
            .collection('users')
            .where('userName', '==', user.username)
        try {          
            let userQuerySnap = await userQuery.get()  
            if (userQuerySnap.docs.length === 1) {
                dispatch({
                    type: ERROR,
                    payload: {
                        opts: SIGNUP,
                        errmsg: {message:'The username is already in use.'}
                    }
                })    
                return                
            } else {
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
                        userName: user.username,
                        createdAt: firestore.FieldValue.serverTimestamp()
                    }
                )
            }
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