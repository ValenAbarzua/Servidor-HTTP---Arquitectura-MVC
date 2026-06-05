import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './src/config/mongoConfig.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
