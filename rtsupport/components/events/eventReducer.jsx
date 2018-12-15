import { createReducer } from '../../app/common/util/reducerUtil.js'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants.jsx'

const initState = [
    {
      id: '1',
      title: 'Trip to Tower of London',
      startDate: '2018/03/27, 11:00',
      endDate: '2018/03/28, 14:00',    
      category: 'culture',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      location: 'London, UK',
      venue: "Tower of London, St Katharine's & Wapping, London",
      hostedBy: 'Bob',
      hostPhotoURL: '',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: ''
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: ''
        }
      ]
    },
    {
      id: '2',
      title: 'Trip to Punch and Judy Pub',
      startDate: '2018/03/28, 14:00',
      endDate: '2018/03/29, 11:00',        
      category: 'drinks',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      location: 'London, UK',
      venue: 'Punch & Judy, Henrietta Street, London, UK',
      hostedBy: 'Tom',
      hostPhotoURL: '',
      attendees: [
        {
          id: 'b',
          name: 'Tom',
          photoURL: ''
        },
        {
          id: 'a',
          name: 'Bob',
          photoURL: ''
        }
      ]
    }
  ]

  export const createEvent = (state, payload) => {
      return [...state, Object.assign({}, payload.event)]
  }

  export const updateEvent = (state, payload) => {
      return [
          ...state.filter(e => e.id !== payload.event.id),
          Object.assign({}, payload.event)
      ]
  }

  export const deleteEvent = (state, payload) => {
      return [...state.filter(e => e.id !== payload.eventId)]
  }

  export default createReducer(initState, {
      [CREATE_EVENT]: createEvent,
      [UPDATE_EVENT]: updateEvent,
      [DELETE_EVENT]: deleteEvent
  })