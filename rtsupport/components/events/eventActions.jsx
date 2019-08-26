import { DateTime } from "luxon";
import cuid from 'cuid'
import { 
    SUCCESS,
    ERROR,
    UPDATE_EVENT, 
    UPDATE_STATUS,
    SET_NEW_MAIN_POSTER,
    DELETE_EVENT,
    FETCH_EVENTS,
} from './eventConstants.jsx'

import {
    startPhotoAction, 
    finishPhotoAction, 
    startAsyncAction,
    finishAsyncAction,
    asyncActionError,
} from '../async/asyncActions.jsx'

import { fetchSampleData } from '../../app/data/mockApi.js'
import { shapeNewEvent } from '../../app/common/util/shapers.js'
import firebase from '../../app/config/firebase.js'

export const getTotalLiked = (userId) =>
    async (dispatch) => {
        const firestore = firebase.firestore()
        const eventsQuery = firestore
            .collection('event_like')
            .where('userId', '==', userId)
        try {
            dispatch(startAsyncAction())
            let eventsQuerySnap = await eventsQuery.get()
            return eventsQuerySnap.docs.length
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }        
    }

export const getLikedEvents = (userId, lastEvent) =>
    async (dispatch, getState) => {
        const firestore = firebase.firestore()
        const eventsRef = firestore.collection('event_like')
        try {
            dispatch(startAsyncAction())
            let lastEventSnap = lastEvent 
                && await firestore
                    .collection('event_like')
                    .doc(lastEvent.compositeId)
                    .get()
            let query = lastEvent
                ? eventsRef
                    .where('userId', '==', userId)
                    .startAfter(lastEventSnap)
                    .limit(2)
                : eventsRef
                    .where('userId', '==', userId)
                    .limit(2)
            let querySnap = await query.get()
            if (querySnap.docs.length === 0) {
                dispatch(finishAsyncAction())            
                return querySnap               
            }
            let events = []
            for (let i=0; i<querySnap.docs.length; i++) {
                const fields = querySnap.docs[i].data()
                let evt = await firestore
                    .collection('events')
                    .doc(fields.eventId)
                    .get()
                events.push({
                    ...evt.data(), 
                    id: fields.eventId,
                    compositeId: `${fields.eventId}_${fields.userId}`
                })
            }
            dispatch({
                type: FETCH_EVENTS,
                payload: {
                    events,
                }        
            })
            return querySnap
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())            
        }
    }
    
