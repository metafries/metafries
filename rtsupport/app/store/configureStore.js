import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer.js'

export const configureStore = (preloadedState) => {
    const middlewares = [ReduxThunk]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const storeEnhancers = [middlewareEnhancer]
    
    const composedEnhancer = composeWithDevTools(...storeEnhancers)

    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    )

    // if (process.env.NODE_ENV !== 'production') {
    //     if (module.hot) {
    //         module.hot.accept('../reducers/rootReducer.js', () => {
    //             const newRootReducer = require('../reducers/rootReducer.js').default
    //             store.replaceReducer(newRootReducer)
    //         })
    //     }
    // }

    return store
}