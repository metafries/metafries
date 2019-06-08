import {
    asyncActionError,
    startPhotoAction, 
    finishPhotoAction, 
    startAsyncAction, 
    finishAsyncAction 
} from '../async/asyncActions.jsx'
import cuid from 'cuid'
import { DateTime } from "luxon"
import firebase from '../../app/config/firebase.js'

export const addEventComment = (eventId, targetCode, comment) => 
    async (
        dispatch,
        getState,
        {getFirebase},
    ) => {
        const firebase = getFirebase()
        const profile = getState().firebase.profile
        const currentUser = firebase.auth().currentUser
        let newComment = {
            targetCode,
            displayName: profile.displayName,
            avatarUrl: profile.avatarUrl || '/static/images/whazup-square-logo.png',
            uid: currentUser.uid,
            text: comment,
            date: Date.now(),
        }
        try {
            await firebase.push(`event_chat/${eventId}`, newComment)
        } catch (e) {
            dispatch(asyncActionError())
            console.log(e)
        }
    }

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
    {getFirestore}
) => {
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
        const firestorejs = firebase.firestore()
        let eventAttendeeRef = firestorejs.collection('event_attendee')    
        let batch = firestorejs.batch()            
        let eventAttendeeQuery = await eventAttendeeRef
            .where('userId', '==', currentUser.uid)
        let eventAttendeeQuerySnap = await eventAttendeeQuery.get()
        for (let i=0; i<eventAttendeeQuerySnap.docs.length; i++) {
            let eventDocRef = await firestorejs
                .collection('events')
                .doc(eventAttendeeQuerySnap.docs[i].data().eventId)
            let eventSnap = await eventDocRef.get()
            if (eventSnap.data().hostUid === currentUser.uid) {
                batch.update(eventDocRef, {
                    hostAvatarUrl: downloadURL,
                    [`attendees.${currentUser.uid}.avatarUrl`]: downloadURL,
                })
            } else {
                batch.update(eventDocRef, {
                    [`attendees.${currentUser.uid}.avatarUrl`]: downloadURL,
                })                    
            }
        }
        await batch.commit()
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
    ) => {
        const firestore = firebase.firestore()
        const currentUser = firebase.auth().currentUser        
        let eventAttendeeRef = firestore.collection('event_attendee')
        try {
            dispatch(startPhotoAction())                                
            await firebase.updateProfile({avatarUrl: photo.downloadURL})
            await currentUser.updateProfile({photoURL: photo.downloadURL})
            let batch = firestore.batch()            
            let eventAttendeeQuery = await eventAttendeeRef
                .where('userId', '==', currentUser.uid)
            let eventAttendeeQuerySnap = await eventAttendeeQuery.get()
            for (let i=0; i<eventAttendeeQuerySnap.docs.length; i++) {
                let eventDocRef = await firestore
                    .collection('events')
                    .doc(eventAttendeeQuerySnap.docs[i].data().eventId)
                let eventSnap = await eventDocRef.get()
                if (eventSnap.data().hostUid === currentUser.uid) {
                    batch.update(eventDocRef, {
                        hostAvatarUrl: photo.downloadURL,
                        [`attendees.${currentUser.uid}.avatarUrl`]: photo.downloadURL,
                    })
                } else {
                    batch.update(eventDocRef, {
                        [`attendees.${currentUser.uid}.avatarUrl`]: photo.downloadURL,
                    })                    
                }
            }
            await batch.commit()
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