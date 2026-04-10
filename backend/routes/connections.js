const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all connections
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.*, u.name, u.avatar
       FROM connections c
       JOIN users u ON u.id = c.user_id
       ORDER BY c.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching connections:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create connection
router.post('/', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { type, title, description, categories } = req.body;

  if (!type || !title) {
    return res.status(400).json({ error: 'Type and title required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO connections (user_id, type, title, description, categories)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, type, title, description || null, categories || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating connection:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Respond to connection
router.post('/:id/respond', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { id: connectionId } = req.params;

  try {
    // Check if already responded
    const existing = await db.query(
      'SELECT id FROM connection_responses WHERE connection_id = $1 AND user_id = $2',
      [connectionId, id]
    );

    if (existing.rows.length > 0) {
      // Remove the response
      await db.query(
        'DELETE FROM connection_responses WHERE connection_id = $1 AND user_id = $2',
        [connectionId, id]
      );

      // Decrement response count
      await db.query(
        'UPDATE connections SET response_count = response_count - 1 WHERE id = $1',
        [connectionId]
      );

      return res.json({ message: 'Response removed', responded: false });
    } else {
      // Add the response
      await db.query(
        'INSERT INTO connection_responses (connection_id, user_id) VALUES ($1, $2)',
        [connectionId, id]
      );

      // Increment response count
      await db.query(
        'UPDATE connections SET response_count = response_count + 1 WHERE id = $1',
        [connectionId]
      );

      return res.json({ message: 'Response added', responded: true });
    }
  } catch (err) {
    console.error('Error responding to connection:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
