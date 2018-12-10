import { combineReducers } from 'redux'
import testReducer from './testReducer.js'

const rootReducer = combineReducers({
    test: testReducer
})

export default rootReducer