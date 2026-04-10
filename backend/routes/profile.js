const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/', authenticateToken, async (req, res) => {
  const { id } = req.user;

  try {
    const result = await db.query(
      `SELECT id, name, email, location, work, age, kids, marital_status, birthday, languages,
              bio, avatar, phone, can_drive, is_business_owner, business_name, business_description,
              current_groups, desired_groups, spiritual_gifts, hobbies, available, need_help_with,
              on_prayer_team, joined, created_at, updated_at FROM users WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update profile
router.put('/', authenticateToken, async (req, res) => {
  const { id } = req.user;
  const {
    name,
    location,
    work,
    age,
    kids,
    marital_status,
    birthday,
    languages,
    bio,
    avatar,
    phone,
    dietary,
    can_drive,
    is_business_owner,
    business_name,
    business_description,
    current_groups,
    desired_groups,
    spiritual_gifts,
    hobbies,
    available,
    need_help_with,
    on_prayer_team,
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE users SET
        name = COALESCE($1, name),
        location = COALESCE($2, location),
        work = COALESCE($3, work),
        age = COALESCE($4, age),
        kids = COALESCE($5, kids),
        marital_status = COALESCE($6, marital_status),
        birthday = COALESCE($7, birthday),
        languages = COALESCE($8, languages),
        bio = COALESCE($9, bio),
        avatar = COALESCE($10, avatar),
        phone = COALESCE($11, phone),
        dietary = COALESCE($12, dietary),
        can_drive = COALESCE($13, can_drive),
        is_business_owner = COALESCE($14, is_business_owner),
        business_name = COALESCE($15, business_name),
        business_description = COALESCE($16, business_description),
        current_groups = COALESCE($17, current_groups),
        desired_groups = COALESCE($18, desired_groups),
        spiritual_gifts = COALESCE($19, spiritual_gifts),
        hobbies = COALESCE($20, hobbies),
        available = COALESCE($21, available),
        need_help_with = COALESCE($22, need_help_with),
        on_prayer_team = COALESCE($23, on_prayer_team),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $24
       RETURNING id, name, email, location, work, age, kids, marital_status, birthday, languages,
                 bio, avatar, phone, dietary, can_drive, is_business_owner, business_name,
                 business_description, current_groups, desired_groups, spiritual_gifts,
                 hobbies, available, need_help_with, on_prayer_team, updated_at`,
      [
        name,
        location,
        work,
        age,
        kids,
        marital_status,
        birthday,
        languages,
        bio,
        avatar,
        phone,
        dietary,
        can_drive,
        is_business_owner,
        business_name,
        business_description,
        current_groups,
        desired_groups,
        spiritual_gifts,
        hobbies,
        available,
        need_help_with,
        on_prayer_team,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
