import { createReducer } from '../../app/common/util/reducerUtil.js'
import { 
  CREATE_EVENT, 
  UPDATE_EVENT, 
  DELETE_EVENT,
  FETCH_EVENTS,
} from './eventConstants.jsx'

const initState = []

  export const createEvent = (state, payload) => {
      return [Object.assign({}, payload.event), ...state]
  }

  export const updateEvent = (state, payload) => {
    return [
      ...state.filter(event => event.id !== payload.event.id),
      Object.assign({}, payload.event)
    ]
  }
    
  export const deleteEvent = (state, payload) => {
      return [...state.filter(e => e.id !== payload.eventId)]
  }

  export const fetchEvents = (state, payload) => {
    return payload.events
  }

  export default createReducer(initState, {
      [CREATE_EVENT]: createEvent,
      [UPDATE_EVENT]: updateEvent,
      [DELETE_EVENT]: deleteEvent,
      [FETCH_EVENTS]: fetchEvents,
  })