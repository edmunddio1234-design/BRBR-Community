const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all prayers with user info and prayer count
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT p.*, u.name, u.avatar
       FROM prayers p
       JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching prayers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create prayer
router.post('/', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { title, body, category } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO prayers (user_id, title, body, category)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, title, body, category || 'General']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating prayer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle pray interaction (pray for a prayer request)
router.post('/:id/pray', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { id: prayerId } = req.params;

  try {
    // Check if already prayed
    const existing = await db.query(
      'SELECT id FROM prayer_interactions WHERE prayer_id = $1 AND user_id = $2',
      [prayerId, id]
    );

    if (existing.rows.length > 0) {
      // Remove the interaction
      await db.query('DELETE FROM prayer_interactions WHERE prayer_id = $1 AND user_id = $2', [
        prayerId,
        id,
      ]);

      // Decrement pray count
      await db.query('UPDATE prayers SET pray_count = pray_count - 1 WHERE id = $1', [prayerId]);

      return res.json({ message: 'Removed prayer', prayed: false });
    } else {
      // Add the interaction
      await db.query(
        'INSERT INTO prayer_interactions (prayer_id, user_id) VALUES ($1, $2)',
        [prayerId, id]
      );

      // Increment pray count
      await db.query('UPDATE prayers SET pray_count = pray_count + 1 WHERE id = $1', [prayerId]);

      return res.json({ message: 'Prayer added', prayed: true });
    }
  } catch (err) {
    console.error('Error toggling prayer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
