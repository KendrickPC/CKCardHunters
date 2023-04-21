import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = () => {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  
  const dispatch = useDispatch()
  const location = useLocation();
  const navigateTo = useNavigate()

  const submitHandler = (evt) => {
    evt.preventDefault()
    // console.log('submit handler clicked!')
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    navigateTo('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
            <Form.Label>Your Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(evt) => setAddress(evt.target.value)}
            ></Form.Control>
          </Form.Group>
        <Form.Group controlId="city">
            <Form.Label>Your (Sh)ity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(evt) => setCity(evt.target.value)}
            ></Form.Control>
          </Form.Group>
        <Form.Group controlId="postalCode">
            <Form.Label>Your Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your zip code"
              value={postalCode}
              required
              onChange={(evt) => setPostalCode(evt.target.value)}
            ></Form.Control>
          </Form.Group>
        <Form.Group controlId="country">
            <Form.Label>Your Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(evt) => setCountry(evt.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen