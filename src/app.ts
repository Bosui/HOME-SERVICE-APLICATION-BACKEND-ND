// src/app.ts
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
const app = express();

// Vidinių middleware'ų nustatymas
app.use(express.json());
app.use(cors());

// Prisijungimas prie MongoDB
mongoose
    .connect(process.env.MONGO_URI || '')
    .then(() => console.log('Prisijungta prie MongoDB'))
    .catch(err => console.error('Klaida jungiantis prie MongoDB:', err));

// Užklausų sekimo middleware (debug'inimui)
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Gauta užklausa: ${req.method} ${req.url}`);
    next();
});


// Maršrutų nustatymas
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookings', bookingRoutes);

// Klaidos tvarkymo middleware
app.use(errorHandler);

// Serverio paleidimas
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.listen(PORT, () => {
    console.log(`Serveris veikia adresu http://localhost:${PORT}`);
});

export default app;
