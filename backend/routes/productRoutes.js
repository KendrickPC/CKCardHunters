import express from 'express';
import expressAsyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js'

// localhost:5174/api/products
router.get('/', expressAsyncHandler(async (req, res) => {
  const product = await Product.find({})
  res.json(product)
}))

// localhost:5174/api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

export default router;