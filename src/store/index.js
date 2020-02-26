import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'
import { counterReducer } from './counter'
import { user } from './user'
const mid = createSagaMiddleware()

const store = createStore(combineReducers({ counter: counterReducer, user }), applyMiddleware(logger, mid))

mid.run(mySaga)

export default store
