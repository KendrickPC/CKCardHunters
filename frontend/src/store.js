import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import {
  productListReducer, productDetailsReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

const initialState = {}
const preloadedState = {}
const middleware = [thunk]

const store = configureStore({
  reducer,
  initialState,
  preloadedState,
  middleware
})

export default store