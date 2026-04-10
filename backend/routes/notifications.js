const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all notifications for current user
router.get('/', authenticateToken, async (req, res) => {
  const { id } = req.user;

  try {
    const result = await db.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get unread notification count
router.get('/unread', authenticateToken, async (req, res) => {
  const { id } = req.user;

  try {
    const result = await db.query(
      `SELECT COUNT(*) as unread_count FROM notifications WHERE user_id = $1 AND is_read = false`,
      [id]
    );
    res.json({ unread_count: parseInt(result.rows[0].unread_count) });
  } catch (err) {
    console.error('Error fetching unread count:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark single notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { id: notificationId } = req.params;

  try {
    const result = await db.query(
      `UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *`,
      [notificationId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark all notifications as read
router.put('/read-all', authenticateToken, async (req, res) => {
  const { id } = req.user;

  try {
    const result = await db.query(
      `UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false RETURNING *`,
      [id]
    );

    res.json({ updated: result.rows.length, notifications: result.rows });
  } catch (err) {
    console.error('Error marking all notifications as read:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
