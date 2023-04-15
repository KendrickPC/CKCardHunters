import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

// Step 1 to get the product id
const CartScreen = () => {
  const {id} = useParams()
  const queryParams = new URLSearchParams(window.location.search);
  const qty = queryParams.get('qty');

  console.log('id', id);
  console.log('qty', qty);

  return (
    <div>CartScreen</div>
  )
}

export default CartScreen