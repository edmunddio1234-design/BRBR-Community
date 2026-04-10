const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT j.*, u.name, u.avatar
       FROM jobs j
       JOIN users u ON u.id = j.user_id
       ORDER BY j.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create job
router.post('/', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { title, company, type, category, location, description, contact } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO jobs (user_id, title, company, type, category, location, description, contact)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, title, company || null, type || null, category || null, location || null, description || null, contact || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Apply to job
router.post('/:id/apply', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { id: jobId } = req.params;

  try {
    // Check if already applied
    const existing = await db.query(
      'SELECT id FROM job_applications WHERE job_id = $1 AND user_id = $2',
      [jobId, id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    const result = await db.query(
      `INSERT INTO job_applications (job_id, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [jobId, id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error applying to job:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
