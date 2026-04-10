const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all gallery items with like and comment counts
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT g.*, u.name, u.avatar,
              (SELECT COUNT(*) FROM gallery_comments WHERE gallery_id = g.id) as comment_count,
              (SELECT COUNT(*) FROM gallery_likes WHERE gallery_id = g.id) as like_count
       FROM gallery g
       JOIN users u ON u.id = g.user_id
       ORDER BY g.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add gallery item
router.post('/', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { url, caption, category } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO gallery (user_id, url, caption, category)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, url, caption || null, category || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating gallery item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle like
router.post('/:id/like', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { id: galleryId } = req.params;

  try {
    const existing = await db.query(
      'SELECT id FROM gallery_likes WHERE gallery_id = $1 AND user_id = $2',
      [galleryId, id]
    );

    if (existing.rows.length > 0) {
      // Remove like
      await db.query('DELETE FROM gallery_likes WHERE gallery_id = $1 AND user_id = $2', [
        galleryId,
        id,
      ]);

      // Decrement like count
      await db.query('UPDATE gallery SET like_count = like_count - 1 WHERE id = $1', [galleryId]);

      return res.json({ message: 'Like removed', liked: false });
    } else {
      // Add like
      await db.query(
        'INSERT INTO gallery_likes (gallery_id, user_id) VALUES ($1, $2)',
        [galleryId, id]
      );

      // Increment like count
      await db.query('UPDATE gallery SET like_count = like_count + 1 WHERE id = $1', [galleryId]);

      return res.json({ message: 'Like added', liked: true });
    }
  } catch (err) {
    console.error('Error toggling like:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add comment
router.post('/:id/comment', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { id: galleryId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Comment text required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO gallery_comments (gallery_id, user_id, text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [galleryId, id, text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
