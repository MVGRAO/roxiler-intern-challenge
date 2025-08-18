import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, Role } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

/** Create a store (Owner only) */
router.post('/', authenticate, authorize(Role.OWNER), async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await prisma.store.create({
      data: { name, email, address, ownerId: req.user.userId },
    });
    res.json(store);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Failed to create store' });
  }
});

/** Get all stores (public) */
router.get('/', async (_req, res) => {
  const stores = await prisma.store.findMany({
    include: { ratings: true, owner: { select: { id: true, email: true, name: true } } },
    orderBy: { id: 'desc' },
  });
  res.json(stores);
});

/** Get my stores (Owner only) */
router.get('/mine', authenticate, authorize(Role.OWNER), async (req, res) => {
  const stores = await prisma.store.findMany({
    where: { ownerId: req.user.userId },
    include: { ratings: true },
  });
  res.json(stores);
});

export default router;
