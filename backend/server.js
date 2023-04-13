const express = require('express');
const cors = require('cors');
const products = require('./data/products')

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

app.listen(8080, console.log("Server listening on PORT 8080"))
