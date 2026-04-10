const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all conversations for current user (distinct users they have messages with)
router.get('/conversations', authenticateToken, async (req, res) => {
  const { id } = req.user;

  try {
    const result = await db.query(
      `SELECT DISTINCT ON (other_user_id)
         other_user_id,
         u.name,
         u.avatar,
         m.text,
         m.created_at,
         m.is_read
       FROM (
         SELECT from_id as other_user_id, text, created_at, is_read FROM messages WHERE to_id = $1
         UNION ALL
         SELECT to_id as other_user_id, text, created_at, is_read FROM messages WHERE from_id = $1
       ) m
       JOIN users u ON u.id = m.other_user_id
       ORDER BY other_user_id, m.created_at DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching conversations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages between current user and another user
router.get('/:userId', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { userId } = req.params;

  try {
    const result = await db.query(
      `SELECT m.*, u.name, u.avatar
       FROM messages m
       JOIN users u ON u.id = m.from_id
       WHERE (m.from_id = $1 AND m.to_id = $2) OR (m.from_id = $2 AND m.to_id = $1)
       ORDER BY m.created_at ASC`,
      [id, userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send message
router.post('/', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { to_id, text } = req.body;

  if (!to_id || !text) {
    return res.status(400).json({ error: 'to_id and text required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO messages (from_id, to_id, text, is_read)
       VALUES ($1, $2, $3, false)
       RETURNING *`,
      [id, to_id, text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
