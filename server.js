import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import mongooseConfig from './src/config/mongoConfig.js';

const app = express();
const PORT = process.env.PORT;

const server = http.createServer();

app.use(cors());
app.use(express.json());

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});