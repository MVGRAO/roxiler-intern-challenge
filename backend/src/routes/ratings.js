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

    // Check if user already rated this store
    const existingRating = await prisma.rating.findFirst({
      where: {
        storeId: Number(storeId),
        userId: req.user.userId,
      },
    });

    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this store' });
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

/** Update rating (User only) */
router.put('/:id', authenticate, authorize(Role.USER), async (req, res) => {
  try {
    const { score, comment } = req.body;
    const ratingId = Number(req.params.id);

    if (score < 1 || score > 5) {
      return res.status(400).json({ message: 'Score must be between 1 and 5' });
    }

    const rating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    if (rating.userId !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own ratings' });
    }

    const updatedRating = await prisma.rating.update({
      where: { id: ratingId },
      data: { score, comment: comment || null },
    });

    // Update store average rating
    const agg = await prisma.rating.aggregate({
      where: { storeId: rating.storeId },
      _avg: { score: true },
    });

    await prisma.store.update({
      where: { id: rating.storeId },
      data: { rating: agg._avg.score ?? 0 },
    });

    res.json(updatedRating);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Failed to update rating' });
  }
});

/** Delete rating (User only) */
router.delete('/:id', authenticate, authorize(Role.USER), async (req, res) => {
  try {
    const ratingId = Number(req.params.id);

    const rating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    if (rating.userId !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own ratings' });
    }

    await prisma.rating.delete({
      where: { id: ratingId },
    });

    // Update store average rating
    const agg = await prisma.rating.aggregate({
      where: { storeId: rating.storeId },
      _avg: { score: true },
    });

    await prisma.store.update({
      where: { id: rating.storeId },
      data: { rating: agg._avg.score ?? 0 },
    });

    res.json({ message: 'Rating deleted successfully' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Failed to delete rating' });
  }
});

/** Get user's ratings (User only) */
router.get('/my-ratings', authenticate, authorize(Role.USER), async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany({
      where: { userId: req.user.userId },
      include: {
        store: {
          select: { id: true, name: true, email: true, address: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(ratings);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch ratings' });
  }
});

/** Get rating by store and user (User only) */
router.get('/store/:storeId/user/:userId', authenticate, authorize(Role.USER), async (req, res) => {
  try {
    const storeId = Number(req.params.storeId);
    const userId = Number(req.params.userId);

    // Ensure user can only check their own ratings
    if (userId !== req.user.userId) {
      return res.status(403).json({ message: 'You can only view your own ratings' });
    }

    const rating = await prisma.rating.findFirst({
      where: {
        storeId,
        userId,
      },
    });

    res.json(rating);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch rating' });
  }
});

export default router;
