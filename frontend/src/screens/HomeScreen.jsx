import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import {listProducts} from '../actions/productActions.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect( () => {
    dispatch(listProducts())
  }, [dispatch])
  
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h1>Loading.......</h1>
      ) : error ? (
        <h5>{error}</h5>
      ) : (
        <Row>
        {products.map( (product, index) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product}  />
          </Col>
        ))}
      </Row>
      )
      }
    </>
  )
}




export default HomeScreen