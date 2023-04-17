// Why isn't my removeFromCart function not removing items from my shopping cart? My code is as follows: 

// cartReducers.js
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


// cartActions.js
import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {data} = await axios.get(`${API_BASE_URL}/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  // const {data} = await axios.get(`${API_BASE_URL}/api/products/${id}`)
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      product: id,
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}


// cartScreen.js
import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  const {id} = useParams()
  const queryParams = new URLSearchParams(window.location.search);
  const qty = Number(queryParams.get('qty'));

  const dispatch = useDispatch()
  useEffect( () => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    console.log(`checkoutHandler called`);
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>You break you buy! <Link to='/'>Go Back</Link></Message> : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={4}>
                    <Form.Select
                        value={item.qty} 
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {[...Array(item.countInStock).keys()].map(count => (
                          <option key={count + 1} value={count + 1}>
                            {count + 1}
                          </option>
                        ))}
                      </Form.Select>
                  </Col>
                  <Col md={1}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                  {/* <Col md={6}>

                  </Col> */}
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler} >
              PROCEED TO CHECKOUT
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>

    </Row>
  )
}

export default CartScreen