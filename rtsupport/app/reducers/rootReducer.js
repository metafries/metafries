import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import testReducer from '../../components/testarea/testReducer.js'
import eventReducer from '../../components/events/eventReducer.jsx'
import authReducer from '../../components/auth/authReducer.jsx'
import asyncReducer from '../../components/async/asyncReducer.jsx'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    test: testReducer,
    events: eventReducer,
    auth: authReducer,
    async: asyncReducer,
})

export default rootReducer