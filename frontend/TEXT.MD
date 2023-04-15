I have updated the code. It is still not working.

Why is my store.js initialState variable not passing the string 'HELLO CHAT GPT!!!' to my cartReducer state={cartItems: [], action} parameter?

THIS IS MY store.js

```js
import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cart: { cartItems: ['HELLO CHAT GPT!!!'] },
}

const preloadedState = {}
const middleware = [thunk]

const store = configureStore({
  reducer,
  initialState,
  preloadedState,
  middleware,
})

export default store
```

This is my cartReducers.js

```js
import { CART_ADD_ITEM } from '../constants/cartConstants'
import store from '../store.js'

// reducer function for the Redux store's cart state.
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // creates a new item object using the payload property of the action object
      const item = action.payload
      // checks if the cartItems array already contains an item with the same product property as the new item.
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      )

      // If there is already an item with the same product property
      if (existItem) {
        // returns a new state object where the cartItems array is updated with the new item
        return {
          ...state,
          // mapping through the array and replacing the existing item with the new item.
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem
          ),
        }
      } else {
        // If there is no existing item with the same product property
        return {
          ...state,
          // returns a new state object where the cartItems array is updated with the new item by appending it to the end of the array using the spread operator
          cartItems: [...state.cartItems, item],
        }
      }

    default:
      return state
  }
}
```

These are my cartActions.js

```js
import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
```
