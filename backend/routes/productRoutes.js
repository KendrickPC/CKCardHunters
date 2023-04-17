import express from 'express';
const router = express.Router();
import {
  getProducts, 
  getProductById
} from '../controllers/productController.js'

// @desc fetch all products
// @route GET /api/products
// @access PUBLIC
router.route('/').get(getProducts)

// @desc fetch single product
// @route GET /api/products/:id
// @access PUBLIC
router.route('/:id').get(getProductById)

export default router;
