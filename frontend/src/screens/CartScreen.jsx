import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

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

  console.log('cartItems.length', cartItems.length);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>You break you buy! <Link to='/'>Go Back</Link></Message> : (
          <ListGroup variant='flush'>

          </ListGroup>
        )}
      </Col>
      <Col md={2}>
      </Col>
      <Col md={2}>
      </Col>
    </Row>
  )
}

export default CartScreen