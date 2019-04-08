import { createReducer } from '../../app/common/util/reducerUtil.js'
import { 
  SUCCESS,
  ERROR,
  CREATE_EVENT, 
  UPDATE_EVENT, 
  SET_NEW_MAIN_POSTER,
  DELETE_EVENT,
  FETCH_EVENTS,
} from './eventConstants.jsx'

const initState = {
  updateEventOk: null,
  updateEventErr: null,  
  uploadImgOk: null,
  uploadImgErr: null,
}

  export const informOk = (state, payload) => {
    switch (payload.opts) {
      case UPDATE_EVENT:
        return {
          ...state,
          updateEventOk: payload.ok,
          updateEventErr: null,
        }
        break
      case SET_NEW_MAIN_POSTER:
        return {
          ...state,
          uploadImgOk: payload.ok,
          uploadImgErr: null,
        }
        break
      default: 
        return {
          ...state,
        }            
    }
  }

  export const informErr = (state, payload) => {
    switch (payload.opts) {
      case UPDATE_EVENT:
        return {
          ...state,
          updateEventErr: payload.err,
        }
        break
      case SET_NEW_MAIN_POSTER:
        return {
          ...state,
          uploadImgErr: payload.err
        }
      default: 
        return {
          ...state,
        }                    
    }
  }

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
      [SUCCESS]: informOk,
      [ERROR]: informErr,
      [CREATE_EVENT]: createEvent,
      [UPDATE_EVENT]: updateEvent,
      [DELETE_EVENT]: deleteEvent,
      [FETCH_EVENTS]: fetchEvents,
  })