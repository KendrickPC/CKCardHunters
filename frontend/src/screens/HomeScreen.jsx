import React from 'react'
import products from '../../products'
import { Col, Row } from 'react-bootstrap'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map( (product) => (
          <Col>
            <h5>{product.name}</h5>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen