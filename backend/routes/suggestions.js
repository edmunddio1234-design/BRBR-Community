const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all suggestions with vote counts
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT s.*, u.name, u.avatar,
              (SELECT COUNT(*) FROM suggestion_comments WHERE suggestion_id = s.id) as comment_count,
              (SELECT COUNT(*) FROM suggestion_votes WHERE suggestion_id = s.id) as vote_count
       FROM suggestions s
       JOIN users u ON u.id = s.user_id
       ORDER BY s.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching suggestions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create suggestion
router.post('/', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { title, description, category } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO suggestions (user_id, title, description, category)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, title, description || null, category || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating suggestion:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle vote
router.post('/:id/vote', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { id: suggestionId } = req.params;

  try {
    const existing = await db.query(
      'SELECT id FROM suggestion_votes WHERE suggestion_id = $1 AND user_id = $2',
      [suggestionId, id]
    );

    if (existing.rows.length > 0) {
      // Remove vote
      await db.query('DELETE FROM suggestion_votes WHERE suggestion_id = $1 AND user_id = $2', [
        suggestionId,
        id,
      ]);

      // Decrement vote count
      await db.query(
        'UPDATE suggestions SET vote_count = vote_count - 1 WHERE id = $1',
        [suggestionId]
      );

      return res.json({ message: 'Vote removed', voted: false });
    } else {
      // Add vote
      await db.query(
        'INSERT INTO suggestion_votes (suggestion_id, user_id) VALUES ($1, $2)',
        [suggestionId, id]
      );

      // Increment vote count
      await db.query(
        'UPDATE suggestions SET vote_count = vote_count + 1 WHERE id = $1',
        [suggestionId]
      );

      return res.json({ message: 'Vote added', voted: true });
    }
  } catch (err) {
    console.error('Error toggling vote:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add comment
router.post('/:id/comment', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { id: suggestionId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Comment text required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO suggestion_comments (suggestion_id, user_id, text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [suggestionId, id, text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