export const getTotalSaved = (userId) =>
    async (dispatch) => {
        const firestore = firebase.firestore()
        const eventsQuery = firestore
            .collection('event_attendee')
            .where('userId', '==', userId)
        try {
            dispatch(startAsyncAction())
            let eventsQuerySnap = await eventsQuery.get()
            return eventsQuerySnap.docs.length
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const getSavedEvents = (userId, lastEvent) => 
    async (dispatch, getState) => {
        const firestore = firebase.firestore()
        const eventsRef = firestore.collection('event_attendee')
        try {
            dispatch(startAsyncAction())
            let lastEventSnap = lastEvent 
                && await firestore
                    .collection('event_attendee')
                    .doc(lastEvent.compositeId)
                    .get()
            let query = lastEvent
                ? eventsRef
                    .where('userId', '==', userId)
                    .startAfter(lastEventSnap)
                    .limit(2)
                : eventsRef
                    .where('userId', '==', userId)
                    .limit(2)
            let querySnap = await query.get()
            if (querySnap.docs.length === 0) {
                dispatch(finishAsyncAction())            
                return querySnap               
            }
            let events = []
            for (let i=0; i<querySnap.docs.length; i++) {
                let evt = await firestore
                    .collection('events')
                    .doc(querySnap.docs[i].data().eventId)
                    .get()
                    events.push({
                        ...evt.data(), 
                        id: querySnap.docs[i].data().eventId,
                        compositeId: 
                            querySnap.docs[i].data().eventId 
                                + '_'
                                + querySnap.docs[i].data().userId
                    })
            }
            dispatch({
                type: FETCH_EVENTS,
                payload: {
                    events,
                }        
            })
            return querySnap
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())            
        }
    }
    
export const getTotalAttended = (userId) =>
    async (dispatch) => {
        let today = new Date(Date.now())
        const firestore = firebase.firestore()
        const eventsQuery = firestore
            .collection('event_attendee')
            .where('userId', '==', userId)
            .where('eventEndDate', '<', today)
            .where('status', '==', 0)
        try {
            dispatch(startAsyncAction())
            let eventsQuerySnap = await eventsQuery.get()
            return eventsQuerySnap.docs.length
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const getAttendedEvents = (userId, lastEvent) => 
    async (dispatch, getState) => {
        let today = new Date(Date.now())        
        const firestore = firebase.firestore()
        const eventsRef = firestore.collection('event_attendee')
        try {
            dispatch(startAsyncAction())
            let lastEventSnap = lastEvent 
                && await firestore
                    .collection('event_attendee')
                    .doc(lastEvent.compositeId)
                    .get()
            let query = lastEvent
                ? eventsRef
                    .where('userId', '==', userId)
                    .where('eventEndDate', '<', today)
                    .where('status', '==', 0)  
                    .orderBy('eventEndDate', 'desc')      
                    .startAfter(lastEventSnap)
                    .limit(2)
                : eventsRef
                    .where('userId', '==', userId)
                    .where('eventEndDate', '<', today)
                    .where('status', '==', 0)        
                    .orderBy('eventEndDate', 'desc')
                    .limit(2)
            let querySnap = await query.get()
            if (querySnap.docs.length === 0) {
                dispatch(finishAsyncAction())            
                return querySnap               
            }
            let events = []
            for (let i=0; i<querySnap.docs.length; i++) {
                let evt = await firestore
                    .collection('events')
                    .doc(querySnap.docs[i].data().eventId)
                    .get()
                    events.push({
                        ...evt.data(), 
                        id: querySnap.docs[i].data().eventId,
                        compositeId: 
                            querySnap.docs[i].data().eventId 
                                + '_'
                                + querySnap.docs[i].data().userId
                    })
                }
            dispatch({
                type: FETCH_EVENTS,
                payload: {
                    events,
                }        
            })
            return querySnap
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())            
        }
    }

export const getTotalGoing = (userId) =>
    async (dispatch) => {
        let today = new Date(Date.now())
        const firestore = firebase.firestore()
        const eventsQuery = firestore
            .collection('event_attendee')
            .where('userId', '==', userId)
            .where('eventEndDate', '>=', today)
        try {
            dispatch(startAsyncAction())
            let eventsQuerySnap = await eventsQuery.get()
            return eventsQuerySnap.docs.length
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const getGoingEvents = (userId, lastEvent) => 
    async (dispatch, getState) => {
        let today = new Date(Date.now())        
        const firestore = firebase.firestore()
        const eventsRef = firestore.collection('event_attendee')
        try {
            dispatch(startAsyncAction())
            let lastEventSnap = lastEvent 
                && await firestore
                    .collection('event_attendee')
                    .doc(lastEvent.compositeId)
                    .get()
            let query = lastEvent
                ? eventsRef
                    .where('userId', '==', userId)
                    .where('eventEndDate', '>=', today)    
                    .startAfter(lastEventSnap)
                    .limit(2)
                : eventsRef
                    .where('userId', '==', userId)
                    .where('eventEndDate', '>=', today)    
                    .limit(2)
            let querySnap = await query.get()
            if (querySnap.docs.length === 0) {
                dispatch(finishAsyncAction())            
                return querySnap               
            }
            let events = []
            for (let i=0; i<querySnap.docs.length; i++) {
                let evt = await firestore
                    .collection('events')
                    .doc(querySnap.docs[i].data().eventId)
                    .get()
                    events.push({
                        ...evt.data(), 
                        id: querySnap.docs[i].data().eventId,
                        compositeId: 
                            querySnap.docs[i].data().eventId 
                                + '_'
                                + querySnap.docs[i].data().userId
                    })
                }
            dispatch({
                type: FETCH_EVENTS,
                payload: {
                    events,
                }        
            })
            return querySnap
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())            
        }
    }
    
export const getTotalHosting = (userId) =>
    async (dispatch) => {
        let today = new Date(Date.now())
        const firestore = firebase.firestore()
        const eventsQuery = firestore
            .collection('event_attendee')
            .where('userId', '==', userId)
            .where('host', '==', true)
            .where('eventEndDate', '>=', today)
        try {
            dispatch(startAsyncAction())
            let eventsQuerySnap = await eventsQuery.get()
            return eventsQuerySnap.docs.length
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const getHostingEvents = (userId, lastEvent) => 
    async (dispatch, getState) => {
        let today = new Date(Date.now())        
        const firestore = firebase.firestore()
        const eventsRef = firestore.collection('event_attendee')
        try {
            dispatch(startAsyncAction())
            let lastEventSnap = lastEvent 
                && await firestore
                    .collection('event_attendee')
                    .doc(lastEvent.compositeId)
                    .get()
            let query = lastEvent
                ? eventsRef
                    .where('userId', '==', userId)
                    .where('host', '==', true)
                    .where('eventEndDate', '>=', today)    
                    .startAfter(lastEventSnap)
                    .limit(2)
                : eventsRef
                    .where('userId', '==', userId)
                    .where('host', '==', true)
                    .where('eventEndDate', '>=', today)    
                    .limit(2)
            let querySnap = await query.get()
            if (querySnap.docs.length === 0) {
                dispatch(finishAsyncAction())            
                return querySnap               
            }
            let events = []
            for (let i=0; i<querySnap.docs.length; i++) {
                let evt = await firestore
                    .collection('events')
                    .doc(querySnap.docs[i].data().eventId)
                    .get()
                    events.push({
                        ...evt.data(), 
                        id: querySnap.docs[i].data().eventId,
                        compositeId: 
                            querySnap.docs[i].data().eventId 
                                + '_'
                                + querySnap.docs[i].data().userId
                    })
            }
            console.log(events)
            dispatch({
                type: FETCH_EVENTS,
                payload: {
                    events,
                }        
            })
            return querySnap
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())            
        }
    }
    
export const totalRecommended = () =>
    async (dispatch) => {
        let today = new Date(Date.now())
        const firestore = firebase.firestore()
        const eventsQuery = firestore
            .collection('events')
            .where('status', '==', 0) 
            .where('endDate', '>=', today)
        try {
            dispatch(startAsyncAction())
            let eventsQuerySnap = await eventsQuery.get()
            return eventsQuerySnap.docs.length
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const recommendedEvents = (lastEvent) => 
    async (dispatch, getState) => {
        let today = new Date(Date.now())
        const firestore = firebase.firestore()
        const eventsRef = firestore.collection('events')
        try {
            dispatch(startAsyncAction())
            let lastEventSnap = lastEvent 
                && await firestore.collection('events').doc(lastEvent.id).get()
            let query = lastEvent
                ? eventsRef
                    .where('status', '==', 0)                
                    .where('endDate', '>=', today)
                    .orderBy('endDate')
                    .startAfter(lastEventSnap)
                    .limit(2)
                : eventsRef
                    .where('status', '==', 0)                                    
                    .where('endDate', '>=', today)
                    .orderBy('endDate')
                    .limit(2)
            let querySnap = await query.get()
            if (querySnap.docs.length === 0) {
                dispatch(finishAsyncAction())            
                return querySnap               
            }
            let events = []
            for (let i=0; i<querySnap.docs.length; i++) {
                let evt = {
                    ...querySnap.docs[i].data(),
                    id: querySnap.docs[i].id,
                }
                events.push(evt)
            }
            dispatch({
                type: FETCH_EVENTS,
                payload: {
                    events,
                }        
            })
            return querySnap
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())            
        }
    }

export const getTotalOfContinent = (continentCode) =>
    async (dispatch) => {
        const firestore = firebase.firestore()
        const eventsQuery = firestore
            .collection('events')
            .where('continent', '==', continentCode)
        try {
            dispatch(startAsyncAction())
            let eventsQuerySnap = await eventsQuery.get()
            return eventsQuerySnap.docs.length
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const getEventsByContinent = (continentCode, lastEvent) => 
    async (dispatch, getState) => {
        const firestore = firebase.firestore()
        const eventsRef = firestore.collection('events')
        try {
            dispatch(startAsyncAction())
            let lastEventSnap = lastEvent 
                && await firestore.collection('events').doc(lastEvent.id).get()
            let query = lastEvent
                ? eventsRef
                    .where('continent', '==', continentCode)
                    .orderBy('startDate')
                    .startAfter(lastEventSnap)
                    .limit(2)                    
                : eventsRef
                    .where('continent', '==', continentCode)
                    .orderBy('startDate')
                    .limit(2)     
            let querySnap = await query.get()
            if (querySnap.docs.length === 0) {
                dispatch(finishAsyncAction())
                return querySnap
            }
            let events = []
            for (let i=0; i<querySnap.docs.length; i++) {
                let evt = {
                    ...querySnap.docs[i].data(),
                    id: querySnap.docs[i].id,
                }
                events.push(evt)
            }
            dispatch({
                type: FETCH_EVENTS,
                payload: {
                    events,
                }
            })
            return querySnap
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const totalSubscriptions = () =>
    async (dispatch) => {
        const firestore = firebase.firestore()
        const eventsQuery = firestore
            .collection('events')
            .orderBy('createdAt', 'desc')
        try {
            dispatch(startAsyncAction())
            let eventsQuerySnap = await eventsQuery.get()
            return eventsQuerySnap.docs.length
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const subscribedEvents = (lastEvent) => 
    async (dispatch, getState) => {
        const firestore = firebase.firestore()
        const eventsRef = firestore.collection('events')
        try {
            dispatch(startAsyncAction())
            let lastEventSnap = lastEvent 
                && await firestore.collection('events').doc(lastEvent.id).get()
            let query = lastEvent
                ? eventsRef
                    .orderBy('createdAt', 'desc')
                    .startAfter(lastEventSnap)
                    .limit(2)
                : eventsRef
                    .orderBy('createdAt', 'desc')
                    .limit(2)    
            let querySnap = await query.get()
            if (querySnap.docs.length === 0) {
                dispatch(finishAsyncAction())            
                return querySnap               
            }        
            let events = []
            for (let i=0; i<querySnap.docs.length; i++) {
                let evt = {
                    ...querySnap.docs[i].data(),
                    id: querySnap.docs[i].id,
                }
                events.push(evt)
            }
            dispatch({
                type: FETCH_EVENTS,
                payload: {
                    events,
                }        
            })
            return querySnap
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(finishAsyncAction())            
        }
    }

export const fetchEvents = (events) => {
    return {
        type: FETCH_EVENTS,
        payload: events
    }
}

export const createEvent = (event) => {
    return async(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const currentUser = firebase.auth().currentUser
        const avatarUrl = getState().firebase.profile.avatarUrl
        let newEvent = shapeNewEvent(currentUser, avatarUrl, event)
        try {
            let createdEvent = await firestore.add(`events`, newEvent)
            await firestore.set(
                `event_attendee/${createdEvent.id}_${currentUser.uid}`,
                {
                    eventId: createdEvent.id,
                    userId: currentUser.uid,
                    eventStartDate: event.startDate,
                    eventEndDate: event.endDate,
                    host: true,
                    status: 0,
                }
            )
        } catch (e) {
            throw new Error('ERR_CREATE_EVENT')
        }
    }
}

export const updateEvent = (event) => {
    return async(dispatch, getState) => {
        const firestore = firebase.firestore()
        event.startDate = DateTime
            .fromFormat(event.startDate, 'yyyy/MM/dd, HH:mm')
            .toJSDate()
        event.endDate = DateTime
            .fromFormat(event.endDate, 'yyyy/MM/dd, HH:mm')
            .toJSDate()
        try {
            dispatch(startAsyncAction())
            let eventDocRef = firestore.collection('events').doc(event.id)
            let startDateEqual = DateTime
                .fromObject(getState().firestore.ordered.events[0].startDate)
                .equals(DateTime.fromObject(event.startDate))
            let endDateEqual = DateTime
                .fromObject(getState().firestore.ordered.events[0].endDate)
                .equals(DateTime.fromObject(event.endDate))
            if (startDateEqual || endDateEqual) {
                let batch = firestore.batch()
                await batch.update(eventDocRef, event)
                let eventAttendeeRef = firestore.collection('event_attendee')
                let eventAttendeeQuery = await eventAttendeeRef
                    .where('eventId', '==', event.id)
                let eventAttendeeQuerySnap = await eventAttendeeQuery.get()
                for (let i=0; i<eventAttendeeQuerySnap.docs.length; i++) {
                    let eventAttendeeDocRef = await firestore
                        .collection('event_attendee')
                        .doc(eventAttendeeQuerySnap.docs[i].id)
                    await batch.update(eventAttendeeDocRef, {
                        eventStartDate: DateTime
                            .fromFormat(event.startDate, 'yyyy/MM/dd, HH:mm')
                            .toJSDate(),
                        eventEndDate: DateTime
                            .fromFormat(event.endDate, 'yyyy/MM/dd, HH:mm')
                            .toJSDate(),
                    })
                }
                await batch.commit()
            } else {
                await eventDocRef.update(event)
            }
            dispatch({
                type: SUCCESS,
                payload: {
                    opts: UPDATE_EVENT,
                    ok: {
                        message: 'The event updated successfully',
                    },
                },
            })
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: {
                    opts: UPDATE_EVENT,
                    err: e,
                },
            })
        } finally {
            dispatch(finishAsyncAction())
        }
    }
}

export const setNewMainPoster = (event, file) =>
    async (
        dispatch,
        getState,
        {getFirebase, getFirestore},
    ) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const eventId = event.id                
        const storagePath = `events/${eventId}/posters`
        const imgId = cuid()
        const fileOpts = {name: imgId}
        try {
            dispatch(startAsyncAction())
            let uploadedFile = await firebase.uploadFile(storagePath, file, null, fileOpts)
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL()
            event.startDate = DateTime
                .fromFormat(event.startDate, 'yyyy/MM/dd, HH:mm')
                .toJSDate()
            event.endDate = DateTime
                .fromFormat(event.endDate, 'yyyy/MM/dd, HH:mm')
                .toJSDate()
            const _event = {
                ...event,
                posterUrl: downloadURL,
            }
            await firestore.update(`events/${eventId}`, _event)
            const poster = {
                downloadURL: downloadURL,
                uploadedAt: firestore.FieldValue.serverTimestamp(),
            }
            await firestore.update(`events/${eventId}`, {
                [`posters.${imgId}`]: poster,
            })
            dispatch({
                type: SUCCESS,
                payload: {
                    opts: SET_NEW_MAIN_POSTER,
                    ok: {
                        message: 'Your poster has changed successfully',
                    },
                },
            })
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: {
                    opts: SET_NEW_MAIN_POSTER,
                    err: {
                        message: 'Failed to upload the image.',
                    }
                },
            })
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const setToMain = (photo, eventId) =>
    async (
        dispatch,
        getState,
        {getFirestore},
    ) => {
        const firestore = getFirestore()
        try {
            dispatch(startPhotoAction())
            await firestore.update(`events/${eventId}`, {
                posterUrl: photo.downloadURL
            })
        } finally {
            dispatch(finishPhotoAction())
        }
    }

export const deletePoster = (photo, event) =>
    async (
        dispatch,
        getState,
        {getFirestore}
    ) => {
        const firestore = getFirestore()
        try {
            dispatch(startPhotoAction())                    
            await firestore.update(`events/${event.id}`, {
                [`posters.${photo.id}`]: firestore.FieldValue.delete()
            })
            if (photo.downloadURL === event.posterUrl) {
                await firestore.update(`events/${event.id}`, {
                    posterUrl: firestore.FieldValue.delete()
                })
            }
        } finally {
            dispatch(finishPhotoAction())
        }
    }

export const updateStatus = (code, eventId) => 
    async (
        dispatch, 
        getState, 
        {getFirestore}
    ) => {
        const firestore = getFirestore()
        try {
            dispatch(startAsyncAction())
            await firestore.update(`events/${eventId}`, {
                status: code
            })
            dispatch({
                type: SUCCESS,
                payload: {
                    opts: UPDATE_STATUS,
                    ok: {
                        message: 'The status updated successfully',
                    },
                },
            })
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: {
                    opts: UPDATE_STATUS,
                    err: 'ERR_UPDATE_STATUS',
                },
            })
        } finally {
            dispatch(finishAsyncAction())
        }
    }

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
}

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(startAsyncAction())
            let events = await fetchSampleData()
            dispatch(fetchEvents(events))
            dispatch(finishAsyncAction())
        } catch(error) {
            console.log(error)
            dispatch(asyncActionError())
        }
    }
}