import { 
    UPDATE_PWD, 
    THIRD_PARTY, 
    SIGNUP, 
    LOGIN, 
    LOGOUT,
    SUCCESS,
    ERROR 
} from './authConstants.jsx'

import {
    startAsyncAction,
    finishAsyncAction,
} from '../async/asyncActions.jsx'

import githubUsernameRegex from 'github-username-regex';

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
            dispatch(startAsyncAction())                                                            
            getState().auth.isValidUsername = false
            getState().auth.useThirdPartyError = null
            getState().auth.loginError = null
            getState().auth.signupError = null    
            let data = await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            })
            const providedUsername = data.additionalUserInfo.profile.name
            const userQuery = firebase.firestore()
                .collection('users')
                .where('userName', '==', providedUsername)    
            let userQuerySnap = await userQuery.get() 
            const user = firebase.auth().currentUser
            if (data.additionalUserInfo.isNewUser) {
                if (githubUsernameRegex.test(providedUsername)) {
                    if (userQuerySnap.docs.length === 1) {
                        await firestore.delete({
                            collection: 'users',
                            doc: user.uid,
                        })        
                        user.delete().then(function() {
                            dispatch({
                                type: ERROR,
                                payload: {
                                    opts: THIRD_PARTY,
                                    errmsg: {
                                        provider: selectedProvider,
                                        username: providedUsername,    
                                        message:'The username is already in use by another account.'
                                    }
                                }
                            })       
                        }).catch(function(error) {
                            console.log(error)
                        })
                    } else {
                        getState().auth.isValidUsername = true
                        getState().auth.useThirdPartyError = null
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
                } else {
                    await firestore.delete({
                        collection: 'users',
                        doc: user.uid,
                    })        
                    user.delete().then(function() {
                        dispatch({
                            type: ERROR,
                            payload: {
                                opts: THIRD_PARTY,
                                errmsg: {
                                    provider: selectedProvider,
                                    username: providedUsername,
                                    message:
                                        'Username'+
                                        ' [1] May only contain alphanumeric characters or hyphens.' +
                                        ' [2] Cannot have multiple consecutive hyphens.'+
                                        ' [3] Cannot begin or end with a hyphen.'
                                }
                            }
                        })    
                    }).catch(function(error) {
                        console.log(error)
                    })
                }
            } else {
                getState().auth.isValidUsername = true
                getState().auth.useThirdPartyError = null
            }      
        } catch(error) {
            dispatch({
                type: ERROR,
                payload: {
                    opts: THIRD_PARTY,
                    errmsg: error
                }
            })
        } finally {
            dispatch(finishAsyncAction())                        
        }
    }

export const signup = (user) => 
    async (
        dispatch,
        getState,
        {getFirebase, getFirestore}
    ) => {
        getState().auth.isValidUsername = true
        getState().auth.useThirdPartyError = null
        getState().auth.loginError = null
        getState().auth.signupError = null
        const firebase = getFirebase()
        const firestore = getFirestore()
        const userQuery = firebase.firestore()
            .collection('users')
            .where('userName', '==', user.username)
        try {          
            dispatch(startAsyncAction())            
            let userQuerySnap = await userQuery.get()  
            if (userQuerySnap.docs.length === 1) {
                dispatch({
                    type: ERROR,
                    payload: {
                        opts: SIGNUP,
                        errmsg: {message:'The username is already in use by another account.'}
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
        } finally {
            dispatch(finishAsyncAction())            
        }
    }

export const login = (creds) => {
    return async (
        dispatch, 
        getState, 
        {getFirebase}
    ) => {
        getState().auth.isValidUsername = true
        getState().auth.useThirdPartyError = null
        getState().auth.loginError = null
        getState().auth.signupError = null
        const firebase = getFirebase()
        try {
            dispatch(startAsyncAction())
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
        } finally {
            dispatch(finishAsyncAction())            
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}