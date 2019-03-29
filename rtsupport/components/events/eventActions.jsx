import { DateTime } from "luxon";
import { 
    SUCCESS,
    ERROR,
    UPDATE_EVENT, 
    DELETE_EVENT,
    FETCH_EVENTS,
} from './eventConstants.jsx'

import {
    startAsyncAction,
    finishAsyncAction,
    asyncActionError,
} from '../async/asyncActions.jsx'

import { fetchSampleData } from '../../app/data/mockApi.js'
import { shapeNewEvent } from '../../app/common/util/shapers.js'

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
                }
            )
        } catch (e) {
            throw new Error('ERR_CREATE_EVENT')
        }
    }
}

export const updateEvent = (event) => {
    return async(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        event.startDate = DateTime
            .fromFormat(event.startDate, 'yyyy/MM/dd, HH:mm')
            .toJSDate()
        event.endDate = DateTime
            .fromFormat(event.endDate, 'yyyy/MM/dd, HH:mm')
            .toJSDate()
        try {
            dispatch(startAsyncAction())
            await firestore.update(`events/${event.id}`, event)
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