import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { PrismaClient } from '@prisma/client';
import prisma from '../prisma/prisma.js';

import authRoutes from './routes/auth.js';
import storeRoutes from './routes/stores.js';
import ratingRoutes from './routes/ratings.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
// const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Comprehensive CORS configuration
// app.use(cors({ 
//   origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'], 
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// // Handle preflight requests
// app.options('*', cors());
// app.use(cors({ origin: true, credentials: true }));
app.use(cors({ origin: '*' })); 

app.use(express.json());

app.get('/', (_req, res) => res.send('Backend running 🚀'));

app.use('/auth', authRoutes);
app.use('/stores', storeRoutes);
app.use('/ratings', ratingRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
