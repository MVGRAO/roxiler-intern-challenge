import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, Role } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

/** Admin stats */
router.get('/stats', authenticate, authorize(Role.ADMIN), async (_req, res) => {
  try {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
    ]);

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

/** Admin: list users */
router.get('/users', authenticate, authorize(Role.ADMIN), async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, address: true, createdAt: true },
    orderBy: { id: 'desc' },
  });
  res.json(users);
});

export default router;
