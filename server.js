import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './src/config/mongoConfig.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import tareasRoutes from './src/routes/tareasRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import authMiddleware from './src/middlewares/authMiddleware.js';

dotenv.config();
await connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', tareasRoutes);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
