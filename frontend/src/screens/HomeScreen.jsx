import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL



const HomeScreen = () => {
  const [products, setProducts] = useState([])

  // Making a req to our backend.
  useEffect( () => {
    const fetchProducts = async () => {
      // destructuring res.data
      const { data } = await axios.get(`${API_BASE_URL}/api/products/`)
      console.log("HERE")
      setProducts(data);
    }
    fetchProducts();
  }, [])



  
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map( (product, index) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product}  />
          </Col>
        ))}
      </Row>
    </>
  )
}




export default HomeScreen