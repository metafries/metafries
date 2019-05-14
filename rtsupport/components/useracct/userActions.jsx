import {
    startPhotoAction, 
    finishPhotoAction, 
    startAsyncAction, 
    finishAsyncAction 
} from '../async/asyncActions.jsx'
import cuid from 'cuid'
import { DateTime } from "luxon"

export const updateProfile = (user) => 
    async (
        dispatch,
        getState,
        {getFirebase},
    ) => {
        const firebase = getFirebase()
        const currentUser = firebase.auth().currentUser
        try {
            await firebase.updateProfile(user)
            await currentUser.updateProfile({
                displayName: user.displayName
            })     
        } catch(error) {
            throw new Error('Failed to Update the Profile.')
        }
    }

export const setNewProfilePicture = (file) => 
async (
    dispatch,
    getState,
    {getFirebase, getFirestore}
) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const currentUser = firebase.auth().currentUser
    const storagePath = `${currentUser.uid}/profile_pictures`
    const imgId = cuid()
    const fileOpts = {name: imgId}
    try {
        dispatch(startAsyncAction())        
        let uploadedFile = await firebase.uploadFile(storagePath, file, null, fileOpts)
        let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL()
        let userDoc = await firestore.get(`users/${currentUser.uid}`)
        await firebase.updateProfile({avatarUrl: downloadURL})
        await currentUser.updateProfile({photoURL: downloadURL})
        await firestore.add(
            {
                collection: 'users',
                doc: currentUser.uid,
                subcollections: [{collection: 'profile_pictures'}]
            },
            {
                downloadURL: downloadURL,
                uploadedAt: firestore.FieldValue.serverTimestamp(),
                imgId: imgId,
            }
        )
    } catch (error) {
        throw new Error('Failed to Upload the Image.')
    } finally {
        dispatch(finishAsyncAction())        
    }
}

export const deleteProfilePicture = (photo) =>
    async (
        dispatch,
        getState,
        {getFirebase, getFirestore},
    ) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const currentUser = firebase.auth().currentUser
        try {
            dispatch(startPhotoAction())                    
            if (photo.downloadURL == currentUser.photoURL) {
                await firebase.updateProfile({avatarUrl: ''})
                await currentUser.updateProfile({photoURL: ''})        
            }
            if (photo.imgId) {
                await firebase.deleteFile(`${currentUser.uid}/profile_pictures/${photo.imgId}`)                                                
                await firestore.delete({
                    collection: 'users',
                    doc: currentUser.uid,
                    subcollections: [{collection: 'profile_pictures', doc: photo.id}]
                })    
            }
        } finally {
            dispatch(finishPhotoAction())                    
        }
    }

export const setAvatar = (photo) => 
    async (
        dispatch,
        getState,
        {getFirebase},
    ) => {
        const firebase = getFirebase()
        const currentUser = firebase.auth().currentUser        
        try {
            dispatch(startPhotoAction())                                
            await firebase.updateProfile({avatarUrl: photo.downloadURL})
            await currentUser.updateProfile({photoURL: photo.downloadURL})
        } finally {
            dispatch(finishPhotoAction())                    
        }
    }

export const goingToggleOn = (event) =>
    async (
        dispatch, 
        getState, 
        {getFirebase, getFirestore},
    ) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const currentUser = firebase.auth().currentUser
        const attendee = {
            going: true,
            joinDate: DateTime.local().toJSDate(),
            avatarUrl: getState().firebase.profile.avatarUrl || '/static/images/whazup-square-logo.png',
            displayName: currentUser.displayName,
            host: false,
        }
        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${currentUser.uid}`]: attendee
            })
            await firestore.set(`event_attendee/${event.id}_${currentUser.uid}`, {
                    eventId: event.id,
                    userId: currentUser.uid,
                    eventStartDate: event.startDate,
                    eventEndDate: event.endDate,
                    host: false,
                    status: event.status,
            })
        } catch (e) {
            console.log(e)
        }
    }

export const goingToggleOff = (event) => 
    async (
        dispatch,
        getState,
        {getFirebase, getFirestore},
    ) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const currentUser = firebase.auth().currentUser
        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${currentUser.uid}`]: firestore.FieldValue.delete()
            })
            await firestore.delete(`event_attendee/${event.id}_${currentUser.uid}`)
        } catch (e) {
            console.log(e)
        }
    }