import { combineReducers } from 'redux'
import testReducer from '../../components/testarea/testReducer.js'

const rootReducer = combineReducers({
    test: testReducer
})

export default rootReducer