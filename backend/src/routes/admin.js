import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { authenticate, authorize, Role } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Admin dashboard stats
router.get('/stats', authenticate, authorize(Role.ADMIN), async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();
    
    const userRoleCounts = await prisma.user.groupBy({
      by: ['role'],
      _count: { role: true }
    });

    const averageStoreRating = await prisma.store.aggregate({
      _avg: { rating: true }
    });

    res.json({
      totalUsers,
      totalStores,
      totalRatings,
      userRoleCounts,
      averageStoreRating: averageStoreRating._avg.rating || 0
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// Get all users with filtering
router.get('/users', authenticate, authorize(Role.ADMIN), async (req, res) => {
  try {
    const { search, role, sortBy = 'id', sortOrder = 'desc' } = req.query;
    
    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(role && { role })
    };

    const users = await prisma.user.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        stores: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
            rating: true
          }
        }
      }
    });

    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Create new user
router.post('/users', authenticate, authorize(Role.ADMIN), async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;

    if (!name || name.length < 20 || name.length > 60) {
      return res.status(400).json({ message: 'Name must be 20-60 characters' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    if (!password || password.length < 8 || password.length > 16) {
      return res.status(400).json({ message: 'Password must be 8-16 characters' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || Role.USER,
        address
      }
    });

    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Get all stores with filtering
router.get('/stores', authenticate, authorize(Role.ADMIN), async (req, res) => {
  try {
    const { search, sortBy = 'id', sortOrder = 'desc' } = req.query;
    
    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const stores = await prisma.store.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        ratings: {
          select: {
            id: true,
            score: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    res.json(stores);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
});

// Create new store
router.post('/stores', authenticate, authorize(Role.ADMIN), async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ message: 'Name, email, and address are required' });
    }

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId: ownerId || null
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json(store);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to create store' });
  }
});

// Update user password
router.put('/users/:id/password', authenticate, authorize(Role.ADMIN), async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8 || newPassword.length > 16) {
      return res.status(400).json({ message: 'Password must be 8-16 characters' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Password updated successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to update password' });
  }
});

export default router;
