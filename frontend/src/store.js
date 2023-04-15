import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import {
  productListReducer, productDetailsReducer
} from './reducers/productReducers.js'


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
})

const initialState = {}

const preloadedState = {}

const store = configureStore({
  reducer,
  initialState,
  preloadedState,
  middleware: [thunk],
})

export default store