import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const ProductScreen = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product } = productDetails

  // Making a req to our backend.
  useEffect( () => {
    dispatch(listProductDetails(id))
  }, [dispatch])

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">Go BACK!</Link>

      {loading ? <Loader /> : error ? <Message variant='danger'>{error }</Message> : (
      <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={3}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>{product.name}</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
          </ListGroup.Item>
          <hr></hr>
          <ListGroup>
            Price: ${product.price}
          </ListGroup>
          <hr></hr>
          <ListGroup>
            Description: {product.description}
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
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Status: 
                </Col>
                <Col>
                  {product.countInStock > 0 ? 'We got the goods' : 'No mas Goods'}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                className='btn-block' 
                type='button'
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    )}

    </>
  )
};

export default ProductScreen