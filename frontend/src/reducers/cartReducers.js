import {
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM
} from '../constants/cartConstants'

// reducer function for the Redux store's cart state.
export const cartReducer = (state={cartItems: []}, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      // creates a new item object using the payload property of the action object
      const item = action.payload
      // checks if the cartItems array already contains an item with the same product property as the new item.
      const existItem = state.cartItems.find(cartItem => cartItem.product === item.product)

      // If there is already an item with the same product property
      if (existItem) {
        // returns a new state object where the cartItems array is updated with the new item 
        return {
          ...state,
          // mapping through the array and replacing the existing item with the new item.
          cartItems: state.cartItems.map(cartItem => cartItem.product === existItem.product ? item : cartItem)
        }
      } else {
        // If there is no existing item with the same product property
        return {
          ...state,
          // returns a new state object where the cartItems array is updated with the new item by appending it to the end of the array using the spread operator
          cartItems: [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload)
      }
    default:
      return state
  }
}


