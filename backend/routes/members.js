const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all members — includes current_groups for connection tree and directory
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, email, location, work, age, avatar, bio, current_groups FROM users ORDER BY name'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single member
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT id, name, email, location, work, age, kids, marital_status, birthday, languages,
              bio, avatar, phone, can_drive, is_business_owner, business_name, business_description,
              current_groups, desired_groups, spiritual_gifts, hobbies, available, need_help_with,
              on_prayer_team, joined FROM users WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching member:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;