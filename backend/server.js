
import connectDB from './config/database.js';
import express from 'express';
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv';
import products from './data/products.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is up and running...')
})
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, console.log(`Server ${process.env.NODE_ENV} mode listeningggg on PORT ${PORT}`.yellow.bold))
