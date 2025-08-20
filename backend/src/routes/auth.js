import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ROLES } from '../utils/roles.js';
import prisma from '../../prisma/prisma.js';
import { authenticate } from '../middleware/auth.js';

dotenv.config();
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
      user: { id: user.id, email: user.email, role: user.role, name: user.name, address: user.address },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Login failed' });
  }
});

/** PUT /auth/update-password
 * body: { currentPassword, newPassword }
 * requires authentication
 */
router.put('/update-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedNewPassword },
    });

    res.json({ message: 'Password updated successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to update password' });
  }
});

/** GET /auth/me
 * Get current user profile
 * requires authentication
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, email: true, role: true, address: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});

export default router;
