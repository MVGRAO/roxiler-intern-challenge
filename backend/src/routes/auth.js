import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { ROLES } from '../utils/roles.js';
import prisma from '../../prisma/prisma.js';

dotenv.config();
// const prisma = new PrismaClient();
const router = express.Router();

/** POST /auth/signup
 * body: { name, email, password, role('USER' | 'OWNER'), address? }
 * Admins should be seeded manually if needed.
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role = ROLES.USER, address } = req.body;

    if (![ROLES.USER, ROLES.OWNER].includes(role)) {
      return res.status(400).json({ message: 'Invalid role for signup' });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role, address },
    });

    res.json({ message: 'Signup successful', user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Signup failed' });
  }
});

/** POST /auth/login
 * body: { email, password }
 * returns { token, user }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;
