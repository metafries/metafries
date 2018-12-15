import { combineReducers } from 'redux'
import testReducer from '../../components/testarea/testReducer.js'
import eventReducer from '../../components/events/eventReducer.jsx'

const rootReducer = combineReducers({
    test: testReducer,
    events: eventReducer
})

export default rootReducer