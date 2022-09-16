// const { createStore, applyMiddleware, combineReducers, compose } = Redux
// const thunk = ReduxThunk.default

import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { boardReducer } from './board/board.reducer.js'
import { userReducer } from './user/user.reducer.js'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    boardModule: boardReducer,
    userModule: userReducer,
    systemModule: systemReducer,
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


