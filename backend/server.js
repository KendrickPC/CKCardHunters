import connectDB from './config/database.js';
import express from 'express';
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is up and running...')
})

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, console.log(`Server ${process.env.NODE_ENV} mode listeningggg on PORT ${PORT}`.yellow.inverse))
