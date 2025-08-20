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
    include: { 
      ratings: {
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      },
      owner: { select: { id: true, email: true, name: true } } 
    },
    orderBy: { id: 'desc' },
  });
  res.json(stores);
});

/** Get my stores (Owner only) */
router.get('/mine', authenticate, authorize(Role.OWNER), async (req, res) => {
  const stores = await prisma.store.findMany({
    where: { ownerId: req.user.userId },
    include: { 
      ratings: {
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      }
    },
  });
  res.json(stores);
});

/** Get store details with ratings (Owner only) */
router.get('/mine/:id', authenticate, authorize(Role.OWNER), async (req, res) => {
  const store = await prisma.store.findUnique({
    where: { 
      id: Number(req.params.id),
      ownerId: req.user.userId 
    },
    include: {
      ratings: {
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      },
      owner: { select: { id: true, name: true, email: true } }
    }
  });
  
  if (!store) {
    return res.status(404).json({ message: 'Store not found or not owned by you' });
  }
  
  res.json(store);
});

/** Get store ratings summary for owner */
router.get('/mine/:id/ratings', authenticate, authorize(Role.OWNER), async (req, res) => {
  const store = await prisma.store.findUnique({
    where: { 
      id: Number(req.params.id),
      ownerId: req.user.userId 
    },
    include: {
      ratings: {
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      }
    }
  });
  
  if (!store) {
    return res.status(404).json({ message: 'Store not found or not owned by you' });
  }
  
  const averageRating = store.ratings.length > 0 
    ? store.ratings.reduce((sum, rating) => sum + rating.score, 0) / store.ratings.length 
    : 0;
  
  res.json({
    store: {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings: store.ratings.length,
      ratings: store.ratings
    }
  });
});

export default router;
