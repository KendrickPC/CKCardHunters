const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const products = require('./data/products')

dotenv.config();

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

app.listen(PORT, console.log(`Server ${process.env.NODE_ENV} mode listeningggg on PORT ${PORT}`))
