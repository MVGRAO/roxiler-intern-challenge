import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, Role } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

/** Add rating (User only) */
router.post('/', authenticate, authorize(Role.USER), async (req, res) => {
  try {
    const { storeId, score, comment } = req.body;

    if (score < 1 || score > 5) {
      return res.status(400).json({ message: 'Score must be between 1 and 5' });
    }

    const rating = await prisma.rating.create({
      data: {
        storeId: Number(storeId),
        userId: req.user.userId,
        score: Number(score),
        comment: comment || null,
      },
    });

    // Update store average rating
    const agg = await prisma.rating.aggregate({
      where: { storeId: Number(storeId) },
      _avg: { score: true },
    });

    await prisma.store.update({
      where: { id: Number(storeId) },
      data: { rating: agg._avg.score ?? 0 },
    });

    res.json(rating);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Failed to add rating' });
  }
});

export default router;
