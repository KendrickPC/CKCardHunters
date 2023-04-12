import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'


const ProductScreen = () => {
  const {id} = useParams();
  const idx = id - 1
  // return <div>{products[idx].name}</div>;
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">Go BACK!</Link>
      <Row>
        <Col md={6}>
          <Image src={products[idx].image} alt={products[idx].name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{products[idx].name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={products[idx].rating} text={`${products[idx].numReviews} reviews`}/>
            </ListGroup.Item>
            <hr></hr>
            <ListGroup>
              Price: ${products[idx].price}
            </ListGroup>
            <hr></hr>
            <ListGroup>
              Description: {products[idx].description}
            </ListGroup>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: 
                  </Col>
                  <Col>
                    <strong>${products[idx].price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status: 
                  </Col>
                  <Col>
                    {products[idx].countInStock > 0 ? 'We got the goods' : 'No mas Goods'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button 
                  className='btn-block' 
                  type='button'
                  disabled={products[idx].countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default ProductScreen