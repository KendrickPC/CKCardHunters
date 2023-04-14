import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'



const reducer = combineReducers({})

const initialState = {}

const preloadedState = {}

const store = configureStore({
  reducer,
  initialState,
  preloadedState,
  middleware: [thunk],
})

export default store