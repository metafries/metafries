import { combineReducers } from 'redux'
import testReducer from '../../components/testarea/testReducer.js'
import eventReducer from '../../components/events/eventReducer.jsx'
import authReducer from '../../components/auth/authReducer.jsx'
import asyncReducer from '../../components/async/asyncReducer.jsx'

const rootReducer = combineReducers({
    test: testReducer,
    events: eventReducer,
    auth: authReducer,
    async: asyncReducer,
})

export default rootReducer